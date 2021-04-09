import { Button, Flex, Image, Text } from '@chakra-ui/react'
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
    <MotionUl gridArea='productList'
      display='flex'
      flexWrap='wrap'
      margin='0 15px'

      variants={variantsMotionUl}
      initial='hidden'
      animate='show'
    >
      {productsStock.map((product, indexProduct) => (
        <MotionLi key={product.id}
          display='flex'
          flexDirection='column'
          justifyContent='space-between'

          width='18rem'

          background='gray.200'
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
                width='17rem'
                borderRadius='9px'
                paddingBottom='4px'
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ ease: 'easeOut', delay: indexProduct * 0.2 }}
            >
              <Text as='span'
                color='gray.500'
                fontSize='0.97rem'
                fontWeight='500'
              >
                {product.name}
              </Text>
            </motion.div>
          </Flex>
          <Flex as='div'
            direction='column'
          >
            <Text as='span'
              fontSize='1.08rem'
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
                <Button type='button' onClick={() => handleAddProduct(product.id)}
                  background='green.400'
                  boxShadow='-1px 0px 3px 1px rgba(0,0,0,0.21)'
                  fontSize='1.07rem'
                  fontWeight='500'
                  width='100%'
                  
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
                    width='13rem'

                    background='blue.600'
                    borderRadius='6px'
                    fontSize='1.07rem'
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
                  <Button type='button' onClick={() => handleRemoveProduct(product.id)}

                    _hover={{
                      background: 'red.600'
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