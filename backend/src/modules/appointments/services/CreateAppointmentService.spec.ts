import MockAppointmentRepository from '@modules/appointments/repositories/mocks/MockAppointmentRepository';
import AppError from '@shared/errors/AppError';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
   it('should be able to create a new appointment', async () => {
      const mockRepository = new MockAppointmentRepository();
      const createAppointmentService = new CreateAppointmentService(mockRepository);
      const appointment = await createAppointmentService.execute({
         date: new Date(),
         provider_id: '198749187',
      });

      expect(appointment).toHaveProperty('id');
      expect(appointment.provider_id).toBe('198749187');
   });

   it('should not be able to create two appointments on the same time', async () => {
      const mockRepository = new MockAppointmentRepository();
      const createAppointmentService = new CreateAppointmentService(mockRepository);

      const appointmentDate = new Date(2021, 5, 5, 11);

      await createAppointmentService.execute({
         date: appointmentDate,
         provider_id: '198749187',
      });

      expect(
         createAppointmentService.execute({
            date: appointmentDate,
            provider_id: '198749187',
         }),
      ).rejects.toBeInstanceOf(AppError);
   });
});
