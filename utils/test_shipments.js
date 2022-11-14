export const TEST_ITEMS = [
    {
        shipment_id: 123,
        price: 91.99,
        status: "pending",
        date: "2021-10-20",
        content: [
            {
                item_id: 1,
                name: "item1",
                quantity: 1,
                price: 91.99,
                
            },
            {
                item_id: 2,
                name: "item2",
                quantity: 1,
                price: 69.69,
            }
        ]
    
    },
    {
        shipment_id: 456,
        contents: new Array(2).fill("Item 2"),
        price: 5.99,
        status: "pending",
        date: "2021-08-20",
        content: [
            {
                item_id: 1,
                name: "item1",
                quantity: 1,
                price: 91.99,
                
            }
        ]
    },
    {
        shipment_id: 999,
        contents: "Item 2, Item 3",
        price: 10.99,
    }
    ,
    {
        shipment_id: 999,
        contents: "Item 2, Item 3",
        price: 10.99,
    }
];