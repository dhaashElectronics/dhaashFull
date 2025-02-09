import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"
import axios from "axios"


export const ShopContext = createContext()

const ShopContextProvider = (props) => {

    const [search, setSearch] = useState("")
    const [cartItems, setCartItems] = useState({})
    const delivery_fee = 2;
    const currency = '$';

    const [products, setProducts] = useState([])
    const navigate = useNavigate()
    const [token, setToken] = useState('')

    const backendUrl = import.meta.env.VITE_BACKEND_URL






    const addToCartIem = async (itemId) => {
        let cartData = structuredClone(cartItems);  // Nuqul cusub oo ka mid ah xogta hadda jirta

        if (cartData[itemId]) {
            cartData[itemId] += 1
        } else {
            cartData[itemId] = 1
        }

        setCartItems(cartData)  // Dib u cusboonaysii cartItems
        toast.success("Item has been added successfully")

        if (token) {

            try {
                await axios.post(backendUrl + '/api/cart/add', { itemId }, { headers: { token } })
            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        }
    }





    const getCartCount = () => {
        let totalCount = 0;

        // Isku xisaabi tirada shey kasta oo ku jira gaadhiga
        for (const itemId in cartItems) {
            totalCount += cartItems[itemId];  // Ku dar tirada sheyga itemId-gaas
        }

        return totalCount;  // Soo celi tirada guud ee sheyga
    };


    const updateQuantity = async (itemId, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId] = quantity;
        setCartItems(cartData);
    
        if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/update', { itemId, quantity }, { headers: { token } });
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }
    }


   
    

    const getCartAmount = () => {
        let totalAmount = 0;

        // Loop garee `cartItems` si aad u hesho shey kasta oo ku jira gaadhiga
        for (const itemId in cartItems) {
            const itemInfo = products.find((product) => product._id === itemId); // Hel xogta sheyga la dhigaya `itemId`

            if (itemInfo) {
                totalAmount += itemInfo.price * cartItems[itemId]; // Kordhi wadarta qiimaha iyadoo la adeegsanayo tirada
            }
        }

        return totalAmount;
    };


    
    const getProductsData = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/product/list')
            
            if (response.data.success) {
                setProducts(response.data.products)
            } else {
                toast.error(response.error.message)
            }


        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }


    const getUserCart = async (token) => {
        try {
            const response = await axios.post(backendUrl + '/api/cart/get',{},{headers:{token}})
            if (response.data.success) {
                setCartItems(response.data.cartData)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

   
    useEffect(()=>{
        getProductsData()
    },[])

    useEffect(() => {
        if (!token && localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'))
            getUserCart(localStorage.getItem('token'))
        }
        if (token) {
            getUserCart(token)
        }
    }, [token])



    const value = {
        products,
        search,
        setSearch,
        setCartItems,
        currency,
        cartItems,
        addToCartIem,
        getCartCount,
        updateQuantity,
        getCartAmount,
        delivery_fee, navigate, backendUrl,
        setToken, token
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}
export default ShopContextProvider