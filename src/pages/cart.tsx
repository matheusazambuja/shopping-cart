import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { Box, Flex, Grid, Heading, ListItem, Text, UnorderedList } from "@chakra-ui/layout";
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
      >
        <Header />
        <Heading>Carrinho</Heading>
        <Grid as='div'
          templateColumns='1.5fr 0.6 0.9fr'
          templateRows='0.2fr 2.4fr 0.4fr'
          templateAreas="
            'infoColumn quantityColumn subtotalColumn'
            'cartList cartList cartList'
            'checkout checkout checkout'
          "
        >
          <Text as='span' gridArea='infoColumn'>Produto</Text>
          <Text as='span' gridArea='quantityColumn'>QTD</Text>
          <Text as='span' gridArea='subtotalColumn'>SubTotal</Text>

          <UnorderedList gridArea='cartList'>
            {cartFormatted.map((cartItem) => (
              <ListItem key={cartItem.id}
                display='grid'
                gridTemplateColumns='1.6fr 0.6fr 0.8fr'
                gridTemplateRows='1fr'
                gridTemplateAreas="
                  'infoProduct quantityProduct subtotalProduct'
                "
              >
                <Flex as='div' gridArea='infoProduct'>
                  <Image src={cartItem.imageURL} alt={cartItem.name} />
                  <Flex as='div'
                    direction='column'
                  >
                    <Text as='span'>{cartItem.name}</Text>
                    <Text as='strong'>{cartItem.priceFormatted}</Text>
                  </Flex>
                </Flex>
              </ListItem>
            ))}
          </UnorderedList>
          <Flex as='footer'>
            <Button type='button'>
              Finalizar compra
            </Button>
            <Flex as='div'>
              <Text as='strong'>
                Total
              </Text>
              <Text as='span'>
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