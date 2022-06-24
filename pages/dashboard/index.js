import Home from '../../Component/Dashboard/home/Home'
import { MongoClient } from 'mongodb'
import  Head from 'next/head'
import {Fragment} from 'react'

function Dashboard(props) {

  return  (
    <Fragment>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Browse a huge list of higly active react learning code!"/>
      </Head>
      <Home delivered = {props.delivered} />
    </Fragment>
  )
}

export async function getStaticProps() {
  const client =await MongoClient.connect(
    'mongodb+srv://shakib40:shakib40@cluster0.6zwqr.mongodb.net/thetaste?retryWrites=true&w=majority'
  ); 
  const db = client.db()
  const deliveredCollection =  db.collection('delivered')
  const  Data = await deliveredCollection.find().toArray()
//   const  Data = await deliveredCollection.find().sort({updatedAt:-1}).toArray()
  client.close()
  
  return {
     props: {
       delivered: Data.map( data =>({
          id: data._id.toString(),
          cartItems: data.cartItems,
          totalPrice: data.totalPrice,
          name: data.name,
          phone: data.phone,
          remarks: data.remarks,
          comments: data.comments,
          paymentMode: data.paymentMode,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
       }))
     },
     revalidate: 1
  };
}

export default Dashboard;