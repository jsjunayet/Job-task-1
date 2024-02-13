import { useEffect, useState } from "react";

function Home({ onLogout, token }) {
    const [user, setUser] = useState(null);
    const [Products, setProducts] = useState([]);

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
            .then(data => setProducts(data?.products))
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    return (
        <div className="">
            <nav className="bg-gray-600 fixed w-full top-0 ">
                <div className=" max-w-7xl mx-auto flex justify-between items-center py-1">
                    <div className="flex gap-1  items-center">
                        <img src="../../../src/assets/Logo (1).png" className=" w-16 h-14 object-contain" alt="logo" />
                        <p className="font-bold text-xl text-white">Ecommerce</p>
                    </div>
                    <div className="flex justify-center items-center gap-2">
                        <input type="checkbox" className="toggle toggle-success" checked />
                        <div className="flex gap-2 justify-center items-center">
                            <div className="dropdown dropdown-end">
                                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        {user && <img alt="User" src={user?.image} />}
                                    </div>
                                </label>
                                <ul tabIndex={0} className="mt-3 ml-20 z-[1] p-2 text-black text-center shadow menu dropdown-content bg-base-100 rounded-box w-40">
                                    {user && <p className='ml-2 mt-1 text-gray-800 text-sm'>{user?.username}</p>}
                                    {user && <p className='ml-2 mt-1 text-gray-500 text-sm'>{user?.email}</p>}
                                    {user && <button className='ml-2 mt-3 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:bg-red-600 transition duration-300' onClick={onLogout}>Log Out</button>}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <main>
                <div className="max-w-7xl mx-auto mt-24">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                        {Products?.map(product => (
                            <div key={product.id} className=" mx-auto overflow-hidden rounded-lg shadow-lg">
                                <div className="h-64">
                                    <img
                                        className="object-contain w-full h-full"
                                        src={product.thumbnail}
                                        alt={product.title}
                                    />
                                </div>
                                <div className="py-4 px-6">
                                    <h1 className="text-lg font-semibold text-gray-800 truncate">
                                        {product.title}
                                    </h1>
                                    <p className="text-sm text-gray-600 mt-1">{product.description}</p>
                                    <div className="flex items-center justify-between mt-4">
                                        <p className="text-gray-800 font-bold">
                                            ${product.price.toFixed(2)}
                                        </p>
                                        <div className="flex items-center">
                                            <p className="text-gray-600">Rating: {product.rating}</p>
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
                                        <p className="text-gray-600">In Stock: {product.stock}</p>
                                        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600 transition duration-300">
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Home;
