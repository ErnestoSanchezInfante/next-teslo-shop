import { NextPage } from "next";
import { useProducts } from '../../hooks';
import { ShopLayout } from '../../components/layouts/ShopLayout';
import { Typography } from "@mui/material";
import { FullScreenLoading } from '../../components/ui/FullScreenLoading';
import { ProductList } from '../../components/products/ProductList';




const KidPage:NextPage = () => {


    const { products, isLoading } = useProducts('/products?gender=kid');
  
    return (
      /*  tags para la web ceo */
      <ShopLayout title={'Teslo-Shop - Kids'} pageDescription={'Encuentra los mejores productos de Teslo para niños'}>
        <Typography variant='h1' component='h1'>Niños</Typography>
        <Typography variant='h2' sx={{ mb:1 }}>Productos para niños</Typography>
  
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
  

  export default KidPage;