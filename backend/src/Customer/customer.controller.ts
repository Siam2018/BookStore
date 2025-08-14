import { Controller, Get, Post, Put, Delete, Param, Body, UseInterceptors, UsePipes, ValidationPipe, UploadedFile, Res, ParseIntPipe, Query, Patch } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { FileInterceptor } from '@nestjs/platform-express/multer/interceptors/file.interceptor';
import { CustomerDto, UpdateCustomerStatusDto } from './customer.dto';
import { MulterError, diskStorage } from 'multer';

@Controller('customer')
export class CustomerController {
    constructor(private readonly customerService: CustomerService) { }
    // Get all customers
    @Get('/')
    async findAll() {
        const customers = await this.customerService.getAllCustomers();
        return {
            message: 'Get all customers',
            data: customers,
            status: 'success'
        };
    }

    // Get customer by ID
    @Get('/:id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        const customer = await this.customerService.getCustomerById(id);
        return {
            message: `Get customer with ID: ${id}`,
            data: customer,
            status: 'success'
        };
    }

    // User Category 1 Operation 1: Create a user
    @Post('/addcustomer')
    @UsePipes(new ValidationPipe())
    async addCustomer(@Body() customerData: CustomerDto) {
        const newCustomer = await this.customerService.addCustomer(customerData);
        
        return {
            message: 'Customer added successfully',
            data: newCustomer,
            status: 'success'
        };
    }

    // User Category 1 Operation 2: Change the status of a user to either 'active' or 'inactive'
    @Put('/:id/status')
    @UsePipes(new ValidationPipe())
    async updateCustomerStatus(
        @Param('id', ParseIntPipe) id: number, 
        @Body() statusData: UpdateCustomerStatusDto
    ) {
        const updatedCustomer = await this.customerService.updateCustomerStatus(id, statusData);
        return {
            message: 'Customer status updated successfully',
            data: updatedCustomer,
            status: 'success'
        };
    }

    // User Category 1 Operation 3: Retrieve a list of users based on their 'inactive' status
    @Get('/status/inactive')
    async getInactiveCustomers() {
        const inactiveCustomers = await this.customerService.getInactiveCustomers();
        return {
            message: 'Retrieved inactive customers',
            data: inactiveCustomers,
            status: 'success'
        };
    }

    // Get active customers (additional functionality)
    @Get('/status/active')
    async getActiveCustomers() {
        const activeCustomers = await this.customerService.getActiveCustomers();
        return {
            message: 'Retrieved active customers',
            data: activeCustomers,
            status: 'success'
        };
    }

    // User Category 1 Operation 4: Get a list of users older than specified age
    @Get('/age/older-than/:minAge')
    async getCustomersOlderThan(@Param('minAge', ParseIntPipe) minAge: number) {
        const customers = await this.customerService.getCustomersOlderThan(minAge);
        return {
            message: `Retrieved customers older than ${minAge}`,
            data: customers,
            status: 'success'
        };
    }

    // Get customers by age range
    @Get('/age/range')
    async getCustomersByAge(
        @Query('minAge', ParseIntPipe) minAge: number,
        @Query('maxAge') maxAge?: string
    ) {
        const customers = await this.customerService.getCustomersByAge(minAge, maxAge ? parseInt(maxAge) : undefined);
        return {
            message: `Retrieved customers by age range`,
            data: customers,
            status: 'success'
        };
    }

    // Get customers by city
    @Get('/city/:city')
    async getCustomersByCity(@Param('city') city: string) {
        const customers = await this.customerService.getCustomersByCity(city);
        return {
            message: `Retrieved customers from city: ${city}`,
            data: customers,
            status: 'success'
        };
    }

    // Get customers by gender
    @Get('/gender/:gender')
    async getCustomersByGender(@Param('gender') gender: string) {
        const customers = await this.customerService.getCustomersByGender(gender);
        return {
            message: `Retrieved customers by gender: ${gender}`,
            data: customers,
            status: 'success'
        };
    }

    // Search customers by name
    @Get('/search/:searchTerm')
    async searchCustomersByName(@Param('searchTerm') searchTerm: string) {
        const customers = await this.customerService.searchCustomersByName(searchTerm);
        return {
            message: `Search results for: ${searchTerm}`,
            data: customers,
            status: 'success'
        };
    }

    // Toggle customer status between active/inactive (User Category 1)
    @Put('/:id/toggle-status')
    async toggleCustomerStatus(@Param('id', ParseIntPipe) id: number) {
        const customer = await this.customerService.toggleCustomerStatus(id);
        return {
            message: 'Customer status toggled successfully',
            data: customer,
            status: 'success'
        };
    }

    // General update customer
    @Put('/:id')
    @UsePipes(new ValidationPipe({whitelist: true, forbidNonWhitelisted: true,transform: true}))
    async updateCustomer(
        @Param('id', ParseIntPipe) id: number, 
        @Body() updateData: Partial<CustomerDto>
    ) {
        const updatedCustomer = await this.customerService.updateCustomer(id, updateData);
        return {
            message: 'Customer updated successfully',
            data: updatedCustomer,
            status: 'success'
        };
    }

    // Delete customer
    @Delete('/:id')
    async deleteCustomer(@Param('id', ParseIntPipe) id: number) {
        await this.customerService.deleteCustomer(id);
        return {
            message: 'Customer deleted successfully',
            status: 'success'
        };
    }

    
    @Patch('/:id/image')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './uploads/customers',
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                cb(null, uniqueSuffix + '-' + file.originalname);
            },
        }),
        fileFilter: (req, file, cb) => {
            if (file.mimetype.match(/^image\/(jpg|jpeg|png|webp)$/)) {
                cb(null, true);
            } else {
                cb(new Error('Only image files are allowed!'), false);
            }
        },
        limits: { fileSize: 2 * 1024 * 1024 },
    }))
    async uploadImage(
        @Param('id', ParseIntPipe) id: number,
        @UploadedFile() file: Express.Multer.File
    ) {
        if (!file) {
            return { message: 'No file uploaded', status: 'error' };
        }
        const imageURL = `/uploads/customers/${file.filename}`;
        const updated = await this.customerService.updateCustomerImage(id, imageURL);
        return {
            message: 'Customer image uploaded successfully',
            data: updated,
            status: 'success',
            imageURL,
        };
    }

    @Get('/:id/image')
    async getCustomerImage(@Param('id', ParseIntPipe) id: number, @Res() res) {
        const imagePath = await this.customerService.getCustomerImagePath(id);
        if (!imagePath) {
            return res.status(404).json({ message: 'No image found for this customer.' });
        }
        // Remove leading slash if present
        const normalizedPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
        return res.sendFile(normalizedPath, { root: './' });
    }
}
