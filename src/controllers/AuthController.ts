import { Request, Response } from "express";
import { BedRequestError, UnauthorizedError } from "../helpers/api-errors";
import { UserRepository } from "../repositories/UserRepository";
import bcrypt from 'bcrypt'
import Jwt from "jsonwebtoken";

export class AuthController {
  // Método que cria um token válido para ao usuário
  async auth(req: Request, res: Response){
    const { email, password } = req.body

    const user = await UserRepository.findOneBy({ email })

    if(!user){
      throw new BedRequestError('Incorrect email or passwords')
    }

    const verifypassword = await bcrypt.compare(password, user.password)

    if(!verifypassword){
      throw new BedRequestError('Incorrect email or passwords')
    }

    const token = Jwt.sign({ id: user.id }, process.env.JWT_PASSWORD ?? '', { expiresIn: '8h' } )

    return res.json({
      id: user.id,
      user: user.name,
      email: user.email,
      token: token
    })
  }

  // Metodo que verifica a autorização do usuário
  async getProfile(req: Request, res: Response){
    return res.json(req.user)
  }
}