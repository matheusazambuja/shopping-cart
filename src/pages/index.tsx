import { Flex, Grid } from '@chakra-ui/layout'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { ProductList } from '../components/ProductList'

import { products } from '../../db.json'
import { ProductInStock } from '../types'

interface HomeProps {
  productsStock: ProductInStock[]
}

export default function Home(props: HomeProps) {
  return (
    <>
      <Head>
        <title>Home - ShoppingCart</title>
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
        <ProductList productsStock={products}/>
        <Footer />
      </Grid>
    </>
  )
}
