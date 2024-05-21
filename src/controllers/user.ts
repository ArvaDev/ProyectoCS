import { Request, Response } from "express";
import User from "../models/user";

export const createUser = async (req: Request, res: Response) => {
    const user = new User(req.body)
    user.save()
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json({ err: err, message: "No se puede crear el ususario" }))
}

export const getUsersByName = async (req: Request, res: Response) => {
    const { name } = req.query
    await User.find({ name: name })
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json({ err: err, message: "Internal Server" }))
}

export const getUsersById = async (req: Request, res: Response) => {
    await User.findById(req.params.id)
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json({ err: err, message: "Internal Server" }))
}

export const deleteUserById = async (req: Request, res: Response) => {
    await User.deleteOne({ _id: req.params.id })
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json({ err: err, message: "No se ha podido borrar el usuario" }))
}

export const updateUserById = async (req: Request, res: Response) => {
    const userOb = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        notifications: req.body.notifications,
        classes: req.body.classes,
        roll: req.body.roll
    }
    await User.updateOne({ _id: req.params.id }, { $set: userOb })
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json({ err: err, message: "No se ha podido actualizar el usuario" }))
}

export const getNotification = async (req: Request, res: Response) => {
    await User.findOne({_id: req.params.id})
        .then(data => res.status(200).json(data?.notifications))
        .catch(err => res.status(500).json({ err: err, message: "No se ha podido borrar el usuario" }))
}

export const setNotification = async (req: Request, res: Response) => {
    await User.updateOne({ _id: req.params.id }, { $push: {notifications: req.body} })
        .then(data => { res.status(200).json(data) })
        .catch(err => res.status(500).json({ err: err}))
}