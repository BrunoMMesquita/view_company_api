import { getRepository } from 'typeorm';
import { UserAdmin } from '@entity/UserAdmin';
import { Request, Response } from 'express';
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

export const Authenticate = async (request: Request, response: Response) => {
  const { email, password } = request.body;

  const user = await getRepository(UserAdmin).findOne({ email });

  if (!user)
    return response.sendStatus(401);

  const isValidPassword = await bcrypt.compare(password, user.password)

  if (!isValidPassword)
    return response.sendStatus(401);

  const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: '1d' })

  delete user.password;

  return response.json({
    user,
    token
  })

}
