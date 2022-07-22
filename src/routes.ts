import { Router } from 'express'
import { BedsController } from './controllers/BedsController'
import { PatientsController } from './controllers/PatientsController'

const routes = Router()

routes.post('/createBeds', new BedsController().create)
routes.post('/createPatient', new PatientsController().create)
routes.put('/updateBed/:idBed', new BedsController().update)
routes.put('/updatePatient/:idPatient', new PatientsController().update)

export default routes