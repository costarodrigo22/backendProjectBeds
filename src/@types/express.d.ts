import { User } from "../entities/User";

// Esse elemento valita o tipo user
declare global {
  namespace Express {
    export interface Request {
      user: Partial<User>
    }
  }
}