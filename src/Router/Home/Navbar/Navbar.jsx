
import React from "react";
import logo from '../../../assets/Logo.png';

function Navbar({ darkMode, toggleDarkMode, user, onLogout, cart, handleOpenModal }) {
    return (
        <nav className={`bg-gray-600 fixed w-full top-0 z-50 ${darkMode ? "bg-white text-black border-b-2 border-black" : ""}`}>
            <div className=" max-w-7xl mx-auto flex justify-between items-center py-1">
                <div className="flex md:gap-1 gap-[1px]  items-center">
                    <img src={logo} className="w-14 md:w-16 h-14 object-contain" alt="logo" />
                    <p className={`md:font-bold text-xl font-medium ${darkMode ? "text-black" : "text-white"}`}>Ecommerce</p>
                </div>
                <div className="flex justify-center items-center gap-2">
                    <div className="flex gap-2 justify-center items-center">
                        <button className="bg-base-300 py-1 px-2 rounded-xl" onClick={handleOpenModal}>
                            Cart
                            <div className="badge badge-secondary"> {cart.length}</div>
                        </button>
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    {user && <img alt="User" src={user?.image} />}
                                </div>
                            </label>
                            <ul tabIndex={0} className="mt-3 ml-20 z-[1] p-2 text-black text-center shadow menu dropdown-content bg-base-100 rounded-box w-40">
                                {user && <p className="ml-2 mt-1 text-sm">{user?.username}</p>}
                                {user && <p className="ml-2 mt-1 text-gray-500 text-sm">{user?.email}</p>}
                                {user && <button className="ml-2 mt-3 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:bg-red-600 transition duration-300" onClick={onLogout}>Log Out</button>}
                            </ul>
                        </div>
                        <input type="checkbox" className="toggle toggle-success" checked={darkMode} onChange={toggleDarkMode} />
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
