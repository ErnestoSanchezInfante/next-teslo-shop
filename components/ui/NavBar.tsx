import NextLink from 'next/link';
import { AppBar,Box,IconButton, Input, InputAdornment, Link, Toolbar, Typography } from "@mui/material"
import Button from '@mui/material/Button';
import { ClearOutlined, SearchOffOutlined,SearchOutlined,ShoppingCartOutlined } from '@mui/icons-material';
import Badge from '@mui/material/Badge';
import { Router, useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { UiContext, CartContext } from '../../context';

export const NavBar = () => {

  const { asPath,push } = useRouter();
  const { toggleSideMenu } = useContext( UiContext );
  const { numberOfItems } = useContext( CartContext );
  
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const onSearchTerm = () =>{
      if( searchTerm.trim().length === 0 ) return;

      //navigateTo(`/search/${ searchTerm }`);
      push( `/search/${ searchTerm }` );
  }

//   const navigateTo = ( url: string ) => {
//       toggleSideMenu();
//       push( url );
//   }

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

            <Box sx={{ display: isSearchVisible ? 'none' : { xs:'none', sm:'block'} }} className="fadeIn">

                <NextLink href='/category/men' passHref legacyBehavior>
                    <Link>
                        <Button color={ asPath === '/category/men' ? 'primary' : 'info'}>Hombres</Button>
                    </Link>
                </NextLink>

                <NextLink href='/category/women' passHref legacyBehavior>
                    <Link>
                        <Button color={ asPath === '/category/women' ? 'primary' : 'info'}>Mujeres</Button>
                    </Link>
                </NextLink>

                <NextLink href='/category/kid' passHref legacyBehavior>
                    <Link>
                        <Button color={ asPath === '/category/kid' ? 'primary' : 'info'}>Niños</Button>
                    </Link>
                </NextLink>

            </Box>


            

            <Box flex={ 1 }/>

            {/*Pantallas grandes */}
            {
                isSearchVisible
                    ? (
                        <Input
                        sx={{ display: { xs:'none', sm:'flex'} }}
                        className='fadeIn'
                        autoFocus
                        value={ searchTerm }
                        onChange={ (e) => setSearchTerm( e.target.value ) }
                        onKeyUp={ (e) => e.key === 'Enter' && onSearchTerm() }
                        type='text'
                        placeholder="Buscar..."
                        endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={ () => setIsSearchVisible(false) }
                                    >
                                        <ClearOutlined />
                                    </IconButton>
                                </InputAdornment>
                            }
                            />
                    )
                    :(
                        <IconButton
                            onClick={ () => setIsSearchVisible(true)}
                            className="fadeIn"
                            sx={{ display:{ xs: 'none', sm:'flex' }}}
                        >
                            <SearchOffOutlined />
                        </IconButton>
                    )
            }



            {/*Pantallas pequeñas */}
            <IconButton
                sx={{ display:{ xs: 'flex', sm:'none' }}}
                onClick={ toggleSideMenu }
            >
                <SearchOffOutlined />
            </IconButton>

            <NextLink href='/cart' passHref legacyBehavior>
                <Link>
                    <IconButton>
                        <Badge badgeContent={ numberOfItems > 9 ? '+9' : numberOfItems } color="secondary">
                            <ShoppingCartOutlined />
                        </Badge>
                    </IconButton>
                </Link>

            </NextLink>

            <Button onClick={ toggleSideMenu }>
                Menu
            </Button>
            
        </Toolbar>
    </AppBar>
  )
}
