import { Box, Flex, Text } from "@chakra-ui/layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export function Footer() {
  return (
    <Flex as='footer' gridArea='footer'
      justifyContent='center'
      height='4.4rem'
      width='100%'
      padding='1.7rem 0rem 0.8rem 0rem'

      background='gray.700'
      color='whiteAlpha.900'
    >
      <Text as='span'>
        Desenvolvido com <FontAwesomeIcon icon='heart' color='#FF2513'/> por
      </Text>
      <Text as='strong'
        marginLeft='4px'
      >
        Matheus Azambuja
      </Text>
    </Flex>
  )
}