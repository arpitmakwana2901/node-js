import React from "react";
import { RiDeleteBin3Line } from "react-icons/ri";
const cartProducts = [
  {
    productId: 1,
    name: "T-shirt",
    size: "M",
    color: "Red",
    qualtity: 1,
    price: 15,
    image: "https://picsum.photos/200?random=1",
  },
  {
    productId: 2,
    name: "Jeans",
    size: "L",
    color: "Blue",
    qualtity: 1,
    Price: 15,
    image: "https://picsum.photos/200?random=2",
  },
];
const CartContent = () => {
  return (
    <>
      <div>
        {cartProducts.map((product, index) => (
          <div
            className="flex items-start justify-between py-4 border-b"
            key={index}
          >
            <div className="flex items-start">
              <img
                src={product.image}
                alt={product.name}
                className="w-20 h-24 object-cover mr-4 rounded"
              />
              <div>
                <h3>{product.name}</h3>
                <p className="text-sm text-gray-500 ">
                  size:{product.size} | color:{product.color}
                </p>
                <div className="flex items-center mt-2">
                  <button className="border rounded px-2 py-1 text-xl font-medium">-</button>
                  <span className="mx-4">{product.qualtity}</span>
                  <button className="border rounded px-2 py-1 text-xl font-medium">+</button>
                </div>
              </div>
            </div>
            <div>
                <p>${product.price}</p>
                <button>
                    <RiDeleteBin3Line className="h-6 w-6 mt-2 text-red-600 "/>
                </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CartContent;
