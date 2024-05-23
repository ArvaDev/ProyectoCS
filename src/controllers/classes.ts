import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import Class from "../models/classes";

export const createClass = async (req: Request, res: Response) => {
    const chatID = uuidv4()
    const newClass = new Class({ ...req.body, chat: { chat_id: chatID, messages: [] } })
    newClass.save()
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json({err: err, message: "No se ha podido crear la clase"}))
}

export const deleteClass = async (req: Request, res: Response) => {
    await Class.deleteOne({_id: req.params.id})
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json({err: err}))
}

export const getClass = async (req: Request, res: Response) => {
    await Class.findById(req.params.id)
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json({err: err}))
}

