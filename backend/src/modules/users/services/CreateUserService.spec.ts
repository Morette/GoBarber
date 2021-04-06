import MockUserRepository from '@modules/users/repositories/mocks/MockUserRepository';
import MockHashProvider from '@modules/users/providers/mocks/MockHashProvider';
import AppError from '@shared/errors/AppError';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
   it('should be able to create a new user', async () => {
      const mockRepository = new MockUserRepository();
      const mockHashProvider = new MockHashProvider();
      const createAppointmentService = new CreateUserService(mockRepository, mockHashProvider);
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
      const mockHashProvider = new MockHashProvider();
      const createAppointmentService = new CreateUserService(mockRepository, mockHashProvider);
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
