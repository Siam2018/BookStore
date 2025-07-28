import { AdminDto } from './admin.dto';
export declare class AdminService {
    getAllAdmins(): string;
    getAdminById(adminId: number): string;
    addAdmin(adminData: AdminDto): string;
    updateAdmin(adminId: number, updateData: Partial<AdminDto>): string;
    deleteAdmin(adminId: number): string;
}
