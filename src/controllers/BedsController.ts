import { Request, Response } from "express";
import { BedsRepository } from "../repositories/BedsRepository";

export class BedsController {
  async create(req: Request, res: Response){
    const { status } = req.body

    if(!status) {
      res.status(400).json({ message: 'status is required' })
    }

    try {
        const newBed = BedsRepository.create({ status })
        await BedsRepository.save(newBed)
        return res.status(200).json(newBed)
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' })
    }
  }

  async update(req: Request, res: Response) {
    const { status } = req.body
    const { idBed } = req.params

    if(!status){
      return res.status(400).json({ message: 'Status is required' })
    }

    const bedExists = BedsRepository.findOneBy({id: Number(idBed)})

    if(!bedExists) {
      return res.status(400).json({ message: 'Bed not found' })
    }

    try {
      const updatedBed = BedsRepository.update(idBed, {status})
      return res.status(200).json({ message: 'Data has been updated' })
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' })
    }
  }
}