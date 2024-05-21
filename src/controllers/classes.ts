import { Request, Response } from "express";
import Class from "../models/classes";

export const createClass = async (req: Request, res: Response) => {
    new Class(req.body).save()
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

