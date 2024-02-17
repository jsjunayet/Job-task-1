import React, { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import Navbar from "./Navbar/Navbar";
import Product from "./Product/Product";
import Modal from "./Modal/Modal";

function Home({ onLogout, token }) {
    const [user, setUser] = useState(null);
    const [products, setProducts] = useState([]);
    const [darkMode, setDarkMode] = useState(false);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [priceFilteredProducts, setPriceFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [cart, setCart] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
    };

    const toggleDarkMode = () => {
        setDarkMode(prevMode => !prevMode);
    };

    const handleSearch = async () => {
        const localFiltered = products.filter(product =>
            product.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        if (localFiltered.length > 0) {
            setFilteredProducts(localFiltered);
            setPriceFilteredProducts(localFiltered);
        } else {
            try {
                const response = await fetch(`https://dummyjson.com/products/search?q=${searchTerm}`);
                const data = await response.json();
                setFilteredProducts(data?.products);
                setPriceFilteredProducts(data?.products);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        }
    };

    const applyPriceFilter = () => {
        const filteredByPrice = products.filter(product =>
            (minPrice === '' || product.price >= parseFloat(minPrice)) &&
            (maxPrice === '' || product.price <= parseFloat(maxPrice))
        );

        const filteredBySearch = filteredByPrice.filter(product =>
            product.title.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setFilteredProducts(filteredBySearch);
        setPriceFilteredProducts(filteredBySearch);
    };

    const addToCart = (product) => {
        const updatedCart = [...cart, { ...product }];
        setCart(updatedCart);
        toast.success("successful add !");
    };

    const removeFromCart = (productId) => {
        const updatedCart = cart.filter(item => item.id !== productId);
        setCart(updatedCart);
        toast.error("Deleted");
    };

    const calculateTotalPrice = () => {
        return cart.reduce((total, item) => total + item.price, 0).toFixed(2);
    };

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart"));
        setCart(storedCart || []);
    }, []);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    useEffect(() => {
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

    useEffect(() => {
        fetch('https://dummyjson.com/products')
            .then(res => res.json())
            .then(data => {
                setProducts(data?.products);
                setFilteredProducts(data?.products);
                setPriceFilteredProducts(data?.products);
            })
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    return (
        <div className={darkMode ? "bg-gray-800 text-white" : ""}>
            <Navbar
                darkMode={darkMode}
                toggleDarkMode={toggleDarkMode}
                user={user}
                onLogout={onLogout}
                cart={cart}
                handleOpenModal={handleOpenModal}
            />
            <main>
                <div className="max-w-7xl mx-auto mt-16 pt-5">
                    <div className="md:flex   gap-10 justify-center items-center">
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
                    <div className=" ">
                        <div className="">
                            <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {priceFilteredProducts?.map((product, index) => (
                                    <Product
                                        key={product.id}
                                        product={product}
                                        darkMode={darkMode}
                                        addToCart={addToCart}
                                    />
                                ))}
                                {priceFilteredProducts.length === 0 && (
                                    <div className="flex flex-col items-center justify-center text-center">
                                        <p className="text-xl font-semibold mb-2">No Products Found !</p>
                                        <p className="text-gray-500">Sorry, there are no products that match the current filter criteria.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            {modalOpen && <Modal cart={cart} removeFromCart={removeFromCart} calculateTotalPrice={calculateTotalPrice} handleModalClose={handleModalClose} />}
        </div>
    );
}

export default Home;
