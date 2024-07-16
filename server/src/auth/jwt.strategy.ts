import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_CONSTANTS,
        });
    }

    async validate(payload: any) {
        return {
            name: payload.name,
            surname: payload.surname,
            id: payload.id,
            role: payload.role,
            email: payload.email,
        };
    }
}