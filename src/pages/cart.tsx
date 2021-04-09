import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { Input } from "@chakra-ui/input";
import { Flex, Grid, Text } from "@chakra-ui/layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "framer-motion";
import Head from "next/head";
import { useContext, useState } from "react";
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
        staggerChildren: 0.2
      }
    }
  }

  const variantsMotionLi = {
    hidden: { opacity: 0, scale: 0 },
    show: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0 }
  }


  return (
    <>
      <Head>
        <title>Carrinho - ShoppingCart</title>
      </Head>
      <Flex as='div'
        direction='column'

        height='100vh'

        fontFamily='Roboto'
      >
        <Header />
        <Grid as='div'
          templateColumns='1.5fr 0.6fr 0.9fr'
          templateRows='0.2fr 2.4fr 0.4fr'
          templateAreas="
            'infoColumn quantityColumn subtotalColumn'
            'cartList cartList cartList'
            'checkout checkout checkout'
          "

          margin='17px 10px'
        >
          <Text as='strong' gridArea='infoColumn'
            display='flex'
            alignItems='center'
            justifyContent='center'

            color='gray.400'
            fontSize='1.1rem'
            textTransform='uppercase'
            marginRight='1.7rem'
          >
            Produto
          </Text>
          <Text as='strong' gridArea='quantityColumn'
            display='flex'
            alignItems='center'
            justifyContent='center'

            color='gray.400'
            fontSize='1.1rem'
            textTransform='uppercase'

            marginRight='6rem'
          >
            QTD
          </Text>
          <Text as='strong' gridArea='subtotalColumn'
            display='flex'
            alignItems='center'
            justifyContent='flex-start'

            color='gray.400'
            fontSize='1.1rem'
            textTransform='uppercase'

            paddingLeft='5rem'
          >
            SubTotal
          </Text>

          <MotionUl gridArea='cartList'
            variants={variantsMotionUl}
            initial='hidden'
            animate='show'
          >
            {cartFormatted.map((cartItem) => (
              <AnimatePresence>
                <MotionLi key={cartItem.id}
                  display='grid'
                  gridTemplateColumns='1.5fr 0.6fr 0.9fr'
                  gridTemplateRows='1fr'
                  gridTemplateAreas="
                    'infoProduct quantityProduct subtotalProduct'
                  "

                  boxShadow='-1px 0px 9px 3px rgba(0,0,0,0.08)'
                  borderRadius='10px'

                  margin='20px 0'

                  variants={variantsMotionLi}
                  initial='hidden'
                  animate='show'
                  exit='exit'
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
              </AnimatePresence>
            ))}
          </MotionUl>
          <Flex as='footer' gridArea='checkout'
            alignItems='center'
            justifyContent='space-between'

            margin='30px 25px 20px 15px'
          >
            <Button type='button'
              background='green.400'
              boxShadow='0px 0px 3px 2px rgba(0,0,0,0.38)'
              textTransform='uppercase'

              width='14rem'

              _hover={{
                background: 'blue.600',
                color: 'white'
              }}
            >
              Finalizar compra
            </Button>
            <Flex as='div'
              alignItems='baseline'
            >
              <Text as='span'
                color='gray.400'
                fontWeight='500'
                marginRight='3px'
              >
                TOTAL
              </Text>
              <Text as='span'

                fontSize='1.7rem'
                fontWeight='700'
              >
                {total}
              </Text>
            </Flex>
          </Flex>
        </Grid>
        <Footer />
      </Flex>
    </>
  )
}