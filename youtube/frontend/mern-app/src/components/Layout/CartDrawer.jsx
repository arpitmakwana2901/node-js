import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import CartContent from "../Cart/cartContent";

const CartDrawer = ({ drawerOpen, toggleCartDrawer }) => {

  return (
    <>
      <div
        className={`fixed top-0 right-0 w-3/4 sm:w-1/2 md:w-[30rem] h-full bg-white shadow-lg transform transition-transform duration-300 flex flex-col z-50 ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/*close button*/}
        <div className="flex justify-end p-4">
          <button onClick={toggleCartDrawer}>
            <IoMdClose className="h-6 w-6 text-gray-600 cursor-pointer" />
          </button>
        </div>
        <div className="flex-grow p-4 overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
        <CartContent/>
       {/* Component for the cart contents*/}
        </div>
        {/* Checkout button fixed at bottom*/}
        <div className="p-4 bg-white sticky bottom-0">
          <button className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition">CheckOut</button>
          <p className="text-sm tracking-tigher text-gray-500 mt-2 text-center">
            Shipping, texes, and discount codes calculated at CheckOut.
          </p>
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
