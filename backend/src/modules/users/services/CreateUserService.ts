import { hash } from 'bcryptjs';

import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';

interface IUserDTO {
   name: string;
   email: string;
   password: string;
}

@injectable()
export default class CreateUserService {
   constructor(@inject('UsersRepository') private userRepository: IUsersRepository) {}

   public async execute({ name, email, password }: IUserDTO): Promise<User> {
      const checkUserExists = await this.userRepository.findByEmail(email);

      if (checkUserExists) {
         throw new AppError('Email address already used');
      }

      const hashedPassword = await hash(password, 8);
      const user = await this.userRepository.create({ name, email, password: hashedPassword });
      return user;
   }
}
