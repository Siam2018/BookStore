"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const admin_service_1 = require("./admin.service");
const jwtAuth_guard_1 = require("../Auth/jwtAuth.guard");
const admin_dto_1 = require("./admin.dto");
let AdminController = class AdminController {
    adminService;
    async updateByUsername(username, updateData) {
        try {
            return await this.adminService.updateByUsername(username, updateData);
        }
        catch (error) {
            const status = error.status || 500;
            throw new (error.constructor || require('@nestjs/common').HttpException)(error.message || 'Failed to update admin by username', status);
        }
    }
    constructor(adminService) {
        this.adminService = adminService;
    }
    async create(dto) {
        return this.adminService.createAdmin(dto);
    }
    async findAll(fullName) {
        if (fullName) {
            return this.adminService.findByFullNameSubstring(fullName);
        }
        return this.adminService.getAllAdmins();
    }
    async findByUsername(username) {
        try {
            return await this.adminService.findByUsername(username);
        }
        catch (error) {
            const status = error.status || 404;
            throw new (error.constructor || require('@nestjs/common').HttpException)(error.message || 'Admin not found', status);
        }
    }
    async removeByUsername(username) {
        await this.adminService.deleteByUsername(username);
        return { message: 'Admin deleted by username' };
    }
    async updateImage(username, file) {
        try {
            return await this.adminService.updateByUsername(username, { imageURL: `/uploads/${file.filename}` });
        }
        catch (error) {
            const status = error.status || 500;
            throw new (error.constructor || require('@nestjs/common').HttpException)(error.message || 'Failed to update admin image', status);
        }
    }
    async findOne(id) {
        return this.adminService.getAdminById(id);
    }
    async update(id, updateData) {
        return this.adminService.updateAdmin(id, updateData);
    }
    async remove(id) {
        await this.adminService.deleteAdmin(id);
        return { message: 'Admin deleted' };
    }
    uploadFile(file) {
        return { message: `Uploaded file: ${file.originalname}` };
    }
    getFile(filename, res) {
        return res.sendFile(filename, { root: './uploads' });
    }
};
exports.AdminController = AdminController;
__decorate([
    (0, common_1.Put)('username/:username'),
    __param(0, (0, common_1.Param)('username')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updateByUsername", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_dto_1.AdminDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('fullName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('username/:username'),
    __param(0, (0, common_1.Param)('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "findByUsername", null);
__decorate([
    (0, common_1.Delete)('username/:username'),
    __param(0, (0, common_1.Param)('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "removeByUsername", null);
__decorate([
    (0, common_1.Patch)('username/:username/image'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads',
            filename: (req, file, cb) => {
                cb(null, Date.now() + '-' + file.originalname);
            }
        }),
        fileFilter: (req, file, cb) => {
            if (file.originalname.match(/^.*\.(jpg|jpeg|png|webp)$/)) {
                cb(null, true);
            }
            else {
                cb(new Error('Invalid file type'), false);
            }
        },
        limits: { fileSize: 1000000 }
    })),
    __param(0, (0, common_1.Param)('username')),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updateImage", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        fileFilter: (req, file, cb) => {
            if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
                cb(null, true);
            else {
                cb(new Error('LIMIT_UNEXPECTED_FILE'), false);
            }
        },
        limits: { fileSize: 30000 },
        storage: (0, multer_1.diskStorage)({
            destination: './uploads',
            filename: function (req, file, cb) {
                cb(null, Date.now() + '-' + file.originalname);
            },
        })
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Get)('getfile/:filename'),
    __param(0, (0, common_1.Param)('filename')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getFile", null);
exports.AdminController = AdminController = __decorate([
    (0, common_1.UseGuards)(jwtAuth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('admin'),
    __metadata("design:paramtypes", [admin_service_1.AdminService])
], AdminController);
//# sourceMappingURL=admin.controller.js.map