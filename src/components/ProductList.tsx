import { Button, Flex, Image, ListItem, Text, UnorderedList, useControllableState } from '@chakra-ui/react'
import { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';

import { Product } from "../types";

interface ProductListProps {
  productsStock: Product[]
}

export function ProductList({ productsStock }: ProductListProps) {

  const {
    addProduct,
    removeProduct
  } = useContext(CartContext)

  function handleAddProduct(productId: number) {
    addProduct(productId)
  }

  function handleRemoveProduct(productId: number) {
    removeProduct(productId)
  }

  return (
    <UnorderedList gridArea='productList'>
      {productsStock.map((product) => (
        <ListItem key={product.id}
        >
          <Flex as='div'
          >
            <Image src={product.imageURL} alt={product.name} />
            <Text as='strong'>{product.name}</Text>
          </Flex>
          <Flex as='div'
          >
            <Text as='span'>{product.price}</Text>
            {!product.inCart ? (
              <Button type='button' onClick={() => handleAddProduct(product.id)}
              >
                Adicionar ao carrinho
              </Button>
            )
            :
            (
              <Flex as='div'

              >
                <Button type='button' onClick={() => handleRemoveProduct(product.id)}
                  width='100%'
                >
                  No carrinho
                </Button>
                <Button type='button'
                >
                  X
                </Button>
              </Flex>
            )}
          </Flex>
        </ListItem>
      ))}
    </UnorderedList>
  )
}