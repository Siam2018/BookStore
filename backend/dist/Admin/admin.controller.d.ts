import { AdminService } from './admin.service';
import { AdminDto } from './admin.dto';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
<<<<<<< HEAD
    findAll(): string;
    findOne(adminId: number): string;
    addAdmin(adminData: AdminDto): string;
    updateAdmin(adminId: number, updateData: Partial<AdminDto>): string;
    deleteAdmin(adminId: number): string;
    uploadFile(file: Express.Multer.File): string;
    getFile(filename: any, res: any): void;
=======
    create(dto: AdminDto): Promise<import("./admin.entity").AdminEntity>;
    findAll(fullName?: string): Promise<import("./admin.entity").AdminEntity[]>;
    findByUsername(username: string): Promise<import("./admin.entity").AdminEntity | null>;
    removeByUsername(username: string): Promise<{
        message: string;
    }>;
    findOne(id: string): Promise<import("./admin.entity").AdminEntity | null>;
    update(id: string, updateData: Partial<AdminDto>): Promise<import("./admin.entity").AdminEntity | null>;
    remove(id: string): Promise<{
        message: string;
    }>;
    uploadFile(file: Express.Multer.File): {
        message: string;
    };
    getFile(filename: string, res: any): any;
>>>>>>> main
}
