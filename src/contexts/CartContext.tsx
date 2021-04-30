import { createContext, ReactNode, useEffect, useState } from "react";
import { ProductInCart } from '../types'
import { products } from '../../db.json'
import { toast } from "react-toastify";
import Cookies from 'js-cookie';

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
    const cookiesCart = Cookies.getJSON('ShoppingCart:cart')

    if (cookiesCart) {
      setCart(cookiesCart)
    }

  }, [])

  async function addProduct(productId: number) {
    try {
      const indexProduct = cart.findIndex((product) => product.id === productId)

      if (indexProduct === -1) {
        const productStockSelected = products.filter(product => product.id === productId)[0]

        const cartUpdated = [ ...cart, { ...productStockSelected, quantity: 1, inCart: true } ]

        setCart(cartUpdated)
        Cookies.set('ShoppingCart:cart', JSON.stringify(cartUpdated));
      } else {

        const cartUpdated = cart.map((product) => {

          if (product.id === productId) {
            return { ...product, quantity: product.quantity + 1 }
          }

          return product
        })

        setCart(cartUpdated)
        Cookies.set('ShoppingCart:cart', JSON.stringify(cartUpdated));
      }
    }
    catch {
      toast.error('Erro na adição do produto')
    }
  }

  function removeProduct(productId: number) {
    try {
      const indexProduct = cart.findIndex((product) => product.id === productId)

      if (indexProduct === -1) {
        toast.error('Produto não encontrado no carrinho')
        return
      }

      const cartUpdated = cart.filter((product) => product.id !== productId)

      setCart(cartUpdated)
      Cookies.set('ShoppingCart:cart', JSON.stringify(cartUpdated));
    }
    catch {
      toast.error('Erro na remoção do produto')
    }
  }

  async function updateProductQuantity ({
    productId, quantity
  }: UpdateProductQuantity) {
    
    try {
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
      Cookies.set('ShoppingCart:cart', JSON.stringify(cartUpdated));
    }
    catch {
      toast.error('Erro na alteração de quantidade do produto')
    }
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
