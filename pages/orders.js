import axios from 'axios';
import { useEffect, useState } from 'react';

export default () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const getOrders = async () => {
      const {data} = await axios.get('/api/orders');

      setOrders(data.transactions);
    }

    getOrders();
  }, [orders])
  return (
    <div className="flex justify-evenly my-6">
      <div className="flex flex-col p-5 text-gray-800 bg-white shadow-lg w-full">
        <div className="">
          <table className="w-full" cellSpacing="0">
            <thead>
              <tr className="h-12 uppercase">

                <th className='text-center'>Amount</th>
                <th className='text-center'>Date</th>
                <th className='text-center'>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id}>
                  <td>
                    <p className='text-center'>
                      {order.currency.toUpperCase()} {order.amount / 100}
                    </p>
                  </td>
                  <td>
                    <p className='text-center'>
                      {order.created}
                    </p>
                  </td>
                  <td>
                  {order.status === 'succeeded' ? (
                    <p className='text-center text-green-400'>
                      Completed
                    </p>
                  ) : (
                    <p className='text-center text-red-400'>
                      Cancelled
                    </p>
                  )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}