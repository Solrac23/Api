import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { UsersRepository } from '../repositories/UsersRepository'
import * as yup from 'yup'
import { AppError } from '../errors/AppError'

class UserController {

  async show(req: Request, res: Response) {
    const usersRepository = getCustomRepository(UsersRepository)

    const users = await usersRepository.find()

    return res.json(users)
  }

  async create(req: Request, res: Response) {
    const { name, email } = req.body
    const usersRepository = getCustomRepository(UsersRepository)

    const schema = yup.object().shape({
      name: yup.string().required(),
      email: yup.string().email().required()
    })

    try {
      await schema.validate(req.body, { abortEarly: false})
    } catch (err) {
      throw new AppError(err)
    }

    const userAlreadyExists = await usersRepository.findOne({
      email
    })

    if(userAlreadyExists) {
      throw new AppError("user already exists.")
    }

    const user = usersRepository.create({
      name,
      email,
    })

    await usersRepository.save(user)

    return res.status(201).json(user)
  }
}

export { UserController }
