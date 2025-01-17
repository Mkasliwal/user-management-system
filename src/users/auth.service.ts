import {
    BadRequestException,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { env } from 'src/config/config.service';


@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async signup(name: string, mobile: string, password: string) {
        const user = await this.usersService.find(mobile);

        if (user) {
            throw new BadRequestException(
                'Mobile number is already registered. Try different one'
            );
        }

        // hash password
        const hash = await bcrypt.hash(password, 10);

        // create the user
        await this.usersService.create(name, mobile, hash);

        return 'User registered successfully ✨. Signin to continue.';
    }

    async signin(mobile: string, password: string) {
        const user = await this.usersService.find(mobile);

        if (!user) {
            throw new NotFoundException('User not found');
        }

        const userPassword = user.password;
        const match = await bcrypt.compare(password, userPassword);

        if (!match) {
            throw new UnauthorizedException('Invalid Password');
        }

        await this.usersService.update(user.id, {
            last_login: new Date(),
        });

        // jwt token
        const token = this.jwtService.sign(user.id.toString(), {
            privateKey: env('JWT_SECRET'),
        });

        // set cookie

        return { token, user };
    }
}
