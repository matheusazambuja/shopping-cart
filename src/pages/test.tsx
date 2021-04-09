import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { Input } from "@chakra-ui/input";
import { Flex, Grid, Text } from "@chakra-ui/layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import Head from "next/head";
import { useContext } from "react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { CartContext, UpdateProductQuantity } from "../contexts/CartContext";
import { MotionLi, MotionUl } from "../types";
import { formatPrice } from "../utils/format";


export default function Cart() {

    const {
      cart,
      removeProduct,
      updateProductQuantity
    } = useContext(CartContext)
  
    const cartFormatted = cart.map(product => ({
      ...product,
      priceFormatted: formatPrice(product.price),
      subTotal: formatPrice(product.price * product.quantity),
    }))
  
    const total = formatPrice(cart.reduce((sumTotal, product) => {
      sumTotal += (product.price * product.quantity)
  
      return sumTotal
    }, 0))
  
    function handleIncrementQuantity({ productId, quantity }: UpdateProductQuantity) {
      updateProductQuantity({ productId, quantity: quantity + 1 })
    }
    
    function handleDecrementQuantity({ productId, quantity }: UpdateProductQuantity) {
      updateProductQuantity({ productId, quantity: quantity - 1 })
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
    <>
<MotionUl gridArea='cartList'
            variants={variantsMotionUl}
            initial='hidden'
            animate='show'
          >
            {cartFormatted.map((cartItem) => (
              <MotionLi key={cartItem.id}
                display='grid'
                gridTemplateColumns='1.5fr 0.6fr 0.9fr'
                gridTemplateRows='1fr'
                gridTemplateAreas="
                  'infoProduct quantityProduct subtotalProduct'
                "

                boxShadow='-1px 0px 9px 3px rgba(0,0,0,0.08)'
                borderRadius='10px'

                margin='10px 0'

                variants={variantsMotionLi}
              >
                <Flex as='div' gridArea='infoProduct'
                  alignItems='center'
                >
                  <Image src={cartItem.imageURL} alt={cartItem.name}
                    width='12rem'

                    margin='2px'
                    padding='9px'
                  />
                  <Flex as='div'
                    direction='column'

                    marginLeft='4rem'
                  >
                    <Text as='span'
                      color='gray.500'
                      fontSize='1.1rem'
                    >
                      {cartItem.name}
                    </Text>
                    <Text as='strong'
                      color='gray.500'
                      fontSize='1.25rem'
                    >
                      {cartItem.priceFormatted}
                    </Text>
                  </Flex>
                </Flex>
                <Flex as='div' gridArea='quantityProduct'
                  alignItems='center'
                  justifyContent='center'
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Button type='button' onClick={() => handleDecrementQuantity({
                        productId: cartItem.id,
                        quantity: cartItem.quantity
                      })}
                      disabled={cartItem.quantity <= 1}

                      background='transparent'
                      color='blue.600'

                      _hover={{
                        background: 'blue.600',
                        color: 'white'
                      }}
                    >
                      <FontAwesomeIcon icon='minus-circle' />
                    </Button>
                  </motion.div>
                  <Input type='text' readOnly value={cartItem.quantity}
                    width='58px'
                    margin='0 10px'

                    textAlign='center'
                  />
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Button type='button' onClick={() => handleIncrementQuantity({
                        productId: cartItem.id,
                        quantity: cartItem.quantity
                      })}
                      background='transparent'
                      color='blue.600'

                      _hover={{
                        background: 'blue.600',
                        color: 'white'
                      }}
                    >
                      <FontAwesomeIcon icon='plus-circle' />
                    </Button>
                  </motion.div>
                </Flex>
                <Flex as='div'
                  alignItems='center'
                  justifyContent='center'
                >
                  <Text as='strong'
                    color='gray.500'
                    fontSize='1.15rem'
                    marginRight='5rem'
                  >
                    {cartItem.subTotal}
                  </Text>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Button type='button' onClick={() => removeProduct(cartItem.id)}
                      marginLeft='2rem'

                      background='transparent'
                      color='blue.600'

                      _hover={{
                        background: 'blue.600',
                        color: 'white'
                      }}
                    >
                      <FontAwesomeIcon icon='trash' />
                    </Button>
                  </motion.div>
                </Flex>
              </MotionLi>
            ))}
          </MotionUl>
        </>
  )
}