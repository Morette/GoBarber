import MockStorageProvider from '@shared/container/providers/StorageProvider/mocks/MockStorageProvider';
import MockUserRepository from '@modules/users/repositories/mocks/MockUserRepository';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvaterService';
import AppError from '@shared/errors/AppError';

describe('UpdateUserAvatar', () => {
   it('should be able update user avatar', async () => {
      const mockStorageProvider = new MockStorageProvider();
      const mockUserRepository = new MockUserRepository();
      const updateUserAvatar = new UpdateUserAvatarService(mockUserRepository, mockStorageProvider);

      const user = await mockUserRepository.create({
         name: 'Jhon Doe',
         email: 'jhon@doe.com',
         password: '123456',
      });

      await updateUserAvatar.execute({
         user_id: user.id,
         avatarFilename: 'avatar.filename',
      });

      expect(user.avatar).toBe('avatar.filename');
   });

   it('should not be able to update user avatar', async () => {
      const mockStorageProvider = new MockStorageProvider();
      const mockUserRepository = new MockUserRepository();
      const updateUserAvatar = new UpdateUserAvatarService(mockUserRepository, mockStorageProvider);

      expect(
         updateUserAvatar.execute({
            user_id: 'non-existing-user',
            avatarFilename: 'avatar.filename',
         }),
      ).rejects.toBeInstanceOf(AppError);
   });

   it('should delete old avatar when updating to a new one', async () => {
      const mockStorageProvider = new MockStorageProvider();

      const deleteFile = jest.spyOn(mockStorageProvider, 'deleteFile');

      const mockUserRepository = new MockUserRepository();
      const updateUserAvatar = new UpdateUserAvatarService(mockUserRepository, mockStorageProvider);

      const user = await mockUserRepository.create({
         name: 'Jhon Doe',
         email: 'jhon@doe.com',
         password: '123456',
      });

      await updateUserAvatar.execute({
         user_id: user.id,
         avatarFilename: 'avatar.filename',
      });

      await updateUserAvatar.execute({
         user_id: user.id,
         avatarFilename: 'new_avatar.filename',
      });

      expect(deleteFile).toHaveBeenCalledWith('avatar.filename');
      expect(user.avatar).toBe('new_avatar.filename');
   });
});
