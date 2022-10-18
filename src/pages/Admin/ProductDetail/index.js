import React from 'react'

import { useParams } from 'react-router-dom'
import { fetchProduct, updateProduct } from '../../../api';
import { useQuery } from 'react-query';
import { Field, FieldArray, Formik } from 'formik';
import { Text, Box, FormControl, FormLabel, Input, Textarea, Button } from '@chakra-ui/react';
import { message } from 'antd'
import validationScheme from './validations';

function ProductDetail() {

    const { product_id } = useParams();
    const { isLoading, isError, error, data } = useQuery(['admin: product', product_id], () => fetchProduct(product_id));

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (isError) {
        return <div>Error: {error.message}</div>
    }

    const handleSubmit = async (values, bag) => {
        message.loading({content: 'Loading...', key: 'product_update'});

        try{
            await updateProduct(values, product_id)

            message.success({
                content: 'The product successfully updated',
                key: 'product_update',
                duration: 2
            })
        }catch(e){
            message.error('The product was not updated.')
        }
    }

    return (
        <div>
            <Text fontSize='2xl'>Edit</Text>

            <Formik initialValues={{
                title: data.title,
                description: data.description,
                price: data.price,
                images: data.image,
                category: data.category
            }}
                validationScheme
                onSubmit={handleSubmit}
            >
                {
                    ({ handleSubmit, errors, touched, handleChange, handleBlur, values, isSubmitting }) =>
                        <>
                            <Box>
                                <Box my='5' textAlign='left'>
                                    <form onSubmit={handleSubmit}>
                                        <FormControl>
                                            <FormLabel>Category</FormLabel>
                                            <Input
                                                name='category'
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.category}
                                                disabled={isSubmitting}
                                                isInvalid={touched.category && errors.category}
                                            />
                                            {touched.category && errors.category && <Text color='red.500'>{errors.category}</Text>}
                                        </FormControl>

                                        <FormControl>
                                            <FormLabel>Title</FormLabel>
                                            <Input
                                                name='title'
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.title}
                                                disabled={isSubmitting}
                                                isInvalid={touched.title && errors.title} />
                                            {touched.title && errors.title && <Text color='red.500'>{errors.title}</Text>}
                                        </FormControl>

                                        <FormControl mt='4'>
                                            <FormLabel>Description</FormLabel>
                                            <Textarea
                                                name='description'
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.description}
                                                disabled={isSubmitting}
                                                isInvalid={touched.description && errors.description} />
                                            {touched.description && errors.description && <Text color='red.500'>{errors.description}</Text>}
                                        </FormControl>

                                        <FormControl mt='4'>
                                            <FormLabel>Price</FormLabel>
                                            <Input
                                                name='price'
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.price}
                                                disabled={isSubmitting}
                                                isInvalid={touched.price && errors.price} />
                                            {touched.price && errors.price && <Text color='red.500'>{errors.price}</Text>}
                                        </FormControl>

                                        <FormControl mt='4'>
                                            <FormLabel>Images</FormLabel>
                                            <FieldArray
                                                name='images'
                                                render={(arrayHelpers) => (
                                                    <div>
                                                        {values.images &&
                                                            <div>
                                                                <Input
                                                                    name={`image`}
                                                                    value={values.images}
                                                                    disabled={isSubmitting}
                                                                    onChange={handleChange}
                                                                    
                                                                // birden fazla image ve array olduğunda map fonksiyonu
                                                                // values.images.map((i, index) => (
                                                                //     <div key={index}>
                                                                //         <Input 
                                                                //             name={`image.${index}`}
                                                                //             value={i}
                                                                //             disabled={isSubmitting}
                                                                //             onChange={handleChange}
                                                                //         />
                                                                //     </div>
                                                                // ))
                                                                />

                                                                {/* <Button ml='4' type='button' colorScheme='red' onClick={() => { }}>Remove</Button> */}

                                                            </div>
                                                        }

                                                        {/* <Button mt="5" onClick={() => arrayHelpers.push("")}>
                                                            Add Photo
                                                        </Button> */}
                                                    </div>
                                                )}
                                            />
                                        </FormControl>

                                        <Button
                                            mt="4"
                                            width="full"
                                            type="submit"
                                            isLoading={isSubmitting}
                                        >
                                            Update
                                        </Button>
                                    </form>
                                </Box>
                            </Box>
                        </>
                }
            </Formik>
        </div>
    )
}

export default ProductDetail