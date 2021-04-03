import MockUserRepository from '@modules/users/repositories/mocks/MockUserRepository';
import AppError from '@shared/errors/AppError';
import CreateUserService from './CreateUserService';

describe('AuthenticateUser', () => {
   it('should be able to create a new user', async () => {
      const mockRepository = new MockUserRepository();
      const createAppointmentService = new CreateUserService(mockRepository);
      const user = await createAppointmentService.execute({
         name: 'thiago',
         email: 'thiago@email.com',
         password: '123456',
      });

      expect(user).toHaveProperty('id');
      expect(user.name).toBe('thiago');
   });

   it('should not be able to create a new user with an existing email', async () => {
      const mockRepository = new MockUserRepository();
      const createAppointmentService = new CreateUserService(mockRepository);
      await createAppointmentService.execute({
         name: 'thiago',
         email: 'thiago@email.com',
         password: '123456',
      });

      expect(
         createAppointmentService.execute({
            name: 'thiago',
            email: 'thiago@email.com',
            password: '123456',
         }),
      ).rejects.toBeInstanceOf(AppError);
   });
});
