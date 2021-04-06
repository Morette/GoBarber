import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import authConfig from '@config/authConfig';
import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IHashProvider from '@modules/users/providers/models/IHashProvider';

interface ISessionDTO {
   email: string;
   password: string;
}

@injectable()
export default class AuthenticateUserService {
   constructor(
      @inject('UsersRepository')
      private userRepository: IUsersRepository,

      @inject('HashProvider')
      private hashProvider: IHashProvider,
   ) {}

   public async execute({ email, password }: ISessionDTO): Promise<{ user: User; token: string }> {
      const user = await this.userRepository.findByEmail(email);

      if (!user) {
         throw new AppError('Incorrect email/password combination', 401);
      }

      const passwordFound = await this.hashProvider.compareHash(password, user.password);

      if (!passwordFound) {
         throw new AppError('Incorrect email/password combination', 401);
      }

      const token = sign({}, authConfig.jwt.secret, {
         subject: user.id,
         expiresIn: authConfig.jwt.expiresIn,
      });

      return { user, token };
   }
}
