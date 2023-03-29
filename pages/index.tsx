
import { Inter } from '@next/font/google'
import { ShopLayout } from '../components/layouts';
import { Typography } from '@mui/material';
//import { initialData } from '../database/products';
import { ProductList } from '../components/products';
import { useProducts } from '../hooks/useProducts';
import { FullScreenLoading } from '../components/ui';



const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const { products, isLoading } = useProducts('/products');

  return (
    /*  tags para la web ceo */
    <ShopLayout title={'Teslo-Shop - Home'} pageDescription={'Encuentra los mejores productos de Teslo aquí'}>
      <Typography variant='h1' component='h1'>Tienda</Typography>
      <Typography variant='h2' sx={{ mb:1 }}>Todos los productos</Typography>

      {
        isLoading
          ? <FullScreenLoading />
          : <ProductList products={ products }/>
      }

      <ProductList 
        products={ products }
      />

    </ShopLayout>
  )
}
