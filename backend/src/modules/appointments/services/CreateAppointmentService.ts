import { startOfHour } from 'date-fns';
import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentsRepository';

interface IAppointmentDTO {
   provider_id: string;
   date: Date;
}

@injectable()
export default class CreateAppointmentService {
   constructor(@inject('AppointmentsRepository') private appointmentRepository: IAppointmentRepository) {}

   public async execute({ provider_id, date }: IAppointmentDTO): Promise<Appointment> {
      const parsedDate = startOfHour(date);
      const findAppointmentInSameDate = await this.appointmentRepository.findByDate(parsedDate);

      if (findAppointmentInSameDate) {
         throw new AppError('this hour is already booked.');
      }

      const appointment = await this.appointmentRepository.create({ provider_id, date: parsedDate });
      return appointment;
   }
}
