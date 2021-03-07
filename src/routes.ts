import {Router} from 'express'
import { AnswerController } from './controllers/AnswerController'
import { NpsController } from './controllers/NpsController'
import { SendMailController } from './controllers/SendMailController'
import { SurveysController } from './controllers/SurveyController'
import {UserController} from './controllers/UserController'

const routes = Router()

const userController = new UserController()
const surveyController = new SurveysController()
const sendMailController = new SendMailController()
const answerController = new AnswerController()
const npsController = new NpsController()

routes.get('/users', userController.show)
routes.post('/users', userController.create)

routes.get('/surveys', surveyController.show)
routes.post('/surveys', surveyController.create)

routes.post('/sendMail', sendMailController.execute)

routes.get('/answers/:value', answerController.execute)

routes.get('/nps/:survey_id', npsController.execute)

export {routes}