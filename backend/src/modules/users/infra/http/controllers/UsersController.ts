import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class UsersController {
   async create(request: Request, response: Response): Promise<Response> {
      const authUser = container.resolve(AuthenticateUserService);
      const { email, password } = request.body;

      const { user, token } = await authUser.execute({ email, password });

      return response.json({
         user: {
            id: user.id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            created_at: user.created_at,
         },
         token,
      });
   }
}
