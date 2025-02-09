import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'
function Orders({ token }) {

    const [orders, setOrders] = useState([])

    const fetchAllOrders = async () => {

        if (!token) {
            return null;
        }

        try {

            const response = await axios.post(backendUrl + '/api/order/list', {}, { headers: { token } })
            if (response.data.success) {
                setOrders(response.data.orders.reverse())
            } else {
                toast.error(response.data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }


    }



    const statusHandler = async ( event, orderId ) => {
        try {
          const response = await axios.post(backendUrl + '/api/order/status' , {orderId, status:event.target.value}, { headers: {token}})
          if (response.data.success) {
            await fetchAllOrders()
          }
        } catch (error) {
          console.log(error)
          toast.error(response.data.message)
        }
      }
    


    useEffect(() => {
        fetchAllOrders();
    }, [token])




    return (
        <div>
            <h3>Order page</h3>
            <div>


                {orders.map((order, index) => (
                    <div className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                       
                       


                        <div key={index}>
                            {order.items.map((item, i) => (
                                <p className='py-0.5 ' key={i}>
                                    {item.name} x {item.quantity}
                                </p>
                            ))}


                            <p className='mt-3 mb-2 font-medium '>
                                {order.address.firstName + " " + order.address.lastName}
                            </p>
                            <div>
                                <p>{order.address.street + ","}</p>
                                <p>{order.address.city + "," + order.address.state}</p>
                            </div>
                            <p>{order.address.phone} </p>
                        </div>

                        <div>
                            <p className='text-sm mb-3 sm:text-[15px]  '>Items : {order.items.length} </p>
                            <p className='mb-3'>Method : {order.paymentMethod}  </p>
                            <p>Payment : {order.payment ? 'Done' : 'Pending'} </p>
                            <p>Date : {new Date(order.date).toLocaleDateString()} </p>
                        </div>
                        <p className='text-sm sm:text-[15px]'> {currency} {order.amount} </p>
                        <select onChange={(event) => statusHandler(event, order._id)} value={order.status} className='p-2 font-semibold'>
                            <option value="Order Placed">Order Placed</option>
                            <option value="Packing">Packing</option>
                            <option value="Out for delivery">Out for delivery</option>
                            <option value="Delivered">Delivered</option>
                        </select>
                    </div>
                ))}


            </div>
        </div>
    );

}
export default Orders


