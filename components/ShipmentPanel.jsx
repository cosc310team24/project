import { useState, useEffect, useRef } from "react";
import styles from "/styles/ShipmentPanel.module.css";
import SearchBar from "./SearchBar";
import Generator from "/utils/generators.js";

//Shipment class
export class Shipment {
    constructor(shipment_id, price, status, priority, date, content) {
        this.shipment_id = shipment_id;
        this.price = price;
        this.status = status;
        this.priority = priority;
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

    get key() {
        return `${this.uniqueID}_${this.shipment_id}`;
    }

    get contentString() {
        return this.content.join(", ");
    }

    toString() {
        return `${this.shipment_id}. ${this.content}. ${this.priceString}. ${this.status}`;
    }

    //status can be "Processing", "In Transit", "Delivered", or "Cancelled"
    //use int to represent status
    get statusString() {
        switch (this.status) {
            case 0:
                return "Processing";
            case 1:
                return "In Transit";
            case 2:
                return "Delivered";
            case 3:
                return "Cancelled";
            default:
                return "Unknown";
        }
    }
    get priorityString() {
        switch (this.priority) {
            case 0:
                return "None";
            case 1:
                return "Rush";
            default:
                return "None";
        }
    }
    setStatus(status) {
        this.status = status;
    }
    setPriority(priority) {
        this.priority = priority;
    }
}

// shipments is an array of Shipment objects 
//content is an array of objects with the following properties: item_id, name, quantity, price
//shipmentList displays the shipment_id, price, (int) status, (int )priority, date, and content of each shipment
//each shipment has two buttons to change the status and priority of the shipment respectively 
//status is an int that can be 0, 1, 2, or 3, use get statusString to get the string representation of the status
//priority is an int that can be 0 or 1, use get priorityString to get the string representation of the priority

export const ShipmentList = ({ item }) => {
    const [status, setStatus] = useState(item.status);
    const [priority, setPriority] = useState(item.priority);
    const [statusString, setStatusString] = useState(item.statusString);
    const [priorityString, setPriorityString] = useState(item.priorityString);
    const [content, setContent] = useState(item.content);
    const [price, setPrice] = useState(item.price);
    const [priceString, setPriceString] = useState(item.priceString);
    const [date, setDate] = useState(item.date);
    const [shipment_id, setShipment_id] = useState(item.shipment_id);

    //update status to cancelled 
    const handleCancel = () => {
        setStatus(3);
        setStatusString("Cancelled");
    };

    //update priority to rush 
    const handleRush = () => {
        setPriority(1);
        setPriorityString("Rush");
    };

    // initial status and priority not appearing in the shipment list 
    useEffect(() => {
        setStatus(item.status);
        setPriority(item.priority);
        setStatusString(item.statusString);
        setPriorityString(item.priorityString);
        setContent(item.content);
        setPrice(item.price);
        setPriceString(item.priceString);
        setDate(item.date);
        setShipment_id(item.shipment_id);
    }, [item]);


    return (
        <li>
            <div className={styles.shipment}>
                <span>
                    <b>Shipment ID:</b> {shipment_id}
                </span>
                <span>
                    <b>Price:</b> ${price}
                </span>
                <span>
                    <b>Status:</b> {statusString}
                </span>
                <span>
                    <b>Priority:</b> {priorityString}
                </span>
                <span>
                    <b>Date:</b> {date}
                </span>
                <span>
                    <b>Content:</b>
                </span>
                <div className={styles.content}>
                    {content.map((item) => (
                        <div key={item.item_id}>
                            {item.name} x {item.quantity}
                        </div>
                    ))}
                </div>
                <div className={styles.buttons}>

                    <button onClick={handleCancel}>Cancel</button>
                    <button onClick={handleRush}>Rush</button>
                </div>

            </div>
        </li>
    );
};

//     const it = new Shipment(item.shipment_id, item.price, item.status, item.priority, item.date, item.content);
//     return (
//         <li className={styles.shipment}>
// <span>
//     <b>Shipment ID:</b> {it.shipment_id}
// </span>
//             <span> 
//                 <b>Date: </b> { it.date }
//             </span>
//             <span>
//                 <b>Total Price:</b> {it.priceString}
//             </span>
//             <span>
//                 <b>Status:</b> {it.statusString}
//             </span>
//             <span style={{ color: it.priority === 1 ? "orange" : "black" }}>
//                 <b>Priority:</b> {it.priorityString}
//             </span>
//             <span>
//                 <b> <br></br> Content: </b>
//             </span> 
//             <span> 
//                 {/* // create new div for each item in content
//                 // check if content is undefined */}
//                 {item.content === undefined ? (
//                     <div>
//                         <b>Content:</b> No content
//                     </div>
//                 ) : (
//                     // check if content is empty
//                     item.content.length === 0 ? (
//                         <div>
//                             <b>Content:</b> No content
//                         </div>
//                     ) : (
//                         // content is not empty
//                         // create string to return item_id, name, quantity, and price
//                         item.content.map((item) => (
//                             <div>
//                                 <b>Item ID:</b> {item.item_id}
//                                 <b>Name:</b> {item.name}
//                                 <b>Quantity:</b> {item.quantity}
//                                 <b>Price:</b> {Shipment.priceFormatter.format(item.price)}
//                             </div>
//                         ))
//                     )
//                 )}
//             </span>
//             <span>
//                 <button onClick={() => it.setPriority(1)}>Rush</button>
//                 <button onClick={() => it.setStatus(3)}>Cancel</button>
//             </span>
//         </li>
//     );
// };

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
                <button onClick={() => setSortType("priority")}>Sort by Priority</button>
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