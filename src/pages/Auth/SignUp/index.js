import React from 'react'
import { Flex, Box, Heading, FormControl, FormLabel, Input, Button, Alert } from '@chakra-ui/react'
import { useFormik } from 'formik'
import validationSchema from './validation'
import { fetchRegister, controllerUserMail } from '../../../api'

import { useAuth } from '../../../context/AuthContext'
import { useNavigate } from 'react-router-dom'


function SignUp() {

    const {login} = useAuth();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            passwordConfirm: '',
        },


        onSubmit: async (values, bag) => {


            const checkUserMail = await controllerUserMail(values.email);

            if (checkUserMail) {
                return bag.setErrors({ email: 'This email is already signed up.' });
            } else {
                const registerResponse = await fetchRegister({
                    email: values.email,
                    password: values.password,
                });
                
                login(registerResponse)
                navigate("/profile");
                //console.log("sign up:", registerResponse);
            }
        },
        validationSchema,

    });


    return (
        <div>
            <Flex align='center' justifyContent='center' width='full'>
                <Box pt={10}>
                    <Box textAlign='center'>
                        <Heading>Sign Up</Heading>
                    </Box>

                    <Box my={5}>
                        {
                            formik.errors.email && formik.touched.email && (
                                <Alert status='error'>
                                    {formik.errors.email}
                                </Alert>
                            )
                        }
                    </Box>

                    <Box my={5} textAlign='left'>

                        <form onSubmit={formik.handleSubmit}>
                            <FormControl>
                                <FormLabel>Email</FormLabel>
                                <Input name='email' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} isInvalid={formik.touched.email && formik.errors.email} />
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel>Password</FormLabel>
                                <Input name='password' type='password' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} isInvalid={formik.touched.password && formik.errors.password} />
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel>Password Confirm</FormLabel>
                                <Input name='passwordConfirm' type='password' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.passwordConfirm} isInvalid={formik.touched.passwordConfirm && formik.errors.passwordConfirm} />
                            </FormControl>

                            <Button mt={4} width="full" type='submit'>Sign Up</Button>
                        </form>

                    </Box>
                </Box>
            </Flex>
        </div>
    )
}

export default SignUp