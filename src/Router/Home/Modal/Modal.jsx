import React from 'react';

function Modal({ cart, removeFromCart, calculateTotalPrice, handleModalClose }) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative mt-10 p-8 rounded bg-gray-900 text-white shadow-lg w-full sm:max-w-md">
                <button className="absolute top-0 right-0 p-2 text-red-400" onClick={handleModalClose}>X</button>
                <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
                <div>
                    {cart.map((item, index) => (
                        <div key={item.id} className="flex justify-between items-center py-2">
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
    );
}

export default Modal;
