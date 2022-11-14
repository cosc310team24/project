// inventory panel lists all the items in the inventory

import React from "react";
import styles from "/styles/InventoryPanel.module.css";
import { useState, useEffect, useRef } from "react";

//Warehouse class 
// //total space, remaining space, ID, changes to inventory
export class Warehouse {
    constructor(warehouse_id, total_space, remaining_space, inventory = [], changes = []) {
        this.warehouse_id = warehouse_id;
        this.total_space = total_space;
        this.remaining_space = remaining_space;
        this.inventory = inventory;
        this.changes = changes;
    }

    get spaceString() {
        return Warehouse.spaceFormatter.format(this.remaining_space);
    }

    toString() {
        return `${this.warehouse_id}. ${this.remaining_space}`;
    }
}
// InventoryList class
// dropdown menu to select current warehouse
// warehouse id, total space, remaining space, inventory array, changes array
// changes by default are not shown unless user clicks on a button to show them 



export const InventoryList = ({ item }) => {
    const it = new Warehouse(item.warehouse_id, item.total_space, item.remaining_space, item.inventory);
    return (
        <li className={styles.inventory_list}>
            <span>
                <h1>Inventory for warehouse ID: {it.warehouse_id}</h1>
                Warehouse ID: {it.warehouse_id}
                <br />
                Total Space: {it.total_space}
                <br />
                Remaining Space: {it.remaining_space}
                <br />
                Inventory: {it.inventory}
                <br />
                <button>Show/Hide History</button>
                {it.changes}
            </span>
        </li>
    );
}

export const InventoryPanel = ({ inventoryItems }) => {
    const items = inventoryItems?.map((item) => {
        let i = new Warehouse(item.warehouse_id, item.total_space, item.remaining_space, item.inventory);
        return (
            <InventoryList
                key={i.warehouse_id}
                item={i}
            />
        );
    });

    return (
        <div>
            <ul>{items}</ul>
        </div>
    );
}

export default InventoryPanel;
