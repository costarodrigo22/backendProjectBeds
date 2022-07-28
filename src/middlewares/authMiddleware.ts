import { NextFunction, Request, Response } from "express"
import Jwt from "jsonwebtoken";
import { UnauthorizedError } from "../helpers/api-errors";
import { UserRepository } from "../repositories/UserRepository";

type JwtPayload = {
  id: number
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers

  if(!authorization){
    throw new UnauthorizedError('Not authorized')
  } 

  const token = authorization.split(' ')[1]

  const { id } = Jwt.verify(token, process.env.JWT_PASSWORD ?? '') as JwtPayload
  
  const user = await UserRepository.findOneBy({ id })

  if(!user){
    throw new UnauthorizedError('Not authorized')
  }

  const { password: _, ...logged } = user

  req.user = logged
  
  next()
}