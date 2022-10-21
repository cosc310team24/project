class WareHouse {//this class tracks the amount of storage space currently in use as well as maximum storage space in a warehouse
    constructor() {//total storage volume in m^3
      this.totSpace = 0;//total storage volume in m^3
      this.remSpace = 0;//remaining storage volume in m^3
      this.wareHouseID = null;//ID of warehouse
      this.changes = new ArrayList();//tracks which users modified warehouse stock
    }
    getTotSpace() {//returns total space
      return this.totSpace;
    }
    getRemainingSpace() {//returns remaining space
      return this.remSpace;
    }
    setTotSpace(space) {//sets total space
      this.totSpace = space;
    }
    updateRemainingSpace(space) {//updates remaining space if required in the event of a discrepency or when setting up the system or expanding the warehouse
      this.remSpace = space;
    }
    setID(ID) {//sets ID of warehouse
      this.wareHouseID = ID;
    }
    getID() {//gives warehouse ID
      return this.wareHouseID;
    }
    seeChanges(n) {//prints out last n logged changes to warehouse
      let fin = this.changes.size() - 1;//index for final entry on changes
      if (n > fin + 1) {//checks if requested number of changes is greater than total changes and corrects it
        n = fin;
      }
      for (let i = 0; i < n; i++) {//cycles through changes from most recent change back 
        System.out.println(`${changes(fin)[2]}, ${this.changes(fin)[0]} ${this.changes(fin)[1]}`);//prints change log to user
        fin = fin - 1;//updates index 
      }
    }
    remove(it, n, per) {//adds storage space when n items are used
      if (per.getPermission() >= it.getPermission()) {//checks if users permission status is sufficient
        this.remSpace = this.remSpace + it.getSpace() * n;
        let date = Calendar.getInstance().getTime();
        let dateFormat = new SimpleDateFormat('yyyy-mm-dd hh:mm:ss');
        let str = [per.getName(), 'removed ' + n + ' ' + it.getName(), dateFormat.format(date)];
        this.changes.add(str);//adds log of change to list of changes
      } else {//if user's permission status is too low
        System.out.println('unathorized removal');//prints message to user that their permission status does not authorize this change
      }
    }
    add(it, n, per) {//removes storage space when n items are added
      this.remSpace = this.remSpace - it.getSpace() * n;
      let date = Calendar.getInstance().getTime();
      let dateFormat = new SimpleDateFormat('yyyy-mm-dd hh:mm:ss');
      let str = [per.getName(), 'added ' + n + ' ' + it.getName(), dateFormat.format(date)];
      this.changes.add(str);//adds log of change to list of changes
    }
  }