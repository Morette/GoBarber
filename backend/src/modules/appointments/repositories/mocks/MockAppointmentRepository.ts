import { v4 } from 'uuid';
import { isEqual } from 'date-fns';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

export default class AppointmentsRepository implements IAppointmentRepository {
   #appointments: Appointment[] = [];

   public async create({ provider_id, date }: ICreateAppointmentDTO): Promise<Appointment> {
      const appointment = new Appointment();

      Object.assign(appointment, {
         id: v4(),
         date,
         provider_id,
      });

      this.#appointments.push(appointment);
      return appointment;
   }

   public async findByDate(date: Date): Promise<Appointment | undefined> {
      return this.#appointments.find(appointment => isEqual(appointment.date, date));
   }
}
