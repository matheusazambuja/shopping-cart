import { GetStaticProps } from 'next'
import Head from 'next/head'

import { api } from '../services/api'
import { ProductList } from '../components/ProductList'
import { ProductInStock } from '../types'

interface HomeProps {
  productsStock: ProductInStock[]
}

export default function Home({ productsStock }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home - ShoppingCart</title>
      </Head>
      <ProductList productsStock={productsStock}/>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get('products')

  return {
    props: {
      productsStock: data
    },
    revalidate: 60 * 60 * 8 // 8 hours
  }
}