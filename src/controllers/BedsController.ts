import { Request, Response } from "express";
import { Bed } from "../entities/Bed";
import { BedsRepository } from "../repositories/BedsRepository";
import { PatientsRepository } from "../repositories/PatientsRepository";

export class BedsController {
  async create(req: Request, res: Response){
    const { status, document } = req.body

    if(!status) {
      res.status(400).json({ message: 'status is required' })
    }

    const dataPatientByDocument = await PatientsRepository
      .createQueryBuilder('patients')
      .where('patients.document = :document', { document: document }) 
      .getOne()

    try {
        const newBed = BedsRepository.create({ 
          status: status,
          name_patient: dataPatientByDocument?.name,
          document: dataPatientByDocument?.document,
          allergy: dataPatientByDocument?.allergy
        })
        await BedsRepository.save(newBed)
        return res.status(200).json(newBed)
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' })
    }
  }

  async update(req: Request, res: Response) {
    const { status, document } = req.body
    const { idBed } = req.params

    if(!status){
      return res.status(400).json({ message: 'Status is required' })
    }

    const bedExists = await BedsRepository.findOneBy({id: Number(idBed)})

    if(!bedExists) {
      return res.status(400).json({ message: 'Bed not found' })
    }

    if(status === 'ocupado' && document === null){
      return res.status(400).json({ messagem: 'Document is required' })
    }

    const dataPatientByDocument = await PatientsRepository
    .createQueryBuilder('patients')
    .where('patients.document = :document', { document: document }) 
    .getOne()

    if(!dataPatientByDocument){
      return res.status(400).json({ message: 'Patient not found. Need to register it ' })
    }

    try {
      if(status === 'disponivel' || status === 'em manutencao'){
        const updatedBed = BedsRepository.update(idBed, {
          status: status,
          name_patient: '',
          document: '',
          allergy: ''
        })
        return res.status(200).json({ message: 'Data has been updated' })  
      }

      const updatedBed = BedsRepository.update(idBed, {
        status: status,
        name_patient: dataPatientByDocument?.name,
        document: dataPatientByDocument?.document,
        allergy: dataPatientByDocument?.allergy
      })
      return res.status(200).json({ message: 'Data has been updated' })
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' })
    }
  }

  async getBeds(req: Request, res: Response) {
    try {
      const allBeds = await BedsRepository
        .createQueryBuilder('beds')
        .getMany()

      return res.status(200).json({ data: allBeds, message: 'Request executed successfully' })
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' })
    }
  }

  async getOneBed(req: Request, res: Response) {
    const { idBed } = req.params

    const bedSelectedById = await BedsRepository
      .createQueryBuilder('beds')
      .where('beds.id = :id', { id: idBed })
      .getOne()

    if(!bedSelectedById) {
      return res.status(400).json({ message: 'Bed not found' })
    }

    return res.status(200).json({ data: bedSelectedById, message: 'Request executed successfully' })
  }

  async deleteBedById(req: Request, res: Response){
    const { id } = req.params

    const bedDeleted = await BedsRepository
      .createQueryBuilder()
      .delete()
      .from(Bed)
      .where('beds.id = :id', { id: id })
      .execute()

    return res.status(200).json({ message: 'Bed deleted from base' })
  }
}