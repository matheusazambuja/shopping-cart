import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { Input } from "@chakra-ui/input";
import { Box, Flex, Grid, Link, Text } from "@chakra-ui/layout";
import { toast, useToast } from "@chakra-ui/toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "framer-motion";
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

  const toast = useToast()

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
    <Box as='div'
      
      background='gray.700'
    >
      <Head>
        <title>Carrinho - ShoppingCart</title>
      </Head>
      <Grid as='div'
        templateColumns='1fr'
        templateRows='0.2fr 2.5fr 0.3fr'
        templateAreas="
          'header'
          'content'
          'footer'
        "

        height='100vh'

        fontFamily='Roboto'
      >
        <Header />
        <Grid as='div' gridArea='content'
          templateColumns='1.5fr 0.6fr 0.9fr'
          templateRows='2rem 2.55fr 6rem'
          templateAreas="
            'infoColumn quantityColumn subtotalColumn'
            'cartList cartList cartList'
            'checkout checkout checkout'
          "

          margin='17px 10px'
          background='gray.700'
          color='cyan.500'
        >
          <Text as='strong' gridArea='infoColumn'
            display='flex'
            alignItems='center'
            justifyContent='center'

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

            fontSize='1.1rem'
            textTransform='uppercase'

            paddingLeft='5rem'
          >
            SubTotal
          </Text>

          {cartFormatted.length !== 0 ? (
            <MotionUl gridArea='cartList'
              variants={variantsMotionUl}
              initial='hidden'
              animate='show'

              color='whiteAlpha.900'
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

                    background='gray.500'
                    color='whiteAlpha.900'
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

                        borderRadius='17px'
                        margin='2px'
                        padding='9px'
                      />
                      <Flex as='div'
                        direction='column'

                        marginLeft='4rem'
                      >
                        <Text as='span'
                          fontSize='1.1rem'
                        >
                          {cartItem.name}
                        </Text>
                        <Text as='strong'
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
                          color='cyan.500'

                          _hover={{
                            background: 'cyan.500',
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
                          color='cyan.500'

                          _hover={{
                            background: 'cyan.500',
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
                        <Button type='button' onClick={() => {
                          removeProduct(cartItem.id)
                          toast({
                            position: 'top-right',
                            title: 'Produto removido',
                            description: 'O produto foi retirado do carrinho',
                            status: 'info',
                            duration: 3000,
                            isClosable: true
                          })
                        }}
                          marginLeft='2rem'

                          background='transparent'
                          color='cyan.500'

                          _hover={{
                            background: 'cyan.500',
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
          )
          :
          (
            <Flex as='div' gridArea='cartList'
              direction='column'
              alignItems='center'
              justifyContent='center'

              marginTop='20px'
              marginBottom='16px'

              background='gray.500'
            >
              <Text as='span'
                color='white'
                fontSize='1.2rem'
                fontWeight='500'
                fontStyle='italic'
              >
                Carrinho vazio
              </Text>
              <Button type='button'
                background='cyan.500'
                color='white'
              >
                <Link href='/'
                  fontSize='1.4rem'

                  _hover={{
                    color: 'cyan.500'
                  }}
                >
                  <FontAwesomeIcon icon='home'/>
                </Link>
              </Button>
            </Flex>
          )
        }
          
          <Flex as='footer' gridArea='checkout'
            alignItems='center'
            justifyContent='space-between'

            padding='30px 25px 20px 15px'

            background='gray.500'
            color='whiteAlpha.900'
          >
            <Button type='button' onClick={() => {
              toast({
                position: 'top-right',
                title: 'Compra finalizada',
                description: 'A compra foi finalizada com sucesso',
                status: 'success',
                duration: 3000,
                isClosable: true
              })
            }}
              background='green.400'
              boxShadow='0px 0px 3px 2px rgba(0,0,0,0.38)'
              textTransform='uppercase'

              width='14rem'

              color='whiteAlpha.900'

              _hover={{
                background: 'cyan.500',
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

      </Grid>
    </Box>
  )
}