import { getRepository } from 'typeorm';
import { UserAdmin } from '@entity/UserAdmin';
import { Request, Response } from 'express';

export const getUser = async (request: Request, response: Response) => {
  const { id } = request.params;
  const users = await getRepository(UserAdmin).findOne(id);
  return response.json(users);
};

export const saveUser = async (request: Request, response: Response) => {
  const { name, email, password } = request.body;

  const UserExists = await getRepository(UserAdmin).findOne({ email });

  if (UserExists)
    return response.sendStatus(409).json({ message: 'User already exists' })

  const user = getRepository(UserAdmin).create({ name, email, password });
  await getRepository(UserAdmin).save(user);

  return response.json(user);
}
