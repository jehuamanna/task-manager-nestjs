import { UnauthorizedException } from '@nestjs/common'
import {PassportStrategy} from '@nestjs/passport'
import { InjectRepository } from '@nestjs/typeorm'
import {Strategy, ExtractJwt} from 'passport-jwt'
import { JwtPayload } from './jwt-payload.interface'
import { User } from './user.entity'
import { UserRepository } from './user.repository'

export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectRepository(User)
        private userRepository: UserRepository
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'topSecret87'
        })
    }

    async validate(payload: JwtPayload): Promise<User> {
        const {username} = payload
        const user = await this.userRepository.findOne({username})
        if(!user){
            throw new UnauthorizedException()
        }
        return user;
    }
}