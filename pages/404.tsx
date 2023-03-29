import { ShopLayout } from '@/components/layouts';
import { Box, Typography } from '@mui/material';

const Custom404 = () => {
  return (
    <ShopLayout title='Page not found' pageDescription='No hay nada que mostrar aqui'>
        <Box 
            display='flex' 
            justifyContent='center' 
            alignItems='center' 
            height='calc(100cv - 200px)'
            sx={{ flexDirection: { xs:'column', sm: 'row'} }}
        >
            <Typography variant='h1' component='h1' fontSize={80} fontWeight={200}>400 |</Typography>
            <Typography marginLeft={2}>No encontramoos ninguna pagina aqui</Typography>

        </Box>
    </ShopLayout>
  )
}

export default Custom404