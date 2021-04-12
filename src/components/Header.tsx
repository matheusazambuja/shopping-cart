import { Box, Flex, Link } from "@chakra-ui/layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";


export function Header() {

  return (
    <Flex as='header' gridArea='header'
      alignItems='center'
      justifyContent='space-between'

      width='100%'
      height='4rem'

      background='gray.500'
      color='white'
      padding='17px 25px 14px 25px'
    >
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Link href='/'
          fontSize='1.4rem'

          _hover={{
            color: 'cyan.500'
          }}
        >
          <FontAwesomeIcon icon='home'/>
        </Link>
      </motion.div>
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Link href='/cart'
          fontSize='1.4rem'

          _hover={{
            color: 'cyan.500'
          }}
        >
          <FontAwesomeIcon icon='cart-plus' />
        </Link>
      </motion.div>
    </Flex>
  )
}