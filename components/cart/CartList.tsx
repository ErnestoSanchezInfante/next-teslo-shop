import NextLink from 'next/link';

import { Grid, Typography,Link, CardActionArea, CardMedia, Box, Button } from "@mui/material"
import { ItemCounter } from '../ui';
import { FC, useContext } from 'react';
import { CartContext } from '../../context/cart/CartContext';
import { ICartProduct, IOrderItem } from '../../interfaces';


interface Props {
  editable?: boolean;
  products?: IOrderItem[];
}

export const CartList: FC<Props> = ({ editable = false, products }) => {

  const { cart, updateCartQuantity, removeCartProduct } = useContext(CartContext);

  const onNewCartQuantityValue = (product : ICartProduct, newQuantityValue: number) => {
      product.quantity = newQuantityValue;
      updateCartQuantity( product );
  }

  const productToShow = products? products : cart;

  return (
    <>
        {
            productToShow.map( product => (
                <Grid container spacing={ 2 } key={product.slug + product.size} sx={{ mb:1  }} >
                  <Grid item xs={ 3 }>
                    {/*Llevar al la pagina del producto */}
                    <NextLink href={`/product/${ product.slug }`} passHref legacyBehavior>
                      <Link>
                        <CardActionArea>
                          <CardMedia 
                            image={ product.image }
                            component='img'
                            sx={{ borderRadius:'5px' }}
                          />
                        </CardActionArea>
                      </Link>
                    </NextLink>
                  </Grid>
                  <Grid item xs={ 7 }>
                    <Box display='flex' flexDirection='column'>
                      <Typography variant='body1'>{product.title}</Typography>
                      <Typography variant='body1'>Talla: <strong>{ product.size }</strong></Typography>

                      {
                        editable
                          ? (
                            <ItemCounter 
                              currentValue={ product.quantity } 
                              maxValue={ 10 } 
                              updateQuantity={ (value) => onNewCartQuantityValue(product as ICartProduct, value) }                              
                            />
                          )
                          : (
                            <Typography variant='h5'>{ product.quantity } { product.quantity > 1 ? 'productos' : 'producto' }</Typography>
                          )
                      }
                      

                    </Box>
                  </Grid>
                  <Grid item xs={ 2 } display='flex' alignItems='center' flexDirection='column'>
                    <Typography variant='subtitle1'>{ `$${ product.price }` }</Typography>
                    
                    {
                      editable && (
                        <Button 
                          variant='text' 
                          color='secondary'
                          onClick={ () => removeCartProduct( product as ICartProduct) }
                        >
                          Remover
                        </Button>
                      )
                    }

                  </Grid>

                </Grid>
            ))
        }
    </>
  )
}
