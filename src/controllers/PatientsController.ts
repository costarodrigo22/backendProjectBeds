import { Request, Response } from "express";
import { Patient } from "../entities/Patient";
import { PatientsRepository } from "../repositories/PatientsRepository";

export class PatientsController {
  // Cria um paciente na tabela 'patients'
  async create(req: Request, res: Response) {
    const { 
      name,
      document,
      gender,
      birth_date,
      email,
      phone,
      address,
      height,
      weight,
      allergy,
    } = req.body

    if(!name || !phone || !document){
      return res.status(400).json({ message: 'Name | phone | document is required' })
    }

    const patientExists = await PatientsRepository.findOneBy({document: document})

    if(patientExists) {
      return res.status(400).json({ message: 'This patient already registered' })
    }

    try {
      const newPatient = PatientsRepository.create({
        name,
        document,
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

  // Atualiza um paciente da tabela 'patients'
  async update(req: Request, res: Response) {
    const { 
      name,
      document,
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

    if(!name || !phone || !document){
      return res.status(400).json({ message: 'Name | phone | document is required' })
    }

    const patientExists = await PatientsRepository.findOneBy({ id: Number(idPatient) })

    if(!patientExists){
      res.status(400).json({ message: 'Patient not found' })
    }

    const patientExistsByDocument = await PatientsRepository.findOneBy({document: document})

    if(patientExistsByDocument && patientExistsByDocument.id !== Number(idPatient)) {
      return res.status(400).json({ message: 'This document is already been taken' })
    }

    try {
      await PatientsRepository.update(idPatient, {
        name,
        document,
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

  // Busca todos os pacientes da tabela 'patients'
  async getPatients(req: Request, res: Response){
    try {
      const allPatients = await PatientsRepository
      .createQueryBuilder('patients')
      .getMany()

    return res.status(200).json({ data: allPatients, message: 'Request executed successfully' })
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' })
    }
  }

  // Busca um paciente na tabela 'patients' pelo id
  async getOnePatient(req: Request, res: Response) {
    const { idPatient } = req.params

    const patientSelectedById = await PatientsRepository
      .createQueryBuilder('patients')
      .where('patients.id = :id', { id: idPatient })
      .getOne()

    if(!patientSelectedById) {
      return res.status(400).json({ message: 'Patient not found' })
    }

    return res.status(200).json({ data: patientSelectedById, message: 'Request executed successfully' })
  }

  // Deleta um paciente
  async deletePatientById(req: Request, res: Response){
    const { id } = req.params

    const patientDeleted = await PatientsRepository
      .createQueryBuilder()
      .delete()
      .from(Patient)
      .where('patients.id = :id', { id: id })
      .execute()

    return res.status(200).json({ message: 'Patient deleted from base' })
  }

}