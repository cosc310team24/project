import OrderItem from "./order_item.js";

export class WareHouse {
    //this class tracks the amount of storage space currently in use as well as maximum storage space in a warehouse
    constructor(totSpace = 0, remSpace = 0, ID = 0) {
        //contsructs new warehouse object
        this.totSpace = totSpace; //total storage volume in m^3
        this.remSpace = remSpace; //remaining storage volume in m^3
        this.wareHouseID = ID; //ID of warehouse
        this.changes = []; //tracks which users modified warehouse stock
    }

    getTotSpace() {
        //returns total space
        return this.totSpace;
    }
    getRemainingSpace() {
        //returns remaining space
        return this.remSpace;
    }
    setTotSpace(space) {
        //sets total space
        this.totSpace = space;
    }
    updateRemainingSpace(space) {
        //updates remaining space if required in the event of a discrepency or when setting up the system or expanding the warehouse
        this.remSpace = space;
        if (this.remSpace<=0.2*this.totSpace) {
            //checks if remaining storage space is low and notifies user
            console.log("Remaining storage space running low");
        }
    }
    setID(ID) {
        //sets ID of warehouse
        this.wareHouseID = ID;
    }
    getID() {
        //gives warehouse ID
        return this.wareHouseID;
    }
    seeChanges(n) {
        //prints out last n logged changes to warehouse

        // let fin = this.changes.size() - 1; //index for final entry on changes
        let fin = this.changes.length - 1; // javascript version (arrays use length instead of size())

        if (n > fin + 1) {
            //checks if requested number of changes is greater than total changes and corrects it
            n = fin;
        }
        for (let i = 0; i < n; i++) {
            //cycles through changes from most recent change back
            console.log(this.changes[fin]); //prints change log to user
            fin = fin - 1; //updates index
        }
    }
    remove(it, n, per) {
        //adds storage space when n items are used
        if (per.getPermission() >= it.getPermission()) {
            //checks if users permission status is sufficient
            this.remSpace = this.remSpace + it.getSpace() * n;
            let date = new Date();
            let dateFormat = date.toLocaleString("en-CA", {
                timezone: "America/Vancouver",
            });

            let str = per.getName() + " removed "+n+" " + it.getName() + " on " + dateFormat;
            this.changes.push(str); //adds log of change to list of changes
        } else {
            //if user's permission status is too low
            console.error("unathorized removal"); //prints message to user that their permission status does not authorize this change
        }
    }
    add(it, n, per) {
        //removes storage space when n items are added
        this.remSpace = this.remSpace - it.getSpace() * n;
        let date = new Date();
        let dateFormat = date.toLocaleString("en-CA", {
            timezone: "America/Vancouver",
        });

        let str = per.getName() + " removed "+n+" " + it.getName() + " on " + dateFormat;
        this.changes.push(str); //adds log of change to list of changes
        if (this.remSpace<=0.2*this.totSpace) {
            //checks if remaining storage space is low and notifies user
            console.log("Remaining storage space running low");
        }
    }
}

export default WareHouse;
