/*
 * Created on Sun Oct 09 2022
 * Copyright (c) 2022 Connor Doman
 */

import { useState, useEffect, useRef } from "react";
import styles from "/styles/ShipmentPanel.module.css";
import SearchBar from "./SearchBar";


// create a search bar to filter shipments by ID 
// create a button to sort shipments by ID
// create a button to sort shipments by date
// create a button to sort shipments by status

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

// ShipmentPanel component
// props: shipments
// state: filteredShipments 
// state: sortType
// state: sortDirection
// state: searchQuery
// state: searchResults

const ShipmentPanel = ({ testShipments }) => {
    const [filteredShipments, setFilteredShipments] = useState([]);
    const [sortType, setSortType] = useState("shipment_id");
    const [sortDirection, setSortDirection] = useState("ascending");
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    
    // filter shipments by searchQuery
    useEffect(() => {
        const results = testShipments.filter((shipment) =>
            shipment.shipment_id.toString().toLowerCase().includes(searchQuery)
        );
        setSearchResults(results);
    }, [searchQuery]);

    // sort shipments by sortType and sortDirection
    useEffect(() => {
        const sortedShipments = [...searchResults].sort((a, b) => {
            if (sortDirection === "ascending") {    
                if (a[sortType] < b[sortType]) {
                    return -1;
                }
                if (a[sortType] > b[sortType]) {
                    return 1;
                }
                return 0;
            } else {
                if (a[sortType] > b[sortType]) {
                    return -1;
                }
                if (a[sortType] < b[sortType]) {
                    return 1;
                }
                return 0;
            }
        });
        setFilteredShipments(sortedShipments);
    }, [searchResults, sortType, sortDirection]);

    return (
        <div className={styles.container}>
            <div className={styles.searchBar}>
                <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            </div>
            <div className={styles.sortButtons}>
                <button onClick={() => setSortType("shipment_id")}>Sort by ID</button>
                <button onClick={() => setSortType("date")}>Sort by Date</button>
                <button onClick={() => setSortType("status")}>Sort by Status</button>
                <button onClick={() => setSortDirection("ascending")}>Ascending</button>
                <button onClick={() => setSortDirection("descending")}>Descending</button>
            </div>
            <div className={styles.shipmentList}>
                <ul>
                    {filteredShipments.map((item) => (
                        <ShipmentList item={item} />
                    ))}
                </ul>
            </div>
        </div>
    );
};

// export const ShipmentPanel = ({ testShipments }) => {
//     const items = testShipments?.map((item) => {
//         let i = new Shipment(item.shipment_id, item.content, item.price);
//         return (
//             <ShipmentList
//                 key={i.shipment_id}
//                 item={i}
//             />
//         );
//     });

//     return (
//         <div>
//             <h1 style={{textIndent: 40}}>Active shipments: </h1>
//             <SearchBar />
//             <ul className={styles.shipmentList}>{items}</ul>
//         </div>
//     );
// };

export default ShipmentPanel;
