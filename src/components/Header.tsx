import { Box, Flex, Link } from "@chakra-ui/layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export function Header() {

  return (
    <Flex as='header' gridArea='headers'
      alignItems='center'
      justifyContent='space-between'

      width='100%'

      background='blue.600'
      color='white'
      padding='17px 25px 14px 25px'
    >
      <Link href='/'
        fontSize='1.4rem'
      >
        <FontAwesomeIcon icon='home'/>
      </Link>
      <Link href='/cart'
        fontSize='1.4rem'
      >
        <FontAwesomeIcon icon='cart-plus' />
      </Link>
    </Flex>
  )
}