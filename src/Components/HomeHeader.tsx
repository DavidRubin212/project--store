import React, { useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import GlobalStyles from '@mui/material/GlobalStyles';
import logo from '../assets/logo.jpg'
import CartIcon from './CartIcon';
import Stack from '@mui/material/Stack';
import BtnGrups from './BtnGrups';

const defaultTheme = createTheme();

const HomeHeader = () => {

    const [cartItems, setCartItems] = useState([]);
    let cartItemsCount
    const preventDefault = (event: React.SyntheticEvent) => event.preventDefault();

    useEffect(() => {
        cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    }, [cartItems]);
    return (
        <ThemeProvider theme={defaultTheme}>
            <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />

            <Stack>
                <Toolbar sx={{ flexWrap: 'wrap', paddingRight: "0px" }}>
                    <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1, textAlign: 'start' }}>

                        <Link sx={{ justifyContent: "flex-start" }} href="/home">
                            <img src={logo} alt="logo" style={{ maxWidth: '7em' }} />
                        </Link>

                    </Typography>
                    <CartIcon cartItemsCount={cartItemsCount} />
                    {localStorage.getItem("token") ?
                        <h3 style={{marginLeft: '1%'}}>{localStorage.getItem('user_name')}
                            <Button variant="text" sx={{ my: 1, mx: 1.5 }}
                                onClick={() => localStorage.setItem("token", "")}>
                                log out
                            </Button>
                        </h3>
                        :
                        <Box>
                            <Button
                                href="/sign in" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
                                Sign in
                            </Button>
                            <Button
                                href="/sign up" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
                                Sign up
                            </Button>
                        </Box>}


                </Toolbar>
            </Stack>
            <Box
                sx={{
                    display: 'flex',
                    width: '100%',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    alignItems: "center",
                    typography: 'body1',
                    '& > :not(style) ~ :not(style)': {
                        ml: 2,
                    },
                }}
                onClick={preventDefault}>
                <nav>
                    <Typography color="inherit" sx={{ flexGrow: 1 }}>

                        <BtnGrups/>
                    </Typography>

                </nav>
            </Box>
        </ThemeProvider>
    )
}

export default HomeHeader