import { AppDataSource } from "../data-source";
import { Patient } from "../entities/Patient";

export const PatientsRepository = AppDataSource.getRepository(Patient)