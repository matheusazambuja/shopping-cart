import { useContext, useState } from 'react';
import Image from 'next/image'

import { CartContext } from '../contexts/CartContext';
import { MotionLi, MotionUl, ProductInStock } from "../types";
import { formatPrice } from '../utils/format';

import { Badge, Box, Button, Center, Divider, Flex, Text, useColorModeValue, useToast } from '@chakra-ui/react'
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


interface ProductListProps {
  productsStock: ProductInStock[]
}

export function ProductList({ productsStock }: ProductListProps) {

  const {
    cart,
    addProduct,
    removeProduct,
    productInCart
  } = useContext(CartContext)

  const [productSelected, setProductSelected] = useState<ProductInStock>({} as ProductInStock)

  function handleProductSelected(productId: number) {
    const productSelected = productsStock.filter((productStock) => productStock.id === productId)[0]

    setProductSelected(productSelected)
  }

  function handleAddProduct(productId: number) {
    addProduct(productId)
  }

  function handleRemoveProduct(productId: number) {
    removeProduct(productId)
  }

  const toast = useToast()

  const variantsMotionUl = {
    hidden: { },
    show: {
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.2
      }
    }
  }

  const variantsMotionLi = {
    hidden: { opacity: 0, scale: 0 },
    show: { opacity: 1, scale: 1 }
  }

  const colorModeObject = {
    backgroundHome: useColorModeValue('gray.50', 'gray.850'),
    backgroundProduct: useColorModeValue('gray.50', 'gray.800'),
    colorProductName: useColorModeValue('gray.800', 'gray.100'),
    colorPrice: useColorModeValue('gray.900', 'gray.100'),
    colorButtonRemove: useColorModeValue('gray.900', 'gray.100'),
  }

  return (
    <MotionUl gridArea='content' display='flex' flexWrap='wrap'
      justifyContent='center'
      padding='0 1rem' width='100%'

      background={colorModeObject.backgroundHome} color='whiteAlpha.800'
      variants={variantsMotionUl} initial='hidden' animate='show'
    >
      {productsStock.map((product, indexProduct) => (
        <>
          <MotionLi key={product.id} data-key={product.id}

            listStyleType='none'
            width='24rem'
            height='fit-content'

            background={colorModeObject.backgroundProduct}
            borderRadius='0.5rem'
            boxShadow='-1px 0px 9px 3px rgba(0,0,0,0.08)'
            color={colorModeObject.colorProductName}
            margin='2rem'
            padding='0.75rem'

            variants={variantsMotionLi}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: indexProduct * 0.2 }}
            >
              <Box as='div'
                onClick={(event) => {
                  handleProductSelected(Number(event.currentTarget.parentElement.parentElement.parentElement.getAttribute('data-key')))
                }}
                width='22rem'
                borderRadius='0.5rem'
                margin='auto'

                _hover={{
                  cursor: 'pointer'
                }}
              >
                <Image 
                  alt={product.name} 
                  src={product.imageURL} 
                  width={768}
                  height={640}
                  objectFit='cover'
                />
              </Box>
            </motion.div>
            <Flex as='div'
              direction='column'
            >
              <Box as='div'
                d='flex' alignItems='center' margin='0.7rem 0.5rem'
                height='3.25rem'
              >
                <Badge borderRadius="full" px="3" colorScheme="teal">
                  New
                </Badge>
                <Box height="3.25rem" margin='0 1rem'>
                  <Divider orientation="vertical" />
                </Box>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ ease: 'easeOut', delay: indexProduct * 0.2 }}
                >
                  <Text as='span' noOfLines={2} onClick={(event) => {
                    handleProductSelected(Number(event.currentTarget.parentElement.parentElement.parentElement.getAttribute('data-key')))
                  }}
                    fontSize='0.9rem'
                    fontWeight='600'
                    lineHeight='1.25rem'

                    _hover={{
                      cursor: 'pointer'
                    }}
                  >
                    {product.name}
                  </Text>
                </motion.div>
              </Box>
              <Box as='div'
                d='flex' alignItems='center' justifyContent='space-around'
                margin='0.5rem'
              >
                <Text as='span'
                  color={colorModeObject.colorPrice}
                  fontSize='1.1rem'
                  fontWeight='600'
                >
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ ease: 'easeOut', delay: indexProduct * 0.2 }}
                  >
                    {formatPrice(product.price)}
                  </motion.div>
                </Text>
                {!productInCart(product.id) ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    whileHover={{
                      scale: 1.02,
                      transition: {
                        delay: 0
                      }
                    }}
                    whileTap={{ 
                      scale: 0.9, 
                      transition: { 
                        delay: 0.2
                      }
                    }}
                  >
                    <Button type='button' onClick={() => {
                      handleAddProduct(product.id)
                      toast({
                        position: 'top-right',
                        title: 'Produto adicionado',
                        description: 'O produto foi adicionado ao carrinho com sucesso',
                        status: 'success',
                        duration: 3000,
                        isClosable: true
                      })
                    }}
                      background='green.400'
                      color='whiteAlpha.900'
                      boxShadow='-1px 0px 3px 1px rgba(0,0,0,0.21)'
                      fontWeight='600'
                      size='md'
                      
                      _hover={{
                        filter: 'brightness(0.97)'
                      }}
                      
                    >
                      Adicionar ao carrinho
                    </Button>
                  </motion.div>
                )
                :
                (
                  <Flex as='div'
                    color='whiteAlpha.900'
                  >
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <Text as='span'
                        display='flex'
                        alignItems='center'
                        justifyContent='center'
                        height='100%'
                        width='8rem'

                        background='teal.500'
                        borderRadius='0.4rem'
                        fontSize='1rem'
                        fontWeight='600'

                        marginRight='0.5rem'
                      >
                        No carrinho
                      </Text>
                    </motion.div>
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <Button type='button' onClick={() => {
                        handleRemoveProduct(product.id)
                        toast({
                          position: 'top-right',
                          title: 'Removido do carrinho',
                          description: 'O produto foi retirado do carrinho',
                          status: 'info',
                          duration: 3000,
                          isClosable: true
                        })
                      }}
                        size='md'
                        color={colorModeObject.colorButtonRemove}
                        fontSize='0.95rem'

                        _hover={{
                          background: 'red.600',
                          color: 'whiteAlpha.900'
                        }}
                      >
                        <FontAwesomeIcon icon='times' />
                      </Button>
                    </motion.div>
                  </Flex>
                )}
              </Box>
            </Flex>
          </MotionLi>
        </>
      ))}
    </MotionUl>
  )
}