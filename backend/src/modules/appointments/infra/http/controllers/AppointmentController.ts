import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import { parseISO } from 'date-fns';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class AppointmentController {
   public async create(request: Request, response: Response): Promise<Response> {
      const appointmentService = container.resolve(CreateAppointmentService);

      const { provider_id, date } = request.body;
      const parsedDate = parseISO(date);

      const appointment = await appointmentService.execute({ provider_id, date: parsedDate });
      return response.json(appointment);
   }

   // public async list(request: Request, response: Response) {
   //    const appointments = await appointmentRepository.find();
   //    return response.json(appointments);
   // }
}
