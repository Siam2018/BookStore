import { Repository } from 'typeorm';
import { AdminEntity } from './admin.entity';
import { AdminDto } from './admin.dto';
export declare class AdminService {
    private adminRepository;
    constructor(adminRepository: Repository<AdminEntity>);
    createAdmin(admin: AdminDto): Promise<AdminEntity>;
    getAllAdmins(): Promise<AdminEntity[]>;
    getAdminById(id: string): Promise<AdminEntity | null>;
    updateAdmin(id: string, updatedAdmin: Partial<AdminDto>): Promise<AdminEntity | null>;
    deleteAdmin(id: string): Promise<void>;
    findByFullNameSubstring(substring: string): Promise<AdminEntity[]>;
    findByUsername(username: string): Promise<AdminEntity | null>;
    deleteByUsername(username: string): Promise<void>;
}
