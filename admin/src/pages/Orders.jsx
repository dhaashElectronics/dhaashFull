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
                console.log("Orders data:", response.data.orders);
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
        <div className='ml-[32px]'>
            <h3>Order page</h3>
            <div>


                {orders.map((order, index) => (
                    <div className=' grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700' key={index}>
                       
                       

                        <div key={index}>
                            {order.items.map((item, i) => {
                                console.log("Item image:", item.image);
                                
                                let imageUrl = '';
                                try {
                                    if (typeof item.image === 'string') {
                                        if (item.image.startsWith('[') || item.image.startsWith('{')) {
                                            const parsedImage = JSON.parse(item.image);
                                            imageUrl = Array.isArray(parsedImage) ? parsedImage[0] : parsedImage;
                                        } else {
                                            imageUrl = item.image.split(',')[0].trim();
                                        }
                                    } else if (Array.isArray(item.image)) {
                                        imageUrl = item.image[0];
                                    } else {
                                        imageUrl = item.image;
                                    }
                                } catch (error) {
                                    console.error("Error processing image URL:", error);
                                    imageUrl = assets.placeholder_image;
                                }

                                return (
                                    <div key={i} className="flex items-center gap-2 mb-2"> 
                                        <img 
                                            className='w-16 h-16 object-cover rounded-md border border-gray-200' 
                                            src={imageUrl}
                                            alt={item.name}
                                            onError={(e) => {
                                                console.error("Image failed to load:", imageUrl);
                                                e.target.onerror = null;
                                                e.target.src = assets.placeholder_image;
                                            }}
                                        />
                                        <div>
                                            <p className='py-0.5 font-medium'>
                                                {item.name} x {item.quantity}
                                            </p>
                                            <p className='text-gray-600'>
                                                {currency} {item.price}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}


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
                            <p className='mt-2'>Date : {new Date(order.date).toLocaleDateString()} </p>
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


