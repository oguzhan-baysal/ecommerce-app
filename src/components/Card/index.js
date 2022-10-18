import { Box, Image, Button } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

import styles from './styles.module.css'
import { useBasket } from '../../context/BasketContext'


function Card({ item }) {

    const { items, addToBasket } = useBasket();

    const findBasketItem = items.find((basket_item) => basket_item.id === item.id);


    return (
        <Box borderWidth='1px' borderRadius='lg' overflox='hidden' p='3' className={styles.CardFlex}>

            <Box textAlign='center' my='auto' height='350px' marginBottom='30px' className={styles.CardFlex}>
                <Link to={`/product/${item.id}`}>
                    <Image src={item.image} alt="products" height='200px'/>
                </Link>

                <Box p="6">
                    <Box>
                        <Box mr='5'>{item.category.toUpperCase()}</Box>
                        <Box> <b>{item.price} $</b></Box>
                    </Box>

                    <Box mt='1' fontWeight='semibold' as='h4' lineHeight='tight'>
                        {item.title}
                    </Box>
                </Box>

            </Box>

            <Button colorScheme={findBasketItem ? "pink" : "green"} onClick={() => addToBasket(item, findBasketItem)}>
                {
                    findBasketItem ? "Remove from basket" : "Add to basket"
                }
            </Button>
        </Box>
    )
}

export default Card