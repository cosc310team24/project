/*
 * Created on Sun Oct 09 2022
 * Copyright (c) 2022 Connor Doman
 */

import { useState, useEffect, useRef } from "react";
import styles from "/styles/ShipmentPanel.module.css";
import SearchBar from "./SearchBar";
import Generator from "/utils/generators.js";

//Shipment class
export class Shipment {
    constructor(shipment_id, content = [], price) {
        this.uniqueID = Generator.makeID(5);
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

    get key() {
        return `${this.uniqueID}_${this.shipment_id}`;
    }

    get contentString() {
        return this.content.join(", ");
    }

    toString() {
        return `${this.shipment_id}. ${this.content}`;
    }
}

export const ShipmentListItem = ({ item }) => {
    const [currentItem, setCurrentItem] = useState(item);

    useEffect(() => {
        if (!(item instanceof Shipment)) {
            let it = new Shipment(item.shipment_id, item.content, item.price);
            setCurrentItem(it);
        }
    }, [currentItem]);

    return (
        <li className={styles.shipment}>
            <span>
                Order Number: {item.shipment_id}
                <br />
                Content:
                <br />
                {item.contentString}
                <br />
                Total: {item.priceString}
            </span>
        </li>
    );
};

export const ShipmentPanel = ({ testShipments }) => {
    const items = testShipments?.map((item) => {
        let i = new Shipment(item.shipment_id, item.contents, item.price);
        return <ShipmentListItem key={i.key} item={i} />;
    });

    return (
        <div>
            <h1 style={{ margin: "1.5em" }}>Active shipments: </h1>
            {/* <SearchBar /> */}
            <ul className={styles.orderList}>{items}</ul>
        </div>
    );
};

export default ShipmentPanel;
