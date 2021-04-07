import { Box, Text } from "@chakra-ui/layout";


export function Footer() {
  return (
    <Box as='footer' gridArea='header'
    >
      <Text as='span'>
        Desenvolvido com ❤ por
      </Text>
      <Text as='strong'>
        Matheus Azambuja
      </Text>
    </Box>
  )
}