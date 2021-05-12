import MockUserRepository from '@modules/users/repositories/mocks/MockUserRepository';
import MockMailProvider from '@shared/container/providers/MailProvider/mocks/MockMailProvider';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

describe('SendForgotPasswordEmail', () => {
   it('should be able to recover the password using email', async () => {
      const mockUserRepository = new MockUserRepository();
      const mockMailProvider = new MockMailProvider();
      const sendForgottenEmail = new SendForgotPasswordEmailService(mockUserRepository, mockMailProvider);

      const sendMail = jest.spyOn(mockMailProvider, 'sendMail');

      await mockUserRepository.create({
         email: 'thiago@teste.com',
         name: 'thiago',
         password: '123456',
      });
      await sendForgottenEmail.execute({ email: 'thiago@teste.com' });

      expect(sendMail).toHaveBeenCalled();
   });
});
