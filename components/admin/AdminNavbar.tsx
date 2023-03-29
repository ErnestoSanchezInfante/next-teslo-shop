
import NextLink from 'next/link';
import { AppBar,Box, Link, Toolbar, Typography } from "@mui/material"
import Button from '@mui/material/Button';
import { useContext } from 'react';
import { UiContext } from '../../context';

export const AdminNavbar = () => {

  const { toggleSideMenu } = useContext( UiContext );
  
  return (
    <AppBar>
        <Toolbar>
            <NextLink href='/' passHref legacyBehavior>
                <Link display='flex' alignItems='center'>
                    <Typography variant='h6'>Teslo</Typography>
                    <Typography sx={{ ml: 0.5}}>Shop</Typography>
                </Link>
            </NextLink>

            <Box flex={ 1 }/>

            <Button onClick={ toggleSideMenu }>
                Menu
            </Button>
            
        </Toolbar>
    </AppBar>
  )
}
