import IHashProvider from '@modules/users/providers/models/IHashProvider';

export default class MockHashProvider implements IHashProvider {
   public async generateHash(payload: string): Promise<string> {
      return payload;
   }

   public async compareHash(payload: string, hashed: string): Promise<boolean> {
      return payload === hashed;
   }
}
