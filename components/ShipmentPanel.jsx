import { useState, useEffect, useRef } from "react";
import styles from "/styles/ShipmentPanel.module.css";
import SearchBar from "./SearchBar";

//Shipment class
export class Shipment {
    constructor(shipment_id, price, status, date, content = []) {
        this.shipment_id = shipment_id;
        this.price = price;
        this.status = status;
        this.date = date;
        this.content = content;
    }

    static priceFormatter = new Intl.NumberFormat("en-CA", {
        style: "currency",
        currency: "CAD",
    });

    get priceString() {
        return Shipment.priceFormatter.format(this.price);
    }

    toString() {
        return `${this.shipment_id}. ${this.content}. ${this.priceString}. ${this.status}`;
    }
}

export const ShipmentList = ({ item }) => {
    const it = new Shipment(item.shipment_id, item.price, item.status, item.date, item.content);
    return (
        <li className={styles.shipment}>
            <span>
                <b>Shipment ID:</b> {it.shipment_id}
            </span>
            <span> 
                <b>Date: </b> { it.date }
            </span>
            <span>
                <b>Price:</b> {it.priceString}
            </span>
            <span>
                <b>Status:</b> {it.status}
            </span>
            <span>
                <b>Content:</b> {it.content}
            </span>
        </li>
    );
};

//style for the shipment panel
// Path: styles/ShipmentPanel.module.css

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
                <button onClick={() => setSortType("price")}>Sort by Price</button>
            </div>
            <div className={styles.sortDirection}>
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

export default ShipmentPanel;