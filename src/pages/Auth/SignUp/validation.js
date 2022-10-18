import * as yup from 'yup';

const validations = yup.object().shape({
    email: yup.string().email("Please enter a valid email").required("Required"),
    password: yup.string().min(5, "Min 5 character password please.").required(),
    passwordConfirm: yup.string().oneOf([yup.ref('password')], "Password does not match").required()

})

export default validations