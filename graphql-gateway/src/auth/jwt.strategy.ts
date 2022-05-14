import { ConfigService } from '@nestjs/config';
import { UserService } from './../user/user.service';
import { User } from './../user/user.entity';
import { JwtPayload } from './jwtPayload';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService, configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('jwt_secret.jwtSecret'),
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { id } = payload;
    try {
      const user = await this.userService.getUserById({ id });
      if (!user) {
        throw new UnauthorizedException();
      }
      // whatever is returned here, gonna be injected into the request that is guarded with this authentication.
      return user;
    } catch (error) {
      // is it necessary ? idk if it is really possible to have token, and execute a mutation when you don't have an account? // should be no but i did the catch anyways // GDM5
      // https://stackoverflow.com/questions/71607700/error-exceptionshandler-no-elements-in-sequence-after-upgrading-to-nestjs-v8-a
      throw new UnauthorizedException('User Not Found');
    }
  }
}
