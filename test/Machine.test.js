const Machine = require('../src/Machine')

describe('The vending machine', () => {
  it('is initialized with no items', () => {
    // setup
    const vendingMachine = new Machine();

    // exercise
    //none
    
    //assert
    expect(vendingMachine.seeSelections()).toEqual([]);

    //teardown
  })

  it('return how much money the customer has when inserting money', () => {
    //setup
    const vendingMachine = new Machine();

    //exercise
    let cMoney0 = vendingMachine.insert(null);
    let cMoney1 = vendingMachine.insert(0);
    let cMoney2 = vendingMachine.insert(10);
    let cMoney3 = vendingMachine.insert(20);
    let cMoney4 = vendingMachine.insert(50);
    let cMoney5 = vendingMachine.insert(100);
    let cMoney6 = vendingMachine.insert(500);

    //assert
    expect(cMoney0).toEqual('You cannot deposit that amount. Your current balance is 0$.');
    expect(cMoney1).toEqual('You cannot deposit that amount. Your current balance is 0$.');
    expect(cMoney2).toEqual('You have deposited 10$. Your current balance is 10$.');
    expect(cMoney3).toEqual('You have deposited 20$. Your current balance is 30$.');
    expect(cMoney4).toEqual('You have deposited 50$. Your current balance is 80$.');
    expect(cMoney5).toEqual('You have deposited 100$. Your current balance is 180$.');
    expect(cMoney6).toEqual('You have deposited 500$. Your current balance is 680$.');

    //teardown
  })

  it('unavailable items will return that the item is unavailable', () => {
    //setup
    const vendingMachine = new Machine();

    //exercise
    let choice = vendingMachine.selectItem(400);

    //assert
    expect(choice).toEqual('Item 400 is not available. Your current balance is 0$.');
  
    //teardown
  })

  it('can stock one snack', () => {
    // setup
    const vendingMachine = new Machine();
    const snack = {
      name: 'macadamia nuts',
      price: 250
    }

    // exercise
    vendingMachine.stock([snack]);

    // assert
    expect(vendingMachine.seeSelections()).toEqual([snack]);

    //teardown
  })

  it('displays an error if no inventory comes with stocking', () => {
    // setup
    const vendingMachine = new Machine();

    // exercise & assert
    expect(() => vendingMachine.stock()).toThrow("please do not troll. you cannot stock nothing.");

    //teardown
  })

  it('display a error when there is an insufficient balace', () =>{
    //setup
    const vendingMachine = new Machine();
    const Message = 'Your deposit is insufficient.  Please add $ 20 for this item'

    //exercise
    vendingMachine.stock([{name:'Cheedos', price: 20}])

    //assert
    expect(vendingMachine.selectItem('Cheedos')).toEqual(Message)
    
    //teardown
  })

  it('return change and the item bought when selecting a valid item', () => {
    //setup
    const vendingMachine = new Machine();

    //exercise
    vendingMachine.stock([{name:'Doritos', price: 500}]);
    vendingMachine.insert(550);
    var expectation = { item: 'Doritos', change: [50]};

    //assert
    expect(vendingMachine.selectItem('Doritos')).toEqual(expectation);
    

    //teardown
  })

  it('return cash back when customer cancel trasaction', () => {
    //setup
    const vendingMachine = new Machine;
    var C_expect = {change: 100}

    //exercise
    vendingMachine.cancel();

    //assert
    expect(vendingMachine.cancel())

    //teardown
  })
})