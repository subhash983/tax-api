const express = require("express");

const app = express();

app.use(express.json());

const computeTax = (item) => {
  let tax = 0;
  switch (item.itemCategory.toLowerCase()) {
    case "medicine":
    case "food":
      tax = 5;
      break;
    case "clothes":
      if (item.price <= 1000) {
        tax = 5;
      } else {
        tax = 12;
      }
      break;
    case "music":
      tax = 3;
      break;
    case "book":
      tax = 0;
      break;
    case "imported":
      tax = 18;
      break;

    default:
      break;
  }

  let totalTax = (tax * item.price) / 100;

  return {
    totalTax: totalTax,
    taxRate: tax,
  };
};

app.post("/getBill", (req, res) => {
  let finalBill = 0;
  let finalItems = [];
  let total = 0;
  const items = req.body;
  for (let i = 0; i < items.length; i++) {
    let item = items[i];
    let tax = computeTax(item);
    finalBill = (item.price + tax.totalTax) * item.quantity;
    total += finalBill;
    finalItems.push({
      ...item,
      invoiceDate: new Date().toISOString(),
      totalTax: tax.totalTax,
      taxRate: tax.taxRate,
      finalBill: finalBill,
    });
  }
  let finalAfterDiscount = total >= 2000 ? total - (5 * total) / 100 : total;
  res.json({
    finalAfterDiscount: finalAfterDiscount,
    total: total,
    items: finalItems.sort((a, b) => (a.item <= b.item ? -1 : 1)),
  });
});

app.listen(3000, () => {
  console.log("server listening on port 3000");
});
