import React from 'react'
import { Flex, Box, Heading, FormControl, FormLabel, Input, Button, Alert } from '@chakra-ui/react'
import { useFormik } from 'formik'
import validationSchema from './validation'
import { fetchLogin, controllerUserMail, controllerUserPassword } from '../../../api'

import { useAuth } from '../../../context/AuthContext'
import { useNavigate } from 'react-router-dom'


function SignIn() {

  const { login } = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },


    onSubmit: async (values, bag) => {
      const checkUserMail = await controllerUserMail(values.email);
      const checkUserPassword = await controllerUserPassword(values.password);

      if (checkUserMail === undefined) {
        bag.setErrors({ email: 'Not found email' });
      } else if (checkUserPassword === undefined) {
        bag.setErrors({ password: "Email or password is wrong" });
      } else {
        const loginResponse = await fetchLogin({
          email: values.email,
          password: values.password,
        });

        login(loginResponse)
        navigate("/profile");
        //console.log("sign in:", loginResponse);
      }
    },
    validationSchema,

  });


  return (
    <div>
      <Flex align='center' justifyContent='center' width='full'>
        <Box pt={10}>
          <Box textAlign='center'>
            <Heading>Sign In</Heading>
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

          <Box my={5}>
            {
              formik.errors.password && formik.touched.password &&
              (
                <Alert status='error'>
                  {formik.errors.password}
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

              <Button mt={4} width="full" type='submit'>Sign In</Button>
            </form>

          </Box>
        </Box>
      </Flex>
    </div>
  )
}

export default SignIn