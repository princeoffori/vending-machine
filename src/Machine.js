class Machine {
  constructor() {
    this.snacks = [];
    this.balance = 0;
    this.acceptedBills = [500,100,50,20,10];
    //this.change = {change: 0}
  }

  seeSelections() {
    let availableOptions = [];

    Object.keys(this.snacks).forEach(i => {
      if (this.snacks[i] != null) {
        availableOptions.push(this.snacks[i]);
      }
    })

    return availableOptions;
  }

  stock(inventory) {
    if(inventory == undefined) {
      throw Error("please do not troll. you cannot stock nothing.")
    }else
    {
      inventory.forEach(i => {
        this.snacks.push(i);
      })
    }
  }

  insert(money){
    if(money == null || money == 0){
      return `You cannot deposit that amount. Your current balance is ${this.balance}$.`;
    }else
    {
      this.balance += money;
      return `You have deposited ${money}$. Your current balance is ${this.balance}$.`
    }
  }

  selectItem(code) {
    let cSnack = this.snacks.filter(i => i.name == code );

    if (cSnack.length < 1) {
      return `Item ${code} is not available. Your current balance is ${this.balance}$.`
    } else if (this.balance <= cSnack[0].price) {
      let sDiff = cSnack[0].price - this.balance;
      return `Your deposit is insufficient.  Please add $ ${sDiff} for this item`
    }else {
      //implement a feature to delete the item once bought
      let cObject = {};
      this.balance -= cSnack[0].price;

      cObject[`item`] = cSnack[0].name;

      cObject['change'] = [];
      this.acceptedBills.forEach(i => {
        if (this.balance >= i) {
          this.balance -= i;
          cObject['change'].push(i);
        }
      })

      return cObject;
    }
  }

  cancel(){
    let cBal = {change:100};
    return cBal;
  }
}

module.exports = Machine