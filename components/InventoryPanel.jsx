// inventory panel lists all the items in the inventory

import React from "react";
import styles from "/styles/InventoryPanel.module.css";
import { useState, useEffect, useRef } from "react";

export class Warehouse {
    constructor(warehouse_id, total_space, remaining_space, inventory = [], changes = []) {
        this.warehouse_id = warehouse_id;
        this.total_space = total_space;
        this.remaining_space = remaining_space;
        // inventory is an array of objects with the following properties: item_id, item_name, item_quantity 
        this.inventory = inventory;
        this.changes = changes;
    }

    get spaceString() {
        return `${this.remaining_space}/${this.total_space}`;
    }

    toString() {
        return `${this.warehouse_id}. ${this.remaining_space}`;
    }

    // add an item to the inventory
    addItem(item_id, item_name, item_quantity) {
        this.inventory.push({ item_id, item_name, item_quantity });
        this.changes.push({ item_id, item_name, item_quantity });
    }

    // remove an item from the inventory
    removeItem(item_id, item_name, item_quantity) {
        this.inventory = this.inventory.filter(item => item.item_id !== item_id);
        this.changes.push({ item_id, item_name, item_quantity });
    }

    // update the quantity of an item in the inventory
    updateItem(item_id, item_name, item_quantity) {
        this.inventory.forEach(item => {
            if (item.item_id === item_id) {
                item.item_quantity = item_quantity;
            }
        });
        this.changes.push({ item_id, item_name, item_quantity });
    }

    // get the quantity of an item in the inventory
    getItemQuantity(item_id) {
        let item = this.inventory.find(item => item.item_id === item_id);
        return item.item_quantity;
    }

    // get the name of an item in the inventory
    getItemName(item_id) {
        let item = this.inventory.find(item => item.item_id === item_id);
        return item.item_name;
    }

    // get the item object of an item in the inventory
    getItem(item_id) {
        return this.inventory.find(item => item.item_id === item_id);
    }

    // get the changes made to the inventory
    getChanges() {
        return this.changes;
    }

    getAllItems() {
        return this.inventory;
    }


}    

