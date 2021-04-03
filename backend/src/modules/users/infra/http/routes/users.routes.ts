import { Router } from 'express';
import multer from 'multer';

import EnsureAuth from '@modules/users/infra/http/middlewares/EnsureAuth';
import UsersController from '@modules/users/infra/http/controllers/UsersController';
import uploadConfig from '@config/upload';
import UserAvatarController from '../controllers/UserAvatarController';

const usersRouter = Router();
const userController = new UsersController();
const userAvatarController = new UserAvatarController();
const upload = multer(uploadConfig);

usersRouter.post('/', userController.create);
usersRouter.patch('/avatar', EnsureAuth, upload.single('avatar'), userAvatarController.create);

export default usersRouter;
