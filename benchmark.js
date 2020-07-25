const siege = require("siege");

siege()
  .on(3000)
  .concurrent(10000)
  .for(150000)
  .times.post("/getBill", [
    {
      item: "Headache pills",
      itemCategory: "Medicine",
      quantity: 5,
      price: 50,
    },
    { item: "Sandwich", itemCategory: "Food", quantity: 2, price: 200 },
    { item: "Perfume", itemCategory: "Imported", quantity: 1, price: 4000 },
    { item: "Black Swan", itemCategory: "Book", quantity: 1, price: 300 },
  ])
  .attack();
