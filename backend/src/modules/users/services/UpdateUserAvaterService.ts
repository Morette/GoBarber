import User from '@modules/users/infra/typeorm/entities/User';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';

interface IAvatarDTO {
   user_id: string;
   avatarFilename: string;
}

@injectable()
export default class UpdateUserAvatarService {
   constructor(
      @inject('UsersRepository')
      private userRepository: IUsersRepository,

      @inject('StorageProvider')
      private storageProvider: IStorageProvider,
   ) {}

   public async execute({ user_id, avatarFilename }: IAvatarDTO): Promise<User> {
      const user = await this.userRepository.findById(user_id);

      if (!user) {
         throw new AppError('Only authenticate users can change avatars', 401);
      }

      if (user.avatar) {
         await this.storageProvider.deleteFile(user.avatar);
      }

      const fileName = await this.storageProvider.saveFile(avatarFilename);
      user.avatar = fileName;
      await this.userRepository.create(user);
      return user;
   }
}
