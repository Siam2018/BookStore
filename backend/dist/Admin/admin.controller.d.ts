import { AdminService } from './admin.service';
import { AdminDto } from './admin.dto';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    findAll(): string;
    findOne(adminId: number): string;
    addAdmin(adminData: AdminDto): string;
    updateAdmin(adminId: number, updateData: Partial<AdminDto>): string;
    deleteAdmin(adminId: number): string;
    uploadFile(file: Express.Multer.File): string;
    getFile(filename: any, res: any): void;
}
