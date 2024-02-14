import React, { useEffect, useState } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { IoSearch, IoArrowForward } from 'react-icons/io5';
import { ToastContainer, toast } from 'react-toastify';


function Home({ onLogout, token }) {
    const [user, setUser] = useState(null);
    const [products, setProducts] = useState([]);
    const [darkMode, setDarkMode] = useState(false);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(storedCart);

        if (token) {
            fetch('https://dummyjson.com/auth/me', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
                .then(res => res.json())
                .then(data => setUser(data))
                .catch(error => console.error('Error fetching user:', error));
        }
    }, [token]);
    // Save cart data to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    useEffect(() => {
        fetch('https://dummyjson.com/products')
            .then(res => res.json())
            .then(data => {
                setProducts(data?.products);
                setFilteredProducts(data?.products);
            })
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    const toggleDarkMode = () => {
        setDarkMode(prevMode => !prevMode);
        AOS.refresh();
    };

    useEffect(() => {
        AOS.init({
            anchorPlacement: 'top-bottom',
            offset: 200,
        });
    }, []);

    const handleSearch = async () => {
        const localFiltered = products.filter(product =>
            product.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        if (localFiltered.length > 0) {
            setFilteredProducts(localFiltered);
        } else {
            try {
                const response = await fetch(`https://dummyjson.com/products/search?q=${searchTerm}`);
                const data = await response.json();
                setFilteredProducts(data?.products);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        }
    };

    const applyPriceFilter = () => {
        const filteredByPrice = filteredProducts.filter(product =>
            (minPrice === '' || product.price >= parseFloat(minPrice)) &&
            (maxPrice === '' || product.price <= parseFloat(maxPrice))
        );

        const filteredBySearch = filteredByPrice.filter(product =>
            product.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProducts(filteredBySearch);
    };

    const addToCart = (product) => {
        const updatedCart = [...cart, { ...product }];
        setCart(updatedCart);
        toast.success("successful add !")

    };

    const removeFromCart = (productId) => {
        const updatedCart = cart.filter(item => item.id !== productId);
        setCart(updatedCart);
        toast.error("Deleted")
    };

    const calculateTotalPrice = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    return (
        <div className={darkMode ? "bg-gray-800 text-white" : ""}>
            <nav className={`bg-gray-600 fixed w-full top-0 z-50 ${darkMode ? "bg-white text-black border-b-2 border-black" : ""}`}>
                <div className=" max-w-7xl mx-auto flex justify-between items-center py-1">
                    <div className="flex gap-1  items-center">
                        <img src="../../../src/assets/Logo.png" className=" w-16 h-14 object-contain" alt="logo" />
                        <p className={`font-bold text-xl ${darkMode ? "text-black" : "text-white"}`}>Ecommerce</p>
                    </div>
                    <div className="flex justify-center items-center gap-2">
                        <input type="checkbox" className="toggle toggle-success" checked={darkMode} onChange={toggleDarkMode} />
                        <div className="flex gap-2 justify-center items-center">
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
                        </div>
                    </div>
                </div>
            </nav>
            <main>
                <div className="max-w-7xl mx-auto mt-16 pt-5">
                    <div className="lg:flex gap-10  items-center">
                        <div className="mb-4 md:ml-0 ml-4">
                            <input
                                type="text"
                                placeholder="Search products by name"
                                className=" py-2 px-2 rounded bg-gray-300 border-none focus:bg-gray-600 text-black"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <button onClick={handleSearch} className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600 transition duration-300">
                                Search
                            </button>
                        </div>
                        <div className="mb-4  lg:flex items-center justify-center gap-5">
                            <div>
                                <label htmlFor="minPrice" className="mr-2 mt-2">Min Price:</label>
                                <input
                                    type="number"
                                    id="minPrice"
                                    className=" py-1 px-2 rounded bg-gray-300 border-none focus:bg-gray-600 text-black pl-10"
                                    value={minPrice}
                                    onChange={(e) => setMinPrice(e.target.value)}
                                />
                            </div>
                            <div className=" my-3 lg:my-0">
                                <label htmlFor="maxPrice" className=" mr-2 mt-2">Max Price:</label>
                                <input
                                    type="number"
                                    id="maxPrice"
                                    value={maxPrice}
                                    className=" py-1 rounded bg-gray-300 border-none focus:bg-gray-600 text-black pl-10"
                                    onChange={(e) => setMaxPrice(e.target.value)}
                                />
                            </div>
                            <button onClick={applyPriceFilter} className="ml-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:bg-green-600 transition duration-300">
                                Apply Price Filter
                            </button>
                        </div>
                    </div>
                    <div className=" grid grid-cols-12">
                        <div className=" col-span-10">
                            <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {filteredProducts?.map((product, index) => (
                                    <div
                                        key={product.id}
                                        data-aos="fade-up"
                                        className={`mx-auto overflow-hidden rounded-lg shadow-lg ${darkMode ? 'bg-gray-800 text-white border-black border-2' : ''
                                            }`}
                                        style={{ transition: "transform 0.5s" }}
                                    >
                                        <div className="h-64">
                                            <img
                                                className="object-contain w-full h-full hover:scale-105"
                                                src={product.images[0]}
                                                alt={product.title}
                                            />
                                        </div>
                                        <div className="py-4 px-6">
                                            <h1 className="text-lg font-semibold truncate">{product.title}</h1>
                                            <p className="text-sm">{product.description}</p>
                                            <div className="flex items-center justify-between mt-4">
                                                <p className="font-bold">${product.price.toFixed(2)}</p>
                                                <div className="flex items-center">
                                                    <p>Rating: {product.rating}</p>
                                                    <div className="ml-2">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="h-5 w-5 text-yellow-500"
                                                            viewBox="0 0 20 20"
                                                            fill="currentColor"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M10 0l2.597 6.354H18.5l-5.268 4.736L15.36 20 10 15.609 4.641 19.999l2.768-4.91L1.5 6.354h5.903L10 0z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between mt-4">
                                                <p>In Stock: {product.stock}</p>
                                                <button onClick={() => addToCart(product)} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600 transition duration-300">
                                                    Add to Cart
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className=" col-span-2 bg-base-300">
                            <div className="p-4">
                                <h2 className="text-xl font-semibold mb-4">Shopping Cart</h2>
                                {cart.map((item, index) => (
                                    <div key={item.id} className="flex justify-between items-center  py-2">
                                        <div className="flex-1">
                                            <p className="text-lg font-semibold">{index + 1}. {item.title}</p>
                                            <p className="text-sm text-gray-500">Price: ${item.price.toFixed(2)}</p>
                                        </div>
                                        <div>
                                            <button className="px-2 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:bg-red-600 transition duration-300" onClick={() => removeFromCart(item.id)}>
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                <hr className="border-2 border-black my-4" />
                                <div className="flex justify-between items-center">
                                    <p className="text-lg font-semibold">Total:</p>
                                    <p className="text-lg font-semibold">${calculateTotalPrice()}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Home;
