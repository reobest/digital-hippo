export interface ProductType {
    _id: string,
    name: string,
    productDetails: string,
    price: string,
    category: string,
    images: string[],
    userEmail?:string,
}