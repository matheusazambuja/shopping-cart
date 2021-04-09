import { chakra, HTMLChakraProps } from "@chakra-ui/system"
import { HTMLMotionProps, motion } from "framer-motion"

export interface ProductInStock {
  id: number
  name: string
  price: number
  imageURL: string
  quantity: number
}

export interface ProductInCart extends ProductInStock {
  inCart: boolean
}


type Merge<P, T> = Omit<P, keyof T> & T
type MotionUlProps = Merge<HTMLChakraProps<'ul'>, HTMLMotionProps<'ul'>>
type MotionLiProps = Merge<HTMLChakraProps<'li'>, HTMLMotionProps<'ul'>>

export const MotionUl: React.FC<MotionUlProps> = motion(chakra.ul)
export const MotionLi: React.FC<MotionLiProps> = motion(chakra.li)