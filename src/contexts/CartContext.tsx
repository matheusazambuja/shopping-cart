import { createContext, ReactNode, useEffect, useState } from "react";
import { ProductInCart } from '../types'
import { products } from '../products.json'

export interface UpdateProductQuantity {
  productId: number;
  quantity: number;
}

interface CartContextData {
  cart: ProductInCart[],
  addProduct: (productId: number) => void
  removeProduct: (productId: number) => void
  updateProductQuantity: ({ productId, quantity }: UpdateProductQuantity) => void
  productInCart: (productId: number) => boolean
}

interface CartProviderProps {
  children: ReactNode
}

export const CartContext = createContext(
  {} as CartContextData
)

export function CartProvider({
  children
}: CartProviderProps) {

  const [cart, setCart] = useState<ProductInCart[]>([])

  useEffect(() => {
    const storagedCart = localStorage.getItem('@ShoppingCart:cart')

    if (storagedCart) setCart(JSON.parse(storagedCart))

  }, [])


  async function addProduct(productId: number) {
    const indexProduct = cart.findIndex((product) => product.id === productId)

    if (indexProduct === -1) {
      const productStockSelected = products.filter(product => product.id === productId)[0]

      const cartUpdated = [ ...cart, { ...productStockSelected, quantity: 1, inCart: true } ]

      setCart(cartUpdated)
      localStorage.setItem('@ShoppingCart:cart', JSON.stringify(cartUpdated))
    } else {

      const cartUpdated = cart.map((product) => {

        if (product.id === productId) {
          return { ...product, quantity: product.quantity + 1 }
        }

        return product
      })

      setCart(cartUpdated)
      localStorage.setItem('@ShoppingCart:cart', JSON.stringify(cartUpdated))
    }
  }

  function removeProduct(productId: number) {
    const indexProduct = cart.findIndex((product) => product.id === productId)

    if (indexProduct === -1) {
      // Gerar erro: Produto nao encontrado no carrinho
      return
    }

    const cartUpdated = cart.filter((product) => product.id !== productId)

    setCart(cartUpdated)
    localStorage.setItem('@ShoppingCart:cart', JSON.stringify(cartUpdated))
  }

  async function updateProductQuantity ({
    productId, quantity
  }: UpdateProductQuantity) {
    
    const productStockSelected = products.filter(product => product.id === productId)[0]

    if (quantity <= 0) {
      // Gerar error: Não é possível adicionar um quantidade menor que 1
      return
    }

    if (productStockSelected.quantity < quantity) {
      // Gerar erro: Quantidade fora de estoque
      return
    }

    const cartUpdated = cart.map((product) => {

      if (product.id === productId) {
        return { ...product, quantity: quantity }
      }

      return product
    })

    setCart(cartUpdated)
    localStorage.setItem('@ShoppingCart:cart', JSON.stringify(cartUpdated))
  }

  function productInCart(productId: number) {
    const indexProduct = cart.findIndex(product => product.id === productId)

    if (indexProduct === -1) return false

    return true
  }


  return (
    <CartContext.Provider value={{
      cart,
      addProduct,
      removeProduct,
      updateProductQuantity,
      productInCart
    }}>
      {children}
    </CartContext.Provider>
  )
}