import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/AppError";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";

class AnswerController {
  async execute(req: Request, res: Response){
    const { value } = req.params
    const { user } = req.query

    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository)

    const surveyUser = await surveysUsersRepository.findOne({
      id: String(user)
    })

    if(!surveyUser) {
      throw new AppError('Survey User does not exists!')
    }

    surveyUser.value = Number(value)

    await surveysUsersRepository.save(surveyUser)

    return res.status(200).json(surveyUser)
  }
}

<<<<<<< HEAD
export { AnswerController }
=======
export { AnswerController }
>>>>>>> e633195582c73d6015d6ce8567212e55ca13c2d8
