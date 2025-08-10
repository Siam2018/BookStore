import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminEntity } from './admin.entity';
import { AdminDto } from './admin.dto';

@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(AdminEntity)
        private adminRepository: Repository<AdminEntity>,
    ) {}

    async createAdmin(admin: AdminDto): Promise<AdminEntity> {
        const existing = await this.adminRepository.findOneBy({ username: admin.username });
        if (existing) {
            throw new ConflictException('Username already exists');
        }
        const entity = this.adminRepository.create(admin);
        return this.adminRepository.save(entity);
    }

    async getAllAdmins(): Promise<AdminEntity[]> {
        return this.adminRepository.find();
    }

    async getAdminById(id: string): Promise<AdminEntity | null> {
        return this.adminRepository.findOneBy({ id });
    }

    async updateAdmin(id: string, updatedAdmin: Partial<AdminDto>): Promise<AdminEntity | null> {
        await this.adminRepository.update(id, updatedAdmin);
        return this.adminRepository.findOneBy({ id });
    }

    async deleteAdmin(id: string): Promise<void> {
        await this.adminRepository.delete(id);
    }
    async findByFullNameSubstring(substring: string): Promise<AdminEntity[]> {
        return this.adminRepository.createQueryBuilder('admin')
            .where('admin.fullName ILIKE :substring', { substring: `%${substring}%` })
            .getMany();
    }

    async findByUsername(username: string): Promise<AdminEntity | null> {
        return this.adminRepository.findOneBy({ username });
    }

    async deleteByUsername(username: string): Promise<void> {
        await this.adminRepository.delete({ username });
    }
}
