import React from 'react'
import { Button } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

import { useAuth } from '../../context/AuthContext'
import { useBasket } from '../../context/BasketContext'

import styles from './styles.module.css'

function Navbar() {

    const { loggedIn, user } = useAuth();
    const { items } = useBasket();

    //console.log(items)


    return (
        <nav className={styles.nav}>
            <div className={styles.left}>
                <div className={styles.logo}>
                    <Link to='/'>eCommerce</Link>
                </div>

                <ul className={styles.menu}>
                    <li>
                        <Link to='/'>Products</Link>
                    </li>
                </ul>
            </div>
            <div className={styles.right}>
                {
                    !loggedIn && (
                        <>
                            <Link to='/signin'>
                                <Button colorScheme='pink'>Login</Button>
                            </Link>
                            <Link to='/signup'>
                                <Button colorScheme='pink'>Register</Button>
                            </Link>

                        </>
                    )
                }

                {
                    loggedIn && (
                        <>
                            {
                                items.length > 0 && (
                                    <Link to='/basket'>
                                        <Button colorScheme='pink' variant='outline'>
                                            Basket ({items.length})
                                        </Button>
                                    </Link>
                                )
                            }
                        </>
                    )
                }

                { user?.email === "admin@admin.com" && (
                    <Link to='/admin'>
                        <Button variant='ghost' colorScheme='pink' >
                            Admin
                        </Button>
                    </Link>
                )}

                {
                    loggedIn && (
                        <>
                            <Link to='/profile'>
                                <Button>Profile</Button>
                            </Link>
                        </>
                    )
                }

            </div>


        </nav>
    )
}

export default Navbar