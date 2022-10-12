/*
 * Created on Sun Oct 09 2022
 * Copyright (c) 2022 Connor Doman
 */

import { useState, useEffect, useRef } from "react";
import Incrementor from "/components/Incrementor.jsx";
import CartBanner from "/components/Cart.jsx";

export class OrderItem {
    static priceFormatter = new Intl.NumberFormat("en-CA", {
        style: "currency",
        currency: "CAD",
    });

    static generatedTestItems = (() => {
        let items = [];
        for (let i = 0; i < 100; i++) {
            items.push(
                new OrderItem(i, `Item ${i}`, Math.floor(Math.random() * 100))
            );
        }
        return items;
    })();

    constructor(id, name, price) {
        this.id = id;
        this.name = name;

        this.price = OrderItem.priceFormatter.format(price);
    }

    toString() {
        return `${this.id}. ${this.name}`;
    }
}

export const OrderListItem = ({ item, onChange }) => {
    const [id, setId] = useState(item.id);
    const [count, setCount] = useState(0);

    const didMount = useRef(false);

    useEffect(() => {
        if (!didMount.current) {
            didMount.current = true;
            return;
        }
    });

    const handleChange = (count) => {
        console.log(`OrderListItem ${id}: ${count}`);
        setCount(count);
        onChange(item, count);
    };

    const increment = (qty) => {
        handleChange(count + 1);
    };

    const decrement = () => {
        if (count > 0) handleChange(count - 1);
    };

    let it =
        item instanceof OrderItem
            ? item
            : new OrderItem(item.id, item.name, item.price);
    return (
        <li className="orderItem">
            <div className="itemImage"></div>
            <span>
                {it.toString()}
                <br />
                {it.price}
            </span>
            <Incrementor
                id={item.id}
                value={count}
                onChange={handleChange}
                onIncrement={increment}
                onDecrement={decrement}
            />
            <span className="itemTotal">
                {OrderItem.priceFormatter.format(item.price * count)}
            </span>
        </li>
    );
};

export const OrderPanel = ({ orderCallback, testOrderItems }) => {
    const [orderItems, setOrderItems] = useState({});

    const addItem = (item, quantity) => {
        // Copy state object
        let newOrderItems = { ...orderItems };
        newOrderItems[item.id] = [item.name, quantity];

        // Remove item if quantity is 0
        if (quantity === 0) {
            delete newOrderItems[item.id];
        }

        // Set to new updated value
        setOrderItems(newOrderItems);

        // console.log(orderItems);
    };

    const items = testOrderItems?.map((item) => {
        let i = new OrderItem(item.id, item.name, item.price);
        return <OrderListItem key={item.id} item={item} onChange={addItem} />;
    });

    return (
        <div>
            <CartBanner items={orderItems} />
            <ul className="orderList">{items}</ul>
        </div>
    );
};

export default OrderPanel;
