import axios from 'axios';
import NextImage from 'next/image';
import { loadStripe } from '@stripe/stripe-js';

import { useCartState } from "../context/cart"
import { supabase } from '../utils/supabase';

export default () => {
  const {cart, total, removeComic} = useCartState();
  
  const checkout = async () => {
    const {data} = await axios.post('/api/checkout', {
      cart
    });
    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

    await stripe.redirectToCheckout({
      sessionId: data.id,
    })
  }
  return cart.length > 0 ? (
    <div className="flex justify-evenly my-6">
      <div className="flex flex-col p-5 text-gray-800 bg-white shadow-lg w-8/12">
        <div className="">
          <table className="w-full" cellSpacing="0">
            <thead>
              <tr className="h-12 uppercase">
                <th></th>
                <th className="text-left">Comic</th>
                <th className="text-center">
                  Quantity
                </th>
                <th className="text-center">Unit Price</th>
                <th className="text-center">Total Price</th>
              </tr>
            </thead>
            <tbody>
            {cart.map(comic => (
              <tr key={comic.id}>
                <td>
                  <NextImage src={comic.imageUrl} alt={comic.title} width={150} height={200} loading="eager" priority />
                </td>
                <td>
                  <p>
                    {comic.title}
                  </p>
                  <button
                    onClick={() => removeComic(comic)}
                  >
                    Remove Comic
                  </button>
                </td>
                <td className="flex justify-center items-center mt-20">
                  <p className="w-full mt-2 font-semibold text-center text-gray-700 hover:text-black">
                    {comic.quantity}
                  </p>
                </td>
                <td className="justify-center items-center mt-20">
                  <p className="w-full font-semibold text-center text-gray-700 hover:text-black">
                    ${comic.price}
                  </p>
                </td>
                <td className="justify-center items-center mt-20">
                  <p className="w-full font-semibold text-center text-gray-700 hover:text-black">
                    ${comic.price * comic.quantity}
                  </p>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex flex-col p-5 text-gray-800 bg-white shadow-lg w-4/12">
        <div className="p-4">
          <h1 className="ml-2 font-bold uppercase text-center">Order Details</h1>
        </div>
        <div className="p-4">
          <div className="flex justify-between border-b">
            <div className="lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-center text-gray-800">
              Total
            </div>
            <div className="lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-center text-gray-800">
              ${total}
            </div>
          </div>
          <button 
            className="flex justify-center items-center w-full px-10 py-3 mt-6 font-medium text-white uppercase bg-gray-800 rounded-full shadow item-center hover:bg-gray-700 focus-shadow-outline focus:outline-none"
            onClick={checkout}
          >
            Proceed To Checkout
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div className='flex justify-center items-center h-full'>
      <div className='p-5 items-center flex justify-center flex-col bg-white shadow-2xl text-center h-4/5 w-4/5'>
        <p className='text-xl'>
          Your Cart is Empty
        </p>
        <p>
          Browse Comics and come back again
        </p>
      </div>
    </div>
  )
}

export const getServerSideProps = async ({req}) => {
  const {user} = await supabase.auth.api.getUserByCookie(req);
  
  if (!user) {
    return {
      redirect: {
        permanent: false,
        destination: '/login'
      },
      props: {}
    }
  }

  return {
    props: {}
  }
}