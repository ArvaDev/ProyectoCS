import { Document, model, Schema } from 'mongoose';

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    notifications: [Object]; // Las notificaciones que hay
    classes: [Object];
    roll: string; // Estudiante o maestro
}

const userSchema: Schema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    notifications: [Object],
    classes: [Object],
    roll: {type: String, require: true}
}, {
    timestamps: true
});

const User = model<IUser>('User', userSchema);

export default User;
