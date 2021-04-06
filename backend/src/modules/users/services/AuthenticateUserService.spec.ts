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

      await createUser.execute({
         name: 'thiago',
         email: 'thiago@email.com',
         password: '123456',
      });

      const user = await authenticateUserService.execute({
         email: 'thiago@email.com',
         password: '123456',
      });

      expect(user).toHaveProperty('token');
      expect(user.user).toEqual(user);
   });
});
