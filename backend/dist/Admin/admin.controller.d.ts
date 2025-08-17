import { AdminService } from './admin.service';
import { AdminDto } from './admin.dto';
export declare class AdminController {
    private readonly adminService;
    updateByUsername(username: string, updateData: Partial<AdminDto>): Promise<import("./admin.entity").AdminEntity | null>;
    constructor(adminService: AdminService);
    create(dto: AdminDto): Promise<import("./admin.entity").AdminEntity>;
    findAll(fullName?: string): Promise<import("./admin.entity").AdminEntity[]>;
    findByUsername(username: string): Promise<import("./admin.entity").AdminEntity>;
    removeByUsername(username: string): Promise<{
        message: string;
    }>;
    updateImage(username: string, file: Express.Multer.File): Promise<import("./admin.entity").AdminEntity | null>;
    findOne(id: string): Promise<import("./admin.entity").AdminEntity | null>;
    update(id: string, updateData: Partial<AdminDto>): Promise<import("./admin.entity").AdminEntity | null>;
    remove(id: string): Promise<{
        message: string;
    }>;
    uploadFile(file: Express.Multer.File): {
        message: string;
    };
    getFile(filename: string, res: any): any;
}
