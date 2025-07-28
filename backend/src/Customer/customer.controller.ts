import { Controller, Get, Post, Put, Delete, Param, Body, UseInterceptors, UsePipes, ValidationPipe, UploadedFile, Res, ParseIntPipe} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { FileInterceptor } from '@nestjs/platform-express/multer/interceptors/file.interceptor';
import { CustomerDto } from './customer.dto';
import { MulterError, diskStorage } from 'multer';

@Controller('customer')
export class CustomerController {
    constructor(private readonly customerService: CustomerService) { }

    @Get('/')
    findAll() {
        return {
            message: 'Get all customers',
            data: [],
            status: 'success'
        };
    }

    @Get('/:id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return {
            message: `Get customer with ID: ${id}`,
            data: this.customerService.getCustomerById(id),
            status: 'success'
        };
    }

    @Post('/addcustomer')
    @UsePipes(new ValidationPipe())
    addCustomer(@Body() customerData: CustomerDto) {
        const newCustomer = this.customerService.addCustomer(customerData);
        
        return {
            message: 'Customer added successfully',
            data: newCustomer,
            status: 'success'
        };
    }

    @Put('/:id')
    @UsePipes(new ValidationPipe())
    updateCustomer(
        @Param('id', ParseIntPipe) id: number, 
        @Body() updateData: Partial<CustomerDto>
    ) {
        return {
            message: 'Customer updated successfully',
            data: this.customerService.updateCustomer(id, updateData),
            status: 'success'
        };
    }

    @Delete('/:id')
    deleteCustomer(@Param('id', ParseIntPipe) id: number) {
        return {
            message: 'Customer deleted successfully',
            data: this.customerService.deleteCustomer(id),
            status: 'success'
        };
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
        limits: { fileSize: 1000000 },
        storage: diskStorage({
            destination: './uploads',
            filename: function (req, file, cb) {
                cb(null, Date.now() + file.originalname)
            },
        })
    }))
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        return {
            message: 'File uploaded successfully',
            data: `Uploaded file: ${file.originalname}`,
            status: 'success'
        };
    }
    
    @Get('/getfile/:filename')
    getFile(@Param('filename') filename: string, @Res() res) {
        res.sendFile(filename, { root: './uploads' });
    }
}