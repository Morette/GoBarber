import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvaterService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class UserAvatarController {
   async create(request: Request, response: Response): Promise<Response> {
      const avatarService = container.resolve(UpdateUserAvatarService);

      const user = await avatarService.execute({
         user_id: request.user.id,
         avatarFilename: request.file.filename,
      });

      return response.json({
         user: {
            id: user.id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            updated: user.updated_at,
         },
      });
   }
}
