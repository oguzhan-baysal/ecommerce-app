import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { fetchProduct } from '../../api'
import styles from './styles.module.css'

import { useBasket } from '../../context/BasketContext'

// import ImageGallery from 'react-image-gallery';

import { Box, Text, Button, Image } from '@chakra-ui/react'

function ProductDetail() {

    const { product_id } = useParams()
    const { addToBasket, items } = useBasket();
    const { isLoading, error, data } = useQuery(['products', product_id], () => fetchProduct(product_id))

    if (isLoading) return 'Loading...'
    if (error) return 'An error has occurred: ' + error.message

    const findBasketItem = items.find((item) => item.id === product_id);

    return (
        <div className={styles.productDetail}>
            <Box className={styles.productLeft}>
                <Text as='h3' fontSize='2xl'>{data.title}</Text>
                <p className={styles.description}>{data.description}</p>
                <Button colorScheme={findBasketItem ? "pink" : "green"} onClick={() => addToBasket(data, findBasketItem)} >
                    {
                        findBasketItem ? "Remove from the basket" : "Add to basket"
                    }
                </Button>
            </Box>

            <Box margin='10'>
                {/* <ImageGallery items={data.image} ></ImageGallery> */}
                <Image src={data.image} className={styles.img}></Image>
                <Text as='h2' fontWeight='bold' className={styles.price}>{data.price} $</Text>
            </Box>

        </div>
    )
}

export default ProductDetail