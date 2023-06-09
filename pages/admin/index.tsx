import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { AccessTimeOutlined, AttachMoneyOutlined, CancelPresentationOutlined, CategoryOutlined, CreditCardOutlined, DashboardOutlined, GroupOutlined, ProductionQuantityLimitsOutlined } from '@mui/icons-material';

import { AdminLayout } from '../../components/layouts';
import { Grid, Typography } from '@mui/material';
import { SummaryTiles } from '../../components/admin/SummaryTiles';
import { DashboardSummaryResponse } from '../../interfaces';

const DashboardPage = () => {

    const {data, error} = useSWR<DashboardSummaryResponse>('/api/admin/dashboard',{
        refreshInterval: 30 * 1000 // 30 segundos
    });

    const [refreshIn, setRefreshIn] = useState(30);

    useEffect( () => {

        const interval = setInterval( () => {

            setRefreshIn( refreshIn => refreshIn > 0 ? refreshIn -  1 : 30 );

        }, 1000);

        return () => clearInterval( interval )

    }, []);

    if(!error && !data){
        return <></>
    }

    if( error ){
        console.log( error );
        return <Typography>Error al cargar la informacion</Typography>
    }

    const {
        numberOfOrders,
        paidOrders,
        numberOfClients,
        numberOfProducts,
        productsWithNoInventory,
        lowInventory,
        notPaidOrders,
    } = data!;


  return (
    <AdminLayout
        title='Dashboard'
        subTitle='Estadisticas generales'
        icon={<DashboardOutlined/>}
    >
        <Grid container spacing={1}>
            <SummaryTiles 
                title={ numberOfOrders }
                subTitle="Ordenes Totales"
                icon={ <CreditCardOutlined color="secondary" sx={ { fontSize:40 }}/> }
            />

            <SummaryTiles 
                title={ paidOrders }
                subTitle="Ordenes Pagadas"
                icon={ <AttachMoneyOutlined color="success" sx={ { fontSize:40 }}/> }
            />

            <SummaryTiles 
                title={ notPaidOrders }
                subTitle="Ordenes Pendientes"
                icon={ <AttachMoneyOutlined color="error" sx={ { fontSize:40 }}/> }
            />

            <SummaryTiles 
                title={ numberOfClients }
                subTitle="Clientes"
                icon={ <GroupOutlined color="primary" sx={ { fontSize:40 }}/> }
            />

            <SummaryTiles 
                title={ numberOfProducts }
                subTitle="Productos"
                icon={ <CategoryOutlined color="warning" sx={ { fontSize:40 }}/> }
            />

            <SummaryTiles 
                title={ productsWithNoInventory }
                subTitle="Sin Existencias"
                icon={ <CancelPresentationOutlined color="error" sx={ { fontSize:40 }}/> }
            />

            <SummaryTiles 
                title={ lowInventory }
                subTitle="Bajo Inventario"
                icon={ <ProductionQuantityLimitsOutlined color="warning" sx={ { fontSize:40 }}/> }
            />

            <SummaryTiles 
                title={ refreshIn }
                subTitle="Actualizacion en:"
                icon={ <AccessTimeOutlined color="secondary" sx={ { fontSize:40 }}/> }
            />


        </Grid>


    </AdminLayout>
  )
}

export default DashboardPage;