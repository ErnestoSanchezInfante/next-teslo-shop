import { NextPage } from "next";
import { useProducts } from '../../hooks';
import { ShopLayout } from '../../components/layouts/ShopLayout';
import { Typography } from "@mui/material";
import { FullScreenLoading } from '../../components/ui/FullScreenLoading';
import { ProductList } from '../../components/products/ProductList';




const MenPage:NextPage = () => {


    const { products, isLoading } = useProducts('/products?gender=men');
  
    return (
      /*  tags para la web ceo */
      <ShopLayout title={'Teslo-Shop - Women'} pageDescription={'Encuentra los mejores productos de Teslo para ellos'}>
        <Typography variant='h1' component='h1'>Hombres</Typography>
        <Typography variant='h2' sx={{ mb:1 }}>Productos para ellos</Typography>
  
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
  

  export default MenPage;