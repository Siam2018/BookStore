import { Controller, Get, Post, Put, Delete, Param, Body, UsePipes, ValidationPipe, ParseIntPipe, UseInterceptors, UploadedFile, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer/interceptors/file.interceptor';
import { MulterError, diskStorage } from 'multer';
import { AdminService } from './admin.service';
import { AdminDto } from './admin.dto';

@Controller('admin')
export class AdminController {
    constructor(private readonly adminService: AdminService) {}

    @Get('/')
    findAll() {
        return this.adminService.getAllAdmins();
    }

    @Get('/:adminId')
    findOne(@Param('adminId', ParseIntPipe) adminId: number) {
        return this.adminService.getAdminById(adminId);
    }

    @Post('/addadmin')
    @UsePipes(new ValidationPipe())
    addAdmin(@Body() adminData: AdminDto) {
        return this.adminService.addAdmin(adminData);
    }

    @Put('/:adminId')
    @UsePipes(new ValidationPipe())
    updateAdmin(
        @Param('adminId', ParseIntPipe) adminId: number,
        @Body() updateData: Partial<AdminDto>
    ) {
        return this.adminService.updateAdmin(adminId, updateData);
    }

    @Delete('/:adminId')
    deleteAdmin(@Param('adminId', ParseIntPipe) adminId: number) {
        return this.adminService.deleteAdmin(adminId);
    }
  @Post('/upload')
  @UseInterceptors(FileInterceptor('file', {
    fileFilter: (req, file, cb) => {
      if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
        cb(null, true);
      else {
        cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
      }
    },
    limits: { fileSize: 30000 },
    storage: diskStorage({
      destination: './uploads',
      filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
      },
    })
  }))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return `Uploaded file: ${file.originalname}`;
  }

  @Get('/getfile/:filename')
  getFile(@Param('filename') filename, @Res() res) {
    res.sendFile(filename, { root: './uploads' });
  }
}
