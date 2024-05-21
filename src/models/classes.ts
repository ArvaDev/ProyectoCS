import { Document, model, Schema } from 'mongoose';

export interface IClass extends Document {
    class_name: string;
    teacher: string
    chat: []
    users: []; //Aqui va quienes son los profesores y alumnos con sus respectivos roles
    posts: []; //Aqui pueden ir tareas, avisos y elementos que solo el rol profesor puede poner
}

const classSchema: Schema = new Schema<IClass>({
    class_name: {type: String, require: true},
    teacher: {type: String, require: true},
    chat: [],
    users: [], //Aqui va quienes son los profesores y alumnos con sus respectivos roles
    posts: [],
})

const Class = model<IClass>('Classes', classSchema)

export default Class