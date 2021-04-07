import { Box, Flex, Link } from "@chakra-ui/layout";


export function Header() {

  return (
    <Flex as='header' gridArea='headers'
      alignItems='center'
      justifyContent='space-between'

      margin='15px 15px 10px 15px'
    >
      <Link href='/'>
        Home
      </Link>
      <Link href='/cart'>
        Carrinho
      </Link>
    </Flex>
  )
}