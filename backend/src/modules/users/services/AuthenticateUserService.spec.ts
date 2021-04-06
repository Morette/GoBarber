import AppError from '@shared/errors/AppError';
import MockUserRepository from '@modules/users/repositories/mocks/MockUserRepository';
import MockHashProvider from '@modules/users/providers/mocks/MockHashProvider';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

describe('AuthenticateUser', () => {
   it('should be able to authenticate', async () => {
      const mockRepository = new MockUserRepository();
      const mockHashProvider = new MockHashProvider();
      const createUser = new CreateUserService(mockRepository, mockHashProvider);
      const authenticateUserService = new AuthenticateUserService(mockRepository, mockHashProvider);

      const user = await createUser.execute({
         name: 'thiago',
         email: 'thiago@email.com',
         password: '123456',
      });

      const response = await authenticateUserService.execute({
         email: 'thiago@email.com',
         password: '123456',
      });

      expect(response).toHaveProperty('token');
      expect(response.user).toEqual(user);
   });

   it('should not be able to authenticate with non existing user', async () => {
      const mockRepository = new MockUserRepository();
      const mockHashProvider = new MockHashProvider();
      const authenticateUserService = new AuthenticateUserService(mockRepository, mockHashProvider);

      expect(
         authenticateUserService.execute({
            email: 'thiago@email.com',
            password: '123456',
         }),
      ).rejects.toBeInstanceOf(AppError);
   });

   it('should not be able to authenticate whit wrong password', async () => {
      const mockRepository = new MockUserRepository();
      const mockHashProvider = new MockHashProvider();
      const createUser = new CreateUserService(mockRepository, mockHashProvider);
      const authenticateUserService = new AuthenticateUserService(mockRepository, mockHashProvider);

      await createUser.execute({
         name: 'thiago',
         email: 'thiago@email.com',
         password: '123456',
      });

      expect(
         authenticateUserService.execute({
            email: 'thiago@email.com',
            password: 'wrong-password',
         }),
      ).rejects.toBeInstanceOf(AppError);
   });
});
