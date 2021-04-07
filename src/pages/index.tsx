import { Flex, Grid } from '@chakra-ui/layout'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { ProductList } from '../components/ProductList'

import { api } from '../services/api'
import { Product } from '../types'

interface HomeProps {
  productsStock: Product[]
}

export default function Home(props: HomeProps) {
  return (
    <>
      <Head>
        <title>Home - ShoppingCart</title>
      </Head>
      <Flex as='div'
        direction='column'
        alignItems='center'
        height='100vh'
      >
        <Header />
        <ProductList productsStock={props.productsStock}/>
        <Footer />
      </Flex>
    </>
  )
}


export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { data: productsStock } = await api.get(`products`)

  return {
    props: {
      productsStock
    }
  }
}