import { Body, Controller, Post, UseInterceptors, Session, Get, UnauthorizedException } from '@nestjs/common';
import { SignUpDto } from './dtos/signup.dto';
import { SigninDto } from './dtos/signin.dto';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { SerializeInterceptor } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { JwtService } from '@nestjs/jwt';
import { env } from 'src/config/config.service';

@Controller('auth')
@UseInterceptors(new SerializeInterceptor(UserDto))
export class UsersController {
    constructor(
        private userService: UsersService,
        private authService: AuthService,
        private jwtService: JwtService
    ) {}

    @Get('/whoami')
    async whoami(@Session() session: any) {
        const token = session.token;

        if(!token) {
            throw new UnauthorizedException('Ensure you are signed in')
        }
        const userId = this.jwtService.verify(token, {publicKey: env('JWT_SECRET')});
        
        const user = await this.userService.findById(parseInt(userId));
        return user;
    }

    @Post('/signup')
    async createUser(@Body() payload: SignUpDto) {
        const { name, mobile, password } = payload;

        return await this.authService.signup(name, mobile, password);
    }

    @Post('/signin')
    async signin(@Body() payload: SigninDto, @Session() session: any) {
        const { mobile, password } = payload;

        const { token, user } = await this.authService.signin(mobile, password);
        session.token = token;

        return user;
    }

    @Post('/signout')
    async signOut(@Session() session: any) {
        /** 
         * @TODO
         * - set user status --> false
         * - set session token --> null
        */

        session.token = null;

        return 'Logged out successfully'
    }
}
