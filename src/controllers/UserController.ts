import { Request, Response } from "express";
import { BedRequestError } from "../helpers/api-errors";
import { UserRepository } from "../repositories/UserRepository";
import bcrypt from 'bcrypt'

// Cria um usuário
export class UserController {
  async createUser(req: Request, res: Response){
    const { name, email, password } = req.body

    const emailExists = await UserRepository.findOneBy({ email })

    if(emailExists){
      throw new BedRequestError('Email is already been taken')
    }

    const hashPassword = await bcrypt.hash(password, 10)

    const newUser = UserRepository.create({
      name,
      email,
      password: hashPassword
    })

    UserRepository.save(newUser)

    // Pega o name e email e joga dentro dentro de 'user' para não retornar a o password
    const { password: _, ...user } = newUser

    return res.status(201).json(user)
  }
}