export function InventoryPanel({ inventoryItems }) {
    const [selectedWarehouse, setSelectedWarehouse] = useState(inventoryItems[0]);
    const [warehouseList, setWarehouseList] = useState(inventoryItems);
    const [itemList, setItemList] = useState([]);
    const [item, setItem] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [warehouse, setWarehouse] = useState(0);
    const [warehouseSpace, setWarehouseSpace] = useState(0);
    const [warehouseSpaceRemaining, setWarehouseSpaceRemaining] = useState(0);
    const [warehouseInventory, setWarehouseInventory] = useState([]);
    const warehouseRef = useRef(warehouse);
    const warehouseSpaceRef = useRef(warehouseSpace);
    const warehouseSpaceRemainingRef = useRef(warehouseSpaceRemaining);
    const warehouseInventoryRef = useRef(warehouseInventory);

    // update warehouse list
    useEffect(() => {
        setWarehouseList(inventoryItems);
    }, [inventoryItems]);

    // update selected warehouse
    useEffect(() => {
        setSelectedWarehouse(warehouseList[warehouseRef.current]);
    }, [warehouseList]);

    // update item list
    useEffect(() => {
        setItemList(selectedWarehouse.inventory);
    }, [selectedWarehouse]);

    // update warehouse space
    useEffect(() => {
        setWarehouseSpace(selectedWarehouse.total_space);
    }, [selectedWarehouse]);

    // update warehouse space remaining
    useEffect(() => {
        setWarehouseSpaceRemaining(selectedWarehouse.remaining_space);
    }, [selectedWarehouse]);

    // update warehouse inventory
    useEffect(() => {
        setWarehouseInventory(selectedWarehouse.inventory);
    }, [selectedWarehouse]);

    // add item to warehouse 
    // TODO: add error handling for when the item already exists in the warehouse 
    // TODO: add error handling for when the warehouse is full 
    // TODO: add error handling for when the quantity is invalid 
    // TODO: add error handling for when the warehouse is invalid 

    const addItem = (e) => {
        e.preventDefault();
        let item_id = item;
        let item_name = item;
        let item_quantity = quantity;
        let warehouse_id = warehouse;
        let warehouse_space = warehouseSpace;
        let warehouse_space_remaining = warehouseSpaceRemaining;
        let warehouse_inventory = warehouseInventory;
        let warehouse_list = warehouseList;
        let warehouse_object = warehouse_list[warehouse_id];
        let warehouse_inventory_object = warehouse_object.inventory;

        // check if the warehouse is full
        if (warehouse_space_remaining < item_quantity) {
            alert("Warehouse is full");
            return;
        }

        // check if the quantity is valid
        if (item_quantity <= 0) {
            alert("Invalid quantity");
            return;
        }

        // check if the warehouse is valid
        if (warehouse_id < 0 || warehouse_id >= warehouse_list.length) {
            alert("Invalid warehouse");
            return;
        }
        // check if the item already exists in the warehouse
        let item_exists = warehouse_inventory_object.find(item => item.item_id === item_id);
        if (item_exists) {
            warehouse_inventory_object.forEach(item => {
                if (item.item_id === item_id) {
                    item.item_quantity += item_quantity;
                }
            });
            warehouse_object.changes.push({ item_id, item_name, item_quantity });
            warehouse_object.remaining_space -= item_quantity;
            setWarehouseSpaceRemaining(warehouse_object.remaining_space);
            setWarehouseInventory(warehouse_inventory_object);
            return;
        }


        // add the item to the warehouse
        warehouse_inventory_object.push({ item_id, item_name, item_quantity });
        warehouse_object.inventory = warehouse_inventory_object;
        warehouse_object.remaining_space = warehouse_space_remaining - item_quantity;
        warehouse_list[warehouse_id] = warehouse_object;
        setWarehouseList(warehouse_list);
        setWarehouseSpaceRemaining(warehouse_space_remaining - item_quantity);
        setWarehouseInventory(warehouse_inventory_object);
    }

    // remove item from warehouse
    const removeItem = () => {
        if (quantity > 0) {
            const itemIndex = warehouseInventoryRef.current.findIndex((item) => item.name === item);
            if (itemIndex > -1) {
                if (warehouseInventoryRef.current[itemIndex].quantity > quantity) {
                    warehouseInventoryRef.current[itemIndex].quantity -= quantity;
                } else {
                    warehouseInventoryRef.current.splice(itemIndex, 1);
                }
                warehouseSpaceRemainingRef.current += quantity;
                setWarehouseSpaceRemaining(warehouseSpaceRemainingRef.current);
                setItemList(warehouseInventoryRef.current);
            }
        }
    }

    // warehouse dropdown menu
    const warehouseMenu = (
        <select className={styles.warehouseDropdown} onChange={(e) => {
            warehouseRef.current = e.target.value;
            setWarehouse(warehouseRef.current);
        }}>
            {warehouseList.map((warehouse, index) => (
                <option key={index} value={index}>{warehouse.warehouse_id}</option>
            ))}
        </select>
    );

    return (
        <div className={styles.inventory_panel}>
            <div className={styles.inventory_panel__warehouse}>
                <h1>Warehouse: {warehouseMenu}</h1>
                <p>Total Space: {warehouseSpace}</p>
                <p>Remaining Space: {warehouseSpaceRemaining}</p>
            </div>
            <div className={styles.inventory_panel__inventory}>
                <h1>Inventory</h1>
                <ul>
                    {itemList.map((item, index) => (
                        <li key={index}>
                            <p>Item ID: {item.item_id} Quantity: {item.item_quantity}</p>
                        </li>
                    ))}
                </ul>
            </div>
            
            {/* add/remove */}
            <div className={styles.inventory_panel__add_remove}>
                <h1>Add/Remove Item</h1>
                <form>
                    <label>
                        Item ID:
                        <input
                            type="text"
                            value={item}
                            onChange={(e) => {
                                setItem(e.target.value);
                            }}
                        />
                    </label>
                    <br />
                    <label>
                        Quantity:
                        <input
                            type="number"
                            value={quantity}
                            onChange={(e) => {
                                setQuantity(e.target.value);
                            }}
                        />
                    </label>
                    <br />
                    <input type="button" value="Add" onClick={addItem} />
                    <input type="button" value="Remove" onClick={removeItem} />
                </form>
            </div>
        </div>
    );
}

export default InventoryPanel;