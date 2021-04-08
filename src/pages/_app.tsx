import { CartProvider } from '../contexts/CartContext'
import ThemeContainer from '../contexts/theme/ThemeContainer'

import { faTimes, faCheck, faPlusCircle, faMinusCircle, faCartPlus, faHome, faTrash, faHeart } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'

export default function MyApp({ Component, pageProps }) {
  library.add(
    faTimes, faCheck, faPlusCircle, faMinusCircle, faCartPlus, faHome, faTrash, faHeart
  )
  return (
    <ThemeContainer>
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
    </ThemeContainer>
  )
}
