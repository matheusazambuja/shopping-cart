import Link from 'next/link';

import { Box, Flex } from "@chakra-ui/layout";
import { Button, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export function Header() {

  const { colorMode, toggleColorMode } = useColorMode();

  const colorModeObject = {
    iconButtonToggle: useColorModeValue(
      <FontAwesomeIcon icon='moon' />,
      <FontAwesomeIcon icon='sun' color='white' />
    ),
    backgroundButtonToggle: useColorModeValue('gray.50', 'transparent'),
    backgroundHeader: useColorModeValue('white', 'gray.800'),
    colorHeader: useColorModeValue('', 'gray.100')
  }

  return (
    <Flex as='header' gridArea='header'
      justifyContent='space-between'
      alignItems='center'

      width='100%'
      height='4rem'

      background={colorModeObject.backgroundHeader}
      color={colorModeObject.colorHeader}
      padding='2.5rem 4rem'
    >
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Link href='/'>
          <Button
            background='transparent'
            color={colorModeObject.colorHeader}
            fontSize='1.4rem'

            _hover={{
              color: 'cyan.500'
            }}
          >
            <FontAwesomeIcon icon='home'/>
          </Button>
        </Link>
      </motion.div>
      <Box as='div' display='flex' alignItems='center'
      
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
        >
          <Button onClick={toggleColorMode}
            background={colorModeObject.backgroundButtonToggle}
            fontSize='1.4rem'
            marginRight='1.5rem'

            transition="all 200ms"
            _hover={{
              filter: "brightness(0.8)",
              cursor: "pointer"
            }}
          >
            {colorModeObject.iconButtonToggle}
          </Button>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Link href='/cart'>
            <Button
              background='transparent'
              color={colorModeObject.colorHeader}
              fontSize='1.4rem'

              _hover={{
                color: 'cyan.500'
              }}
            >
              <FontAwesomeIcon icon='cart-plus' />
            </Button>
          </Link>
        </motion.div>
      </Box>
    </Flex>
  )
}