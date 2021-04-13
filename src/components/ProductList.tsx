import { Button, Flex, Image, Text, useToast } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';

import { MotionLi, MotionUl, ProductInStock } from "../types";
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

  return (
    <MotionUl gridArea='content'
      display='flex'
      justifyContent='space-between'
      flexWrap='wrap'
      padding='0 15px'

      background='gray.700'
      color='whiteAlpha.800'

      variants={variantsMotionUl}
      initial='hidden'
      animate='show'
    >
      {productsStock.map((product, indexProduct) => (
        <MotionLi key={product.id}
          display='flex'
          flexDirection='column'
          alignItems='center'
          justifyContent='space-between'

          width='11rem'
          height='22rem'

          background='gray.500'
          borderRadius='9px'
          boxShadow='-1px 0px 9px 3px rgba(0,0,0,0.08)'
          margin='15px'
          padding='12px'

          variants={variantsMotionLi}
        >
          <Flex as='div'
            direction='column'
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: indexProduct * 0.2 }}
            >
              <Image src={product.imageURL} alt={product.name} 
                width='12rem'
                borderRadius='9px'
                paddingBottom='4px'
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ ease: 'easeOut', delay: indexProduct * 0.2 }}
            >
              <Text as='span' noOfLines={3}
                fontSize='0.86rem'
                fontWeight='500'

                paddingTop='8px'
              >
                {product.name}
              </Text>
            </motion.div>
          </Flex>
          <Flex as='div'
            direction='column'
          >
            <Text as='span'
              color='whiteAlpha.900'
              fontSize='1.05rem'
              fontWeight='700'
              marginBottom='7px'
              marginTop='9px'
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
                  fontSize='0.87rem'
                  fontWeight='500'
                  width='100%'
                  size='sm'
                  
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
                    width='7rem'

                    background='cyan.500'
                    borderRadius='6px'
                    fontSize='0.94rem'
                    fontWeight='500'

                    marginRight='7px'
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
                    size='sm'
                    color='black'
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
          </Flex>
        </MotionLi>
      ))}
    </MotionUl>
  )
}