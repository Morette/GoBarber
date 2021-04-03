import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { v4 } from 'uuid';

export default class UsersRepository implements IUsersRepository {
   #users: User[] = [];

   public async create({ name, email, password }: ICreateUserDTO): Promise<User> {
      const user = new User();
      Object.assign(user, {
         id: v4(),
         name,
         email,
         password,
      });

      this.#users.push(user);
      return user;
   }

   public async findByEmail(email: string): Promise<User | undefined> {
      return this.#users.find(user => user.email === email);
   }

   public async findById(id: string): Promise<User | undefined> {
      return this.#users.find(user => user.id === id);
   }

   public async update(user: User): Promise<User> {
      const findIndex = this.#users.findIndex(u => u.id === user.id);
      this.#users[findIndex] = user;
      return user;
   }
}
