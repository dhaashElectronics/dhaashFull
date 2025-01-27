import {NavLink} from "react-router-dom"
function Sidebar(){
    return <div className="w-[18%] min-h-screen border-r-2  ">

        <div className="flex flex-col gap-4 pt-6 pl-[20%] text-[15px] ">
            <NavLink className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-1  " to="/add">
                    <h1><i class="text-3xl fa-solid fa-circle-plus"></i></h1>
                  <p className="hidden md:block ">Add Items</p>
            </NavLink>

            <NavLink className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-1  " to="/list">
                    <h1><i class="text-3xl fa-solid fa-list"></i></h1>
                  <p className="hidden md:block ">List Items</p>
            </NavLink>


            <NavLink className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-1  " to="/orders">
                    <h1><i class="text-3xl fa-solid fa-cart-shopping"></i></h1>
                  <p className="hidden md:block ">Orders</p>
            </NavLink>
        </div>
    </div>
}
export default Sidebar