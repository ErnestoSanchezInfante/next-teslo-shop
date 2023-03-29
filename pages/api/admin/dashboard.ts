

import type { NextApiRequest, NextApiResponse } from 'next'
import { connect } from '../../../database/db';
import { db } from '../../../database';
import Order from '../../../models/Order';
import User from '../../../models/User';
import Product from '../../../models/Product';

type Data = {
    numberOfOrders: number;
    paidOrders: number; //isPaid true
    notPaidOrders: number;
    numberOfClients: number; //role: client
    numberOfProducts: number;
    productsWithNoInventory: number; // 0
    lowInventory: number; // Prodictos con 10 o menos
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    await db.connect();

    // const numberOfOrders = await Order.count();
    // const paidOrders = await  Order.find( { isPaid: true} ).count();
    // const numberOfClients = await User.find( { role: 'client'} ).count();
    // const numberOfProducts = await Product.count();
    // const productsWithNoInventory = await (Product.find({ inStock: 0 })).count();
    // const lowInventory = await  Product.find({ inStock: { $lte: 10 } }).count();

    const [
        numberOfOrders,
        paidOrders,
        numberOfClients,
        numberOfProducts,
        productsWithNoInventory,
        lowInventory,
    ] = await Promise.all([
        await Order.count(),
        await  Order.find( { isPaid: true} ).count(),
        await User.find( { role: 'client'} ).count(),
        await Product.count(),
        await (Product.find({ inStock: 0 })).count(),
        await  Product.find({ inStock: { $lte: 10 } }).count(),
    ]);

    await db.disconnect();

    res.status(200).json({  
        numberOfOrders,
        paidOrders,
        numberOfClients,
        numberOfProducts,
        productsWithNoInventory,
        lowInventory,
        notPaidOrders: numberOfOrders - paidOrders,
    })
}