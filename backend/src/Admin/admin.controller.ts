import { Controller, Get, Post, Put, Patch, Delete, Param, Body, UsePipes, ValidationPipe, UploadedFile, UseInterceptors, Res, Query } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { AdminService } from './admin.service';
import { AdminDto } from './admin.dto';

@Controller('admin')
export class AdminController {
   
    @Put('username/:username')
 
    async updateByUsername(@Param('username') username: string, @Body() updateData: Partial<AdminDto>) {
        try {
            return await this.adminService.updateByUsername(username, updateData);
        } catch (error) {
            return { message: error.message };
        }
    }
    constructor(private readonly adminService: AdminService) {}

    @Post()
    @UsePipes(new ValidationPipe())
    async create(@Body() dto: AdminDto) {
        return this.adminService.createAdmin(dto);
    }

    @Get()
    async findAll(@Query('fullName') fullName?: string) {
        if (fullName) {
            return this.adminService.findByFullNameSubstring(fullName);
        }
        return this.adminService.getAllAdmins();
    }

    @Get('username/:username')
    async findByUsername(@Param('username') username: string) {
        try {
            return await this.adminService.findByUsername(username);
        } catch (error) {
            return { message: error.message };
        }
    }

    @Delete('username/:username')
    async removeByUsername(@Param('username') username: string) {
        await this.adminService.deleteByUsername(username);
        return { message: 'Admin deleted by username' };
    }

    @Patch('username/:username/image')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './uploads',
            filename: (req, file, cb) => {
                cb(null, Date.now() + '-' + file.originalname);
            }
        }),
        fileFilter: (req, file, cb) => {
            if (file.originalname.match(/^.*\.(jpg|jpeg|png|webp)$/)) {
                cb(null, true);
            } else {
                cb(new Error('Invalid file type'), false);
            }
        },
        limits: { fileSize: 1000000 }
    }))
    async updateImage(@Param('username') username: string, @UploadedFile() file: Express.Multer.File) {
        try {
            return await this.adminService.updateByUsername(username, { imageURL: `/uploads/${file.filename}` });
        } catch (error) {
            return { message: error.message };
        }
    }








    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.adminService.getAdminById(id);
    }

    @Put(':id')
    @UsePipes(new ValidationPipe())
    async update(@Param('id') id: string, @Body() updateData: Partial<AdminDto>) {
        return this.adminService.updateAdmin(id, updateData);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        await this.adminService.deleteAdmin(id);
        return { message: 'Admin deleted' };
    }
    @Post('upload')
    @UseInterceptors(FileInterceptor('file', {
        fileFilter: (req, file, cb) => {
            if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
                cb(null, true);
            else {
                cb(new Error('LIMIT_UNEXPECTED_FILE'), false);
            }
        },
        limits: { fileSize: 30000 },
        storage: diskStorage({
            destination: './uploads',
            filename: function (req, file, cb) {
                cb(null, Date.now() + '-' + file.originalname);
            },
        })
    }))
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        return { message: `Uploaded file: ${file.originalname}` };
    }

    @Get('getfile/:filename')
    getFile(@Param('filename') filename: string, @Res() res) {
        return res.sendFile(filename, { root: './uploads' });
    }
}
