import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { SurveysRepository } from '../repositories/SurveysRepository'

class SurveysController {
  async create(req: Request, res: Response) {
    const { title, description} = req.body

    const surveysRepository = getCustomRepository(SurveysRepository)

    const survey = surveysRepository.create({
      title,
      description
    })

    await surveysRepository.save(survey)
<<<<<<< HEAD

=======
    
>>>>>>> e633195582c73d6015d6ce8567212e55ca13c2d8
    return res.status(201).json(survey)
  }

  async show(req: Request, res: Response) {
    const surveysRepository = getCustomRepository(SurveysRepository)

    const all = await surveysRepository.find()

    return res.json(all)
  }

}

export { SurveysController }
