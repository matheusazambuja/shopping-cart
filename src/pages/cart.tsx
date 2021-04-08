import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { Input } from "@chakra-ui/input";
import { Box, Flex, Grid, Heading, ListItem, Text, UnorderedList } from "@chakra-ui/layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Head from "next/head";
import { useContext, useEffect } from "react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { CartContext } from "../contexts/CartContext";
import { formatPrice } from "../utils/format";


export default function Cart() {

  const {
    cart
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
        <Text as='div'
          display='flex'
          alignItems='center'
          justifyContent='center'

          height='4rem'
          fontSize='1.6rem'
          fontWeight='500'
        >
          Carrinho
        </Text>
        <Grid as='div'
          templateColumns='1.5fr 0.6fr 0.9fr'
          templateRows='0.2fr 2.4fr 0.4fr'
          templateAreas="
            'infoColumn quantityColumn subtotalColumn'
            'cartList cartList cartList'
            'checkout checkout checkout'
          "

          margin='15px'
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

          <UnorderedList gridArea='cartList'>
            {cartFormatted.map((cartItem) => (
              <ListItem key={cartItem.id}
                display='grid'
                gridTemplateColumns='1.5fr 0.6fr 0.9fr'
                gridTemplateRows='1fr'
                gridTemplateAreas="
                  'infoProduct quantityProduct subtotalProduct'
                "

                boxShadow='-1px 0px 9px 3px rgba(0,0,0,0.08)'
                borderRadius='10px'

                margin='10px 0'
              >
                <Flex as='div' gridArea='infoProduct'
                  alignItems='center'
                >
                  <Image src={cartItem.imageURL} alt={cartItem.name}
                    margin='2px'
                    width='12rem'
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
                  <Button type='button'
                    background='transparent'
                    color='blue.600'

                    _hover={{
                      background: 'blue.600',
                      color: 'white'
                    }}
                  >
                    <FontAwesomeIcon icon='minus-circle' />
                  </Button>
                  <Input type='text' readOnly value={cartItem.quantity} 
                    width='58px'
                    margin='0 10px'

                    textAlign='center'
                  />
                  <Button type='button'
                    background='transparent'
                    color='blue.600'

                    _hover={{
                      background: 'blue.600',
                      color: 'white'
                    }}
                  >
                    <FontAwesomeIcon icon='plus-circle' />
                  </Button>
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
                  <Button type='button'
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
                </Flex>
              </ListItem>
            ))}
          </UnorderedList>
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