import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';

const mockUser: User = new User();

describe('User', () => {
  describe('Validate password', () => {
    it('returns true as password is valid', async () => {
      jest.spyOn(bcrypt, 'compare').mockImplementation(() => true);
      const result = await mockUser.verifyPassword('password123');
      expect(bcrypt.compare).toHaveBeenCalled();
      expect(result).toEqual(true);
    });

    it('returns false as password is invalid', async () => {
      jest.spyOn(bcrypt, 'compare').mockImplementation(() => false);
      const result = await mockUser.verifyPassword('password123');
      expect(bcrypt.compare).toHaveBeenCalled();
      expect(result).toEqual(false);
    });
  });
});
