
import ReactDOM from 'react-dom';

import { useState, useEffect, useRef } from "react";
import SearchTable from "/components/SearchTable.jsx";

export class InventoryItem {
    static priceFormatter = new Intl.NumberFormat("en-CA", {
        style: "currency",
        currency: "CAD",
    });

    constructor(id, name, price, quantity) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }

}

const testInventoryItems = [ {

        id: 0,
        name: "Item 1",
        price: 91.99,
        quantity: 5,
    },
    {
        id: 1,
        name: "Item 2",
        price: 15.99,
        quantity: 6,
    },
    {
        id: 2,
        name: "Item 3",
        price: 61.99,
        quantity: 2,
    },
    {
        id: 3,
        name: "Item 4",
        price: 3.99,
        quantity: 5,
    },
    {
        id: 4,
        name: "Item 5",
        price: 56.99,
        quantity: 1,
    }
];

const InventoryPanel = () => {
        return (
            <SearchTable data={testInventoryItems}/>
        );
};

export default InventoryPanel;