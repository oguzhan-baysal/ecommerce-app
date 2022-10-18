import axios from "axios"

// which product is clicked
export const fetchProductList = async ({ pageParam = 0 }) => {
    const { data } = await axios.get(`${process.env.REACT_APP_BASE_ENDPOINT}/products?pages=${pageParam}`)

    return data
}

//get products
export const fetchProduct = async (id) => {
    const { data } = await axios.get(`${process.env.REACT_APP_BASE_ENDPOINT}/products/${id}`)

    return data
}

//post product
export const postProduct = async (input) => {
    const { data } = await axios.post(`${process.env.REACT_APP_BASE_ENDPOINT}/products`, input
    );

    return data;
};


// user post
export const fetchRegister = async (input) => {
    const { data } = await axios.post(`https://62cfb4f7486b6ce8265a1992.mockapi.io/users`, input)

    return data
}

//Login
export const fetchLogin = async (input) => {
    const { data } = await axios.post(`https://62cfb4f7486b6ce8265a1992.mockapi.io/users`, input)
    return data
}


// check user if already signed up
export const getAllUsers = async () => {
    const { data } = await axios.get(`https://62cfb4f7486b6ce8265a1992.mockapi.io/users`);
    return data;
}

export const controllerUserMail = async (email) => {
    const allUser = await getAllUsers();
    return allUser.find(user => user.email === email);
};

export const controllerUserPassword = async (password) => {
    const allUser = await getAllUsers();
    return allUser.find(user => user.password === password);
}

//

// localStorage
export const fetchMe = async () => {
    const { data } = await axios.get(`https://62cfb4f7486b6ce8265a1992.mockapi.io/users`);

    return data;
};

//logout
export const fetchLogout = async () => {
    const { data } = await axios.post(`https://62cfb4f7486b6ce8265a1992.mockapi.io/users`);

    return data;
};

//order
export const postOrder = async (input) => {
    const { data } = await axios.post(`https://62cfb4f7486b6ce8265a1992.mockapi.io/order`, input);

    return data;
};

export const fetchOrder = async () => {
    const { data } = await axios.get(`https://62cfb4f7486b6ce8265a1992.mockapi.io/order`);
    return data;
};


//delete
export const deleteProduct = async (id) => {
    const { data } = await axios.delete(`${process.env.REACT_APP_BASE_ENDPOINT}/products/${id}`);

    return data;
};


//update
export const updateProduct = async (input, id) => {
    const { data } = await axios.put(`${process.env.REACT_APP_BASE_ENDPOINT}/products/${id}`, input);

    return data;
};

