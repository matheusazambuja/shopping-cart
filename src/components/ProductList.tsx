import { Button, Flex, Image, ListItem, Text, UnorderedList, useControllableState } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';

import { ProductInStock } from "../types";
import { formatPrice } from '../utils/format';

interface ProductListProps {
  productsStock: ProductInStock[]
}

export function ProductList({ productsStock }: ProductListProps) {

  const {
    addProduct,
    removeProduct,
    productInCart
  } = useContext(CartContext)

  function handleAddProduct(productId: number) {
    addProduct(productId)
  }

  function handleRemoveProduct(productId: number) {
    removeProduct(productId)
  }

  return (
    <UnorderedList gridArea='productList'
      display='flex'
      flexWrap='wrap'
      margin='0 15px'
    >
      {productsStock.map((product) => (
        <ListItem key={product.id}
          display='flex'
          flexDirection='column'
          justifyContent='space-between'

          width='18rem'

          background='gray.200'
          borderRadius='9px'
          boxShadow='-1px 0px 9px 3px rgba(0,0,0,0.08)'
          margin='15px'
          padding='12px'
        >
          <Flex as='div'
            direction='column'
          >
            <Image src={product.imageURL} alt={product.name} 
              width='17rem'
              borderRadius='9px'
              paddingBottom='4px'
            />
            <Text as='strong'
              fontSize='1.1rem'
              marginLeft='7px'
            >
              {product.name}
            </Text>
          </Flex>
          <Flex as='div'
            direction='column'
          >
            <Text as='span'
              marginBottom='7px'
              marginLeft='7px'
              marginTop='9px'
            >
              {formatPrice(product.price)}
            </Text>
            {!productInCart(product.id) ? (
              <Button type='button' onClick={() => handleAddProduct(product.id)}
                background='green.400'
                boxShadow='-1px 0px 3px 1px rgba(0,0,0,0.21)'
                fontSize='1.07rem'
                fontWeight='500'

                _hover={{
                  filter: 'brightness(0.97)'
                }}
              >
                Adicionar ao carrinho
              </Button>
            )
            :
            (
              <Flex as='div'

              >
                <Text as='span'
                  display='flex'
                  alignItems='center'
                  justifyContent='center'
                  width='80%'

                  background='blue.600'
                  borderRadius='6px'
                  fontSize='1.07rem'
                  fontWeight='500'

                  marginRight='7px'
                >
                  No carrinho
                </Text>
                <Button type='button' onClick={() => handleRemoveProduct(product.id)}

                  _hover={{
                    background: 'red.600'
                  }}
                >
                  <FontAwesomeIcon icon='times' />
                </Button>
              </Flex>
            )}
          </Flex>
        </ListItem>
      ))}
    </UnorderedList>
  )
}