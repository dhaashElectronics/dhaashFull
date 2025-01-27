import CartTotal from "./CartTotal";
import { ShopContext } from '../context/ShopContext'
import React, { useContext,useState } from 'react'

import axios from 'axios'
import { toast } from 'react-toastify'


const PlaceOrder = () => {


    const [method, setMethod] = useState('cod');
    const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        phone: ''
    })

    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        setFormData(data => ({ ...data, [name]: value }))
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault()
       
        try {
            
            let orderItems = []; // Liiska dalabka

            for (const itemId in cartItems) {
                if (cartItems[itemId] > 0) {
                    // Raadi xogta sheyga iyadoo la isticmaalayo itemId
                    const itemInfo = structuredClone(products.find(product => product._id === itemId));
                    if (itemInfo) {
                        itemInfo.quantity = cartItems[itemId]; // Ku dar tirada sheyga ee gaadhiga
                        orderItems.push(itemInfo); // Ku dar xogta sheyga liiska dalabka
                    }
                }
            }

            let orderData = {
                address: formData,
                items: orderItems,
                amount: getCartAmount() + delivery_fee
            }
            
            

            switch (method) {

                // API Calls for COD
                case 'cod':
                    const response = await axios.post(backendUrl + '/api/order/place',orderData,{headers:{token}})
               
                    
                    if (response.data.success) {
                        setCartItems({})
                        navigate('/orders')
                        toast.success("go to orders")
                    } else {
                        toast.error(response.data.message)
                    }
                    break;

                default:
                    break;
            }


        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    


    return (
        <form onSubmit={onSubmitHandler} className="flex flex-col sm:flex-row justify-between gap-4  pt-5 sm:pt-14 min-h-[80hv] boredr-t ">
            <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
                <div className="text-xl sm:text-2xl my-3 ">
                    <h1 className="text-gray-400 text-xl">DELIVERY <span className="text-black">INFORMATION</span></h1>

                </div>
                <div className="flex gap-3 ">
                    <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} className="border border-gray-300  rounded py-1.5 px-3.5 w-full " type="text" placeholder="Frirst name" />
                    <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} className="border border-gray-300  rounded py-1.5 px-3.5 w-full " type="text" placeholder="Last name" />

                </div>
                <input required onChange={onChangeHandler} name='email' value={formData.email} className="border border-gray-300  rounded py-1.5 px-3.5 w-full " type="Email" placeholder="Email address" />
                <input required onChange={onChangeHandler} name='street' value={formData.street} className="border border-gray-300  rounded py-1.5 px-3.5 w-full " type="text" placeholder="Street" />


                <div className="flex gap-3 ">
                    <input required onChange={onChangeHandler} name='city' value={formData.city} className="border border-gray-300  rounded py-1.5 px-3.5 w-full " type="text" placeholder="City" />
                    <input  onChange={onChangeHandler} name='state' value={formData.state} className="border border-gray-300  rounded py-1.5 px-3.5 w-full " type="text" placeholder="State" />

                </div>
               
                <input required onChange={onChangeHandler} name='phone' value={formData.phone} className="border border-gray-300  rounded py-1.5 px-3.5 w-full " type="number" placeholder="Phone" />

            </div>

            {/* --------------rght side---------------- */}
            <div className="mt-8 ">
                <div className="mt-8 min-w-80">
                    <CartTotal />

                </div>
                <div className="mt-12 ">
                    <h1>PYMENT <span>METHOD</span></h1>

                    {/* ----------payment method ---------------- */}
                    <div className="flex gap-3 flex-col lg:flex-row ">
                        <div className="flex items-center gap-3  border p-2  px-3 cursor-pointer">
                            <p className={`min-w-3.5 h-3.5 border rounded-full `}></p>
                            <img src="" alt="" />

                        </div>

                    </div>
                    <div className="w-full text-end mt-6">

                       <button type='submit' className="bg-black text-white px-16 py-3 text-sm ">PLACE ORDER</button> 
                    </div>
                </div>

            </div>
        </form>
    )
}
export default PlaceOrder