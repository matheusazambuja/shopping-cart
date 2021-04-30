import {
  faMoon, faSun, faTimes,
  faCheck, faPlusCircle, faMinusCircle,
  faCartPlus, faHome, faTrash,
  faHeart, 
} from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'

import { ToastContainer } from 'react-toastify'
import { Grid } from '@chakra-ui/layout'
import { CartProvider } from '../contexts/CartContext'
import ThemeContainer from '../contexts/theme/ThemeContainer'

import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

export default function MyApp({ Component, pageProps }) {
  library.add(
    faTimes, faCheck, faPlusCircle, faMinusCircle, faCartPlus, faHome,
    faTrash, faHeart, faMoon, faSun
  )
  return (
    <ThemeContainer>
      <CartProvider>
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
        <Component {...pageProps} />
        <ToastContainer autoClose={3000} />
        <Footer />
      </Grid>
      </CartProvider>
    </ThemeContainer>
  )
}
