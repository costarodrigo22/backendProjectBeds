import { AppDataSource } from "../data-source";
import { Bed } from "../entities/Bed";

export const BedsRepository = AppDataSource.getRepository(Bed)