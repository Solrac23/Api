/* eslint-disable no-mixed-spaces-and-tabs */
export class AppError {
  public readonly message: string
  public readonly statusCode: number

  constructor(message: string, statusCode = 400) {
  	this.message = message
  	this.statusCode = statusCode
  }
}

