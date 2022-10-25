/*
 * Created on Sun Oct 09 2022
 * Copyright (c) 2022 Connor Doman
 */

import { useState, useEffect, useRef } from "react";
import styles from "/styles/ShipmentPanel.module.css";
import SearchBar from "./SearchBar";

//Shipment class
export class Shipment {
    constructor(shipment_id, content = [], price) {
        this.shipment_id = shipment_id;
        this.content = content;
        this.price = price;
    }

    static priceFormatter = new Intl.NumberFormat("en-CA", {
        style: "currency",
        currency: "CAD",
    });

    get priceString() {
        return Shipment.priceFormatter.format(this.price);
    }

    toString() {
        return `${this.shipment_id}. ${this.content}`;
    }
}

export const ShipmentList = ({ item }) => {
    const it = new Shipment(item.shipment_id, item.content, item.price);
    return (
        <li className={styles.shipment}>
            <span>
                Order Number: {it.shipment_id}
                <br />
                Content:
                <br />
                {it.content.map((item) => (content.toString()))}
                <br />
                Total: {it.priceString}
            </span>
        </li>
    );
};

export const ShipmentPanel = ({ testShipments }) => {
    const items = testShipments?.map((item) => {
        let i = new Shipment(item.shipment_id, item.content, item.price);
        return (
            <ShipmentList
                key={i.shipment_id}
                item={i}
            />
        );
    });

    return (
        <div>
            <h1 style={{textIndent: 40}}>Active shipments: </h1>
            {/* <SearchBar /> */} 
            <ul className={styles.orderList}>{items}</ul>
        </div>
    );
};

export default ShipmentPanel;
