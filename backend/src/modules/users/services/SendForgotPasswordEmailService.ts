import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import { inject, injectable } from 'tsyringe';

interface IRequest {
   email: string;
}

@injectable()
export default class SendForgotPasswordEmailService {
   constructor(
      @inject('UsersRepository')
      private userRepository: IUsersRepository,
      @inject('MailProvider')
      private mailProvider: IMailProvider,
   ) {}

   public async execute({ email }: IRequest): Promise<void> {
      this.mailProvider.sendMail(email, 'message body');
   }
}
