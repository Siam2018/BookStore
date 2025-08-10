import { ProductService } from './product.service';
import { ProductDto } from './product.dto';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    getProductImage(id: number, res: any): Promise<any>;
    findAll(): Promise<{
        message: string;
        data: import("./product.entity").ProductEntity[];
        status: string;
    }>;
    findOne(id: number): Promise<{
        message: string;
        data: import("./product.entity").ProductEntity;
        status: string;
    }>;
    create(dto: ProductDto): Promise<{
        message: string;
        data: import("./product.entity").ProductEntity;
        status: string;
    }>;
    update(id: number, dto: ProductDto): Promise<{
        message: string;
        data: import("./product.entity").ProductEntity;
        status: string;
    }>;
    patch(id: number, dto: Partial<ProductDto>): Promise<{
        message: string;
        data: import("./product.entity").ProductEntity;
        status: string;
    }>;
    uploadImage(id: number, file: Express.Multer.File): Promise<{
        message: string;
        status: string;
        data?: undefined;
        imageURL?: undefined;
    } | {
        message: string;
        data: import("./product.entity").ProductEntity;
        status: string;
        imageURL: string;
    }>;
    remove(id: number): Promise<{
        message: string;
        data: boolean;
        status: string;
    }>;
}
