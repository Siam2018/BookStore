"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
let AdminService = class AdminService {
    getAllAdmins() {
        return 'This action returns all admins';
    }
    getAdminById(adminId) {
        return `Admin ID: ${adminId}`;
    }
    addAdmin(adminData) {
        return `Admin added with name: ${adminData.name}, email: ${adminData.email}`;
    }
    updateAdmin(adminId, updateData) {
        return `Admin ${adminId} updated with details: ${JSON.stringify(updateData)}`;
    }
    deleteAdmin(adminId) {
        return `Admin ${adminId} deleted`;
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)()
], AdminService);
//# sourceMappingURL=admin.service.js.map