import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CustomerService } from '../Customer/customer.service';
import { AdminService } from '../Admin/admin.service';
import { CustomerEntity } from '../Customer/customer.entity';
import { AdminEntity } from '../Admin/admin.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly customerService: CustomerService,
    private readonly adminService: AdminService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(identifier: string, pass: string): Promise<AdminEntity | CustomerEntity | null> {
    // Try admin by username
    let user: AdminEntity | CustomerEntity | null = null;
    try {
      user = await this.adminService.findByUsername(identifier);
    } catch {}
    // Try admin by email if not found by username
    if (!user) {
      user = await this.adminService['adminRepository']?.findOneBy?.({ email: identifier }) ?? null;
    }
    // Try customer by email if not found as admin
    if (!user) {
      user = await this.customerService.findByEmail(identifier);
    }
    if (user && 'password' in user && await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user as any;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      role: user.role,
    };
  }
}
