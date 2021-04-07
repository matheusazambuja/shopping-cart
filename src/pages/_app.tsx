import { CartProvider } from '../contexts/CartContext'
import ThemeContainer from '../contexts/theme/ThemeContainer'

export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeContainer>
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
    </ThemeContainer>
  )
}
