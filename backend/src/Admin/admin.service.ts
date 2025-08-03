import { Injectable } from '@nestjs/common';
import { AdminDto } from './admin.dto';

@Injectable()
export class AdminService {
    getAllAdmins() {
        return 'This action returns all admins';
    }

    getAdminById(adminId: number) {
        return `Admin ID: ${adminId}`;
    }

    addAdmin(adminData: AdminDto) {
        return `Admin added with name: ${adminData.name}, email: ${adminData.email}`;
    }

    updateAdmin(adminId: number, updateData: Partial<AdminDto>) {
        return `Admin ${adminId} updated with details: ${JSON.stringify(updateData)}`;
    }

    deleteAdmin(adminId: number) {
        return `Admin ${adminId} deleted`;
    }
}
