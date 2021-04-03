import { Router } from 'express';

import EnsureAuth from '@modules/users/infra/http/middlewares/EnsureAuth';
import AppointmentController from '../controllers/AppointmentController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentController();

appointmentsRouter.use(EnsureAuth);

// appointmentsRouter.get('/', appointmentsController.list);

appointmentsRouter.post('/', appointmentsController.create);

export default appointmentsRouter;
