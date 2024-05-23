import WebSocket, { Server } from 'ws';
import http from 'http';
import Class from './src/models/classes'; // Asegúrate de que la ruta sea correcta

const server = http.createServer();
const wss = new Server({ server });

// Definir la estructura de los grupos
const groups: { [key: string]: Set<WebSocket> } = {};

// Función para inicializar el servidor WebSocket
export const initWS = () => {
    wss.on('connection', (ws: WebSocket) => {
        console.log('Cliente conectado');

        // Almacenar el ID del grupo al que pertenece este cliente
        let currentGroupId: string | null = null;

        ws.on('message', async (message: string) => {
            const textMessage = Buffer.from(message).toString('binary');
            const { groupId, text } = JSON.parse(textMessage);

            // Asignar el WebSocket al grupo
            if (!currentGroupId && groupId) {
                currentGroupId = groupId;

                if (!groups[groupId]) {
                    groups[groupId] = new Set();
                }
                groups[groupId].add(ws);
                console.log(`Cliente añadido al grupo ${groupId}`);
            }

            // Manejar mensajes y guardarlos en la base de datos
            if (currentGroupId) {
                await handleMessage(currentGroupId, text, ws);
            }
        });

        ws.on('close', () => {
            console.log('Cliente desconectado');
            if (currentGroupId && groups[currentGroupId]) {
                groups[currentGroupId].delete(ws);
                console.log(`Cliente eliminado del grupo ${currentGroupId}`);
            }
        });
    });
};

// Función para manejar mensajes y guardarlos en la base de datos
const handleMessage = async (groupId: string, text: string, senderWs: WebSocket) => {
    try {
        const group = await Class.findById(groupId);
        if (group) {
            group.chat.messages.push(text);
            await group.save();
            console.log('Mensaje guardado en la base de datos');

            // Reenvía el mensaje a todos los miembros del grupo excepto al remitente
            groups[groupId].forEach((client) => {
                if (client !== senderWs && client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify({ groupId, text }));
                }
            });
        } else {
            console.error('No se encontró el grupo');
        }
    } catch (error) {
        console.error('Error al manejar el mensaje:', error);
    }
};

// Inicializa el servidor HTTP en el puerto 8080
server.listen(8080, () => {
    console.log('Servidor WebSocket escuchando en el puerto 8080');
});
