import { Router } from 'express'
import { AuthController } from './controllers/AuthController'
import { BedsController } from './controllers/BedsController'
import { PatientsController } from './controllers/PatientsController'
import { UserController } from './controllers/UserController'
import { authMiddleware } from './middlewares/authMiddleware'

const routes = Router()

// Rotas de autenticação e criação de usuários
routes.post('/createUser', new UserController().createUser)
routes.post('/login', new AuthController().auth)

// middleware de autenticação
routes.use(authMiddleware)

// rota apenas para pegar os dados do usuário e testar a autenticação
routes.get('/getProfile', new AuthController().getProfile)


// Rotas da aplicação
routes.post('/createBeds', new BedsController().create)
routes.post('/createPatient', new PatientsController().create)
routes.put('/updateBed/:idBed', new BedsController().update)
routes.put('/updatePatient/:idPatient', new PatientsController().update)
routes.get('/patientsList', new PatientsController().getPatients)
routes.get('/patient/:idPatient', new PatientsController().getOnePatient)
routes.get('/bedsList', new BedsController().getBeds)
routes.get('/bed/:idBed', new BedsController().getOneBed)
routes.delete('/deletePatient/:id', new PatientsController().deletePatientById)
routes.delete('/deleteBed/:id', new BedsController().deleteBedById)

export default routes