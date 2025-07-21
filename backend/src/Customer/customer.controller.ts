import { Controller, Get, Param, Post, UseInterceptors, UsePipes, ValidationPipe, Body, UploadedFile, Res } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { FileInterceptor } from '@nestjs/platform-express/multer/interceptors/file.interceptor';
import { CustomerDto } from './customer.dto';
import { MulterError, diskStorage } from 'multer';
import { FlatESLint } from 'eslint/use-at-your-own-risk';

@Controller('customers')
export class CustomerController {
    constructor(private readonly customerService: CustomerService) { }

    @Get('/')
    findAll() {
        return 'This action returns all customers';
    }
    @Get('/:id')
    findOne(@Param('id') id: string): string {
        return this.customerService.getCustomerById(+id);
    }
    @Post('/addcustomer')
    @UsePipes(new ValidationPipe())
    addCustomer(@Body() customerData: CustomerDto): string {
        return this.customerService.addCustomer(customerData);
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