import { Request, Response } from "express";
import { getCustomRepository, IsNull, Not } from "typeorm";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";

class NpsController {

  async execute(req: Request, res: Response){
    const { survey_id } = req.params

    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository)

    const surveyUsers = await surveysUsersRepository.find({
      survey_id,
      value: Not(IsNull())
    })

<<<<<<< HEAD
    const detractor = surveyUsers.filter((survey) =>
      survey.value >= 0 && survey.value <= 6
    ).length

    const passive = surveyUsers.filter((survey) =>
      survey.value >= 7 && survey.value <= 8
    ).length

    const promoters = surveyUsers.filter((survey) =>
=======
    const detractor = surveyUsers.filter((survey) => 
      survey.value >= 0 && survey.value <= 6
    ).length

    const passive = surveyUsers.filter((survey) => 
      survey.value >= 7 && survey.value <= 8
    ).length

    const promoters = surveyUsers.filter((survey) => 
>>>>>>> e633195582c73d6015d6ce8567212e55ca13c2d8
      survey.value >= 9 && survey.value <= 10
    ).length

    const totalAnswers = surveyUsers.length

    const calculate = Number((((promoters - detractor) / totalAnswers) * 100).toFixed(2))

    return res.json({
      detractor,
      promoters,
      passive,
      totalAnswers,
      nps: calculate
    })
  }
}

<<<<<<< HEAD
export { NpsController }
=======
export { NpsController }
>>>>>>> e633195582c73d6015d6ce8567212e55ca13c2d8
