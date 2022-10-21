/*
 * Created on Sun Oct 09 2022
 * Copyright (c) 2022 Connor Doman
 */

import { useState, useEffect, useRef } from "react";
import Incrementor from "/components/Incrementor.jsx";
import CartBanner from "/components/Cart.jsx";
import styles from "/styles/ShipmentPanel.module.css";

export class OrderItem {
    constructor(shipment_id, content, price) {
        this.shipment_id = shipment_id;
        this.content = content;
        this.price = price;
    }

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

    get priceString() {
        return OrderItem.priceFormatter.format(this.price);
    }

    toString() {
        return `${this.shipment_id}. ${this.content}`;
    }
}

export const OrderListItem = ({ item, quantity, onChange }) => {
    const [shipment_id, setshipment_id] = useState(item.shipment_id);
    const [count, setCount] = useState(quantity);

    const it =
        item instanceof OrderItem
            ? item
            : new OrderItem(item.shipment_id, item.content, item.price);

    return (
        <li className={styles.orderItem}>
            <span>
                {it.toString()}
                <br />
                {it.priceString}
            </span>
        </li>
    );
};

export const OrderPanel = ({ orderCallback, testOrderItems }) => {
    const [orderItems, setOrderItems] = useState({});

    const updateItems = (item, quantity) => {
        let oldLen = Object.keys(orderItems).length;
        // Copy state object
        let newOrderItems = { ...orderItems };
        newOrderItems[item.shipment_id] = [item, quantity];

    };

    const items = testOrderItems?.map((item) => {
        let i = new OrderItem(item.shipment_id, item.name, item.price);
        const qty = orderItems[i.shipment_id] ? orderItems[i.shipment_id][1] : 0;
        return (
            <OrderListItem
                key={i.shipment_id}
                item={i}
                onChange={updateItems}
                quantity={qty}
            />
        );
    });

    return (
        <div>
            <ul className={styles.orderList}>{items}</ul>
        </div>
    );
};

export default OrderPanel;
