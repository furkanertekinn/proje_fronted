export interface IProduct {
    id?: number,
    productName: string,
    productUnitPrice: number,
    productUnitInStock: number
}

export interface IUpdatePrice{
    id: number,
    productUnitPrice: number,
}