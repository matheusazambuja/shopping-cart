export interface ProductInStock {
  id: number
  name: string
  price: number
  imageURL: string
  quantity: number
}

export interface ProductInCart extends ProductInStock {
  inCart: boolean
}