import { Router } from 'express'
import { BedsController } from './controllers/BedsController'
import { PatientsController } from './controllers/PatientsController'

const routes = Router()

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