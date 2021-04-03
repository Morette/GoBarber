import MockUserRepository from '@modules/users/repositories/mocks/MockUserRepository';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

describe('AuthenticateUser', () => {
   it('should be able to authenticate', async () => {
      const mockRepository = new MockUserRepository();
      const createUser = new CreateUserService(mockRepository);
      const authenticateUserService = new AuthenticateUserService(mockRepository);

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
   });
});
