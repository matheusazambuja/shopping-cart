import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { Input } from "@chakra-ui/input";
import { Box, Flex, Grid, Link, Text } from "@chakra-ui/layout";
import { useColorModeValue } from "@chakra-ui/react";
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

  const colorModeObject = {
    backgroundHome: useColorModeValue('gray.50', 'gray.850'),
    colorButtonCheckout: useColorModeValue('gray.800', 'gray.100'),
    colorButtonCheckoutHover: useColorModeValue('gray.100', 'gray.800'),
    backgroundProduct: useColorModeValue('gray.50', 'gray.800'),
    backgroundCheckout: useColorModeValue('gray.50', 'gray.800'),
    colorProductName: useColorModeValue('gray.800', 'gray.100'),
    colorPrice: useColorModeValue('gray.900', 'gray.100'),
    colorButtonRemove: useColorModeValue('gray.900', 'gray.100'),
  }


  return (
    <Box as='div'
      background={colorModeObject.backgroundHome}
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

          margin='1rem 0.8rem'
          background='transparent'
          color='cyan.500'
        >
          <Text as='strong' gridArea='infoColumn'
            display='flex'
            alignItems='center'
            justifyContent='flex-start'

            fontSize='1rem'
            textTransform='uppercase'
            marginLeft='11.7rem'
          >
            Produto
          </Text>
          <Text as='strong' gridArea='quantityColumn'
            display='flex'
            alignItems='center'
            justifyContent='center'

            fontSize='1rem'
            textTransform='uppercase'

            marginRight='6rem'
          >
            QTD
          </Text>
          <Text as='strong' gridArea='subtotalColumn'
            display='flex'
            alignItems='center'
            justifyContent='flex-start'

            fontSize='1rem'
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

              color={colorModeObject.colorProductName}
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

                    height='10rem'

                    background={colorModeObject.backgroundProduct}
                    color={colorModeObject.colorProductName}
                    boxShadow='-1px 0px 9px 3px rgba(0,0,0,0.08)'
                    borderRadius='10px'

                    margin='1.2rem 0'

                    variants={variantsMotionLi}
                    initial='hidden' animate='show' exit='exit'
                  >
                    <Flex as='div' gridArea='infoProduct'
                      alignItems='center'
                    >
                      <Image src={cartItem.imageURL} alt={cartItem.name}
                        width='9.5rem'

                        borderRadius='17px'
                        margin='2px'
                        padding='9px'
                      />
                      <Flex as='div'
                        direction='column'

                        marginLeft='2rem'
                      >
                        <Text as='span'
                          color={colorModeObject.colorProductName}
                          fontSize='1rem'
                          lineHeight='1.4rem'
                          marginBottom='1rem'
                        >
                          {cartItem.name}
                        </Text>
                        <Text as='strong'
                          fontSize='1.15rem'
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

              background='transparent'
            >
              <Text as='span'
                color={colorModeObject.colorProductName}
                fontSize='1.2rem'
                fontWeight='600'
                fontStyle='italic'
              >
                Vamos voltar as compras!
              </Text>
              <Button type='button'
                background='transparent'
              >
                <Link href='/' fontSize='1.7rem'>
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

            background={colorModeObject.backgroundCheckout}
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
              boxShadow='0px 0px 3px 2px rgba(0,0,0,0.28)'
              textTransform='uppercase'
              color={colorModeObject.colorButtonCheckout}

              width='14rem'

              _hover={{
                // background: 'green.400',
                color: colorModeObject.colorButtonCheckoutHover
              }}
            >
              Finalizar compra
            </Button>
            <Flex as='div'
              alignItems='baseline'
            >
              <Text as='span'
                color='gray.400'
                fontWeight='600'
                marginRight='0.7rem'
              >
                TOTAL
              </Text>
              <Text as='span'

                fontSize='1.7rem'
                fontWeight='600'
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