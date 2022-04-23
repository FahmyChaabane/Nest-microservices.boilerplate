import { UserService } from './../user/user.service';
import { firstValueFrom } from 'rxjs';
import { User } from './../user/user.entity';
import { JwtPayload } from './jwtPayload';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { id } = payload;
    const user = await firstValueFrom(this.userService.getUserById({ id }));
    if (!user) {
      throw new UnauthorizedException();
    }
    // whatever is returned here, gonna be injected into the request that is guarded with this authentication.
    return user;
  }
}
