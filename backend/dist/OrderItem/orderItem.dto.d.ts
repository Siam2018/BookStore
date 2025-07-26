export declare class CreateOrderItemDto {
    orderId: number;
    productId: number;
    quantity: number;
    price: number;
    subtotal: number;
}
export declare class UpdateOrderItemDto {
    orderId?: number;
    productId?: number;
    quantity?: number;
    price?: number;
    subtotal?: number;
}
export declare class OrderItemResponseDto {
    id: number;
    orderId: number;
    productId: number;
    quantity: number;
    price: number;
    subtotal: number;
    createdAt: Date;
    updatedAt: Date;
    product?: {
        id: number;
        name: string;
        price: number;
    };
}
