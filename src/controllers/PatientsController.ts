import { Request, Response } from "express";
import { PatientsRepository } from "../repositories/PatientsRepository";

export class PatientsController {
  async create(req: Request, res: Response) {
    const { 
      name,
      gender,
      birth_date,
      email,
      phone,
      address,
      height,
      weight,
      allergy,
    } = req.body

    if(!name || !phone || !address || !email){
      return res.status(400).json({ message: 'Name/phone/address is required' })
    }

    const patientExists = await PatientsRepository.findOneBy({email: email})

    if(patientExists) {
      return res.status(400).json({ message: 'This patient is already been taken' })
    }

    try {
      const newPatient = PatientsRepository.create({
        name,
        gender,
        birth_date,
        email,
        phone,
        address,
        height,
        weight,
        allergy
      })

      await PatientsRepository.save(newPatient)
      return res.status(200).json(newPatient)
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' })
    }
  }

  async update(req: Request, res: Response) {
    const { 
      name,
      gender,
      birth_date,
      email,
      phone,
      address,
      height,
      weight,
      allergy
    } = req.body

    const { idPatient } = req.params

    if(!name || !phone || !address || !email){
      return res.status(400).json({ message: 'Name/phone/address is required' })
    }

    const patientExists = PatientsRepository.findOneBy({ id: Number(idPatient) })

    if(!patientExists){
      res.status(400).json({ message: 'Patient not found' })
    }

    const patientExistsByEmail = await PatientsRepository.findOneBy({email: email})

    if(patientExistsByEmail && patientExistsByEmail.id !== Number(idPatient)) {
      return res.status(400).json({ message: 'This patient is already been taken' })
    }

    try {
      await PatientsRepository.update(idPatient, {
        name,
        gender,
        birth_date,
        email,
        phone,
        address,
        height,
        weight,
        allergy
      })
      
      return res.status(200).json({ message: 'Data has been updated' })
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' })
    }
  }
}