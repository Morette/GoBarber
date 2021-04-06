import IHashProvider from '@modules/users/providers/models/IHashProvider';
import { hash, compare } from 'bcryptjs';

export default class BCryptHashProvider implements IHashProvider {
   public async generateHash(paylod: string): Promise<string> {
      return hash(paylod, 8);
   }

   public async compareHash(payload: string, hashed: string): Promise<boolean> {
      return compare(payload, hashed);
   }
}
