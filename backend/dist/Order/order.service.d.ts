export declare class OrderService {
    getOrder(): string;
    getOrderById(orderid: number): string;
    addOrder(orderData: any): string;
    updateOrder(id: number, updateData: any): string;
    deleteOrder(id: number): string;
}
