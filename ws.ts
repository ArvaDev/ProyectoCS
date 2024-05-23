import WebSocket, { Server } from 'ws';
import http from 'http';
import Class from './src/models/classes';

const server = http.createServer();
const wss = new Server({ server });

const groups: { [key: string]: Set<WebSocket> } = {};

export const initWS = () => {
    wss.on('connection', (ws: WebSocket) => {
        console.log('Cliente conectado');
        let currentGroupId: string | null = null;
        ws.on('message', async (message: string) => {
            const textMessage = Buffer.from(message).toString('binary');
            const { groupId, text } = JSON.parse(textMessage);
            if (!currentGroupId && groupId) {
                currentGroupId = groupId;
                if (!groups[groupId]) {
                    groups[groupId] = new Set();
                }
                groups[groupId].add(ws);
                console.log(`Cliente añadido al grupo ${groupId}`);
            }
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
const handleMessage = async (groupId: string, text: string, senderWs: WebSocket) => {
    try {
        const group = await Class.findById(groupId);
        if (group) {
            group.chat.messages.push(text);
            await group.save();
            console.log('Mensaje guardado en la base de datos');
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
