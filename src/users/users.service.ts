import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private repo: Repository<User>) {}

    async create(name: string, mobile: string, password: string) {
        const lastLogin = new Date();
        const status = true;
        const ipAddress = '192.168.1.1'
        
        const user = await this.repo.create({
            name, mobile, password, last_login: lastLogin, status, ip_address: ipAddress
        });

        return await this.repo.save(user);
    }

    async find(mobile: string) {
        return await this.repo.findOneBy({ mobile });
    }

    async findById(id: number) {
        return await this.repo.findOneBy({ id });
    }

    async update(id: number, attrs: Partial<User>) {
        const user = await this.findById(id);

        if(!user) {
            throw new Error('Unable to find user');
        }

        Object.assign(user, attrs);

        return await this.repo.save(user);
    }
}
