export interface IProduct {
    id?: number,
    productName: string,
    productUnitPrice: number,
    productUnitInStock: number
}

export interface IUpdatePrice {
    id: number,
    productUnitPrice: number
}

export interface IUpdateStock {
    id: number,
    productUnitInStock: number
}

export interface IUpdateName {
    id: number,
    productName: string
}

export interface IAddCustom {
    productName: string
}