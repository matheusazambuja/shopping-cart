import { Flex, Grid } from '@chakra-ui/layout'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { ProductList } from '../components/ProductList'

import { products } from '../products.json'
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
      <Flex as='div'
        direction='column'
        alignItems='center'
        height='100vh'

        fontFamily='Roboto'
      >
        <Header />
        <ProductList productsStock={products}/>
        <Footer />
      </Flex>
    </>
  )
}


// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   const { data: productsStock } = JSON.parse('')

//   return {
//     props: {
//       productsStock
//     }
//   }
// }