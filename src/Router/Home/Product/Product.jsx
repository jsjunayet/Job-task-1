
import React from "react";

function Product({ product, darkMode, addToCart }) {
    return (
        <div
            className={`mx-auto overflow-hidden rounded-lg shadow-lg ${darkMode ? 'bg-gray-800 text-white border-black border-2' : ''}`}
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
    );
}

export default Product;
