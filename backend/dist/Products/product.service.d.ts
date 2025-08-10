import { Repository } from 'typeorm';
import { ProductEntity } from './product.entity';
import { ProductDto } from './product.dto';
export declare class ProductService {
    private productRepository;
    constructor(productRepository: Repository<ProductEntity>);
    getProductImagePath(id: number): Promise<string | null>;
    addProduct(productDto: ProductDto): Promise<ProductEntity>;
    getAllProducts(): Promise<ProductEntity[]>;
    getProductById(id: number): Promise<ProductEntity>;
    updateProduct(id: number, updateData: Partial<ProductDto>): Promise<ProductEntity>;
    deleteProduct(id: number): Promise<boolean>;
}
