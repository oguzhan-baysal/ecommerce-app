import { useState, useEffect, useContext, createContext } from "react";
import { fetchMe, fetchLogout } from "../api";
import { Flex, Spinner } from "@chakra-ui/react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loggedIn, setLoggedIn] = useState(false);

    const [loading, setLoading] = useState(true);

    const login = (data) => {
        setLoggedIn(true)
        setUser(data)

        localStorage.setItem("loginData", JSON.stringify(data));
    };

    const logout = async (callback) => {
        setLoggedIn(false);
        setUser(null);
        await fetchLogout();
        localStorage.removeItem("loginData");
        callback();
    };

    const values = {
        loggedIn,
        user,
        login,
        logout
    }

    useEffect(() => {
        (async () => {
            try {
                const loginData = JSON.parse(localStorage.getItem("loginData"));
                const me = await fetchMe();

                if (loginData !== null) {
                    const newMe = me.find((item) => item.email === loginData.email);
                    setLoggedIn(true);
                    setUser(newMe);
                    setLoading(false);
                }
                setLoading(false);
            } catch (e) {
                setLoading(false);
            }
        })();
    }, []);

    if (loading) {
        return (
            <Flex justifyContent='center' alignItems='center' height='100vh'>
                <Spinner thickness="4px" speed=".65" emptyColor="gray.200" size='xl' color='red.500'></Spinner>
            </Flex>
        )
    }


    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )


}

const useAuth = () => useContext(AuthContext)

export {
    AuthProvider,
    useAuth
}