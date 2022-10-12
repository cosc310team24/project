/*
 * Created on Sun Oct 09 2022
 * Copyright (c) 2022 Connor Doman
 */

import { useState, useEffect } from "react";

export const OrderForm = () => {
    const [cartSize, setCartSize] = useState(0);

    console.log(cartSize);

    return (
        <div className="orderForm">
            <h1>Order Form</h1>
            <p>Cart ({cartSize})</p>
            {/* <form> */}
            {/* <input type="text" placeholder="Name" />
            <input type="text" placeholder="Phone" />
            <input type="text" placeholder="Address" />
            <input type="text" placeholder="City" />
            <input type="text" placeholder="Province" />
            <input type="text" placeholder="Postal Code" />
            <input type="text" placeholder="Country" />
            <input type="text" placeholder="Email" />
            <input type="text" placeholder="Notes" /> */}
            <button type="addToCart" onClick={() => setCartSize(cartSize + 1)}>
                Add To Cart
            </button>
            {/* </form> */}
        </div>
    );
};

export default OrderForm;
