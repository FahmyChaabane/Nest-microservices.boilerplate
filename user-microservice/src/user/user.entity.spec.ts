import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';

const mockedUser: User = new User();
mockedUser.password = 'password123';

describe('User', () => {
  describe('Validate password', () => {
    it('returns true as password is valid', async () => {
      const mockedPassword = 'password123';
      const compareSpy = jest
        .spyOn(bcrypt, 'compare')
        .mockImplementation(() => true);
      const result = await mockedUser.verifyPassword(mockedPassword);
      expect(compareSpy).toHaveBeenCalledWith(
        mockedPassword,
        mockedUser.password,
      );
      expect(result).toEqual(true);
    });

    it('returns false as password is invalid', async () => {
      const mockedPassword = 'not_password123';
      const compareSpy = jest
        .spyOn(bcrypt, 'compare')
        .mockImplementation(() => false);
      const result = await mockedUser.verifyPassword(mockedPassword);
      expect(compareSpy).toHaveBeenCalledWith(
        mockedPassword,
        mockedUser.password,
      );
      expect(result).toEqual(false);
    });
  });
});
