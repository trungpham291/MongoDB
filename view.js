use view
switched to db view
 db.products.insertMany([ 
    { 
name: "Laptop", price: 1000 }, 
    { name: "Mouse", price: 20 },
    { name: "Monitor", price: 300 }
]);
{
  acknowledged: true,
  insertedIds: {
    '0': ObjectId('678662cfae01b9077024ff7c'),
    '1': ObjectId('678662cfae01b9077024ff7d'),
    '2': ObjectId('678662cfae01b9077024ff7e')
  }
}
db.createView( 
"expensive_products",  // Tên View 
"products",            
// Collection gô ́c 
    [ 
 { $match: { price: { $gt: 500 } } },
      {$sort: { name: 1 }}
    ] 
);
{ ok: 1 }
 db.createView(
    "monthly_revenue_summary",
    "sales",
    [
        {
            $group: {
                _id: { month: { $month: "$saleDate" }, year: { $year: "$saleDate" } },
                totalRevenue: { $sum: "$amount" }
            }
        },
        {
            $sort: { "_id.year": 1, "_id.month": 1 }
        }
    ]
);
 
{ ok: 1 }
db.getCollectionInfos({ type: "view}) 
SyntaxError: Unterminated string constant. (1:30)

> 1 | db.getCollectionInfos({ type: "view}) 
    |                               ^
db.getCollectionInfos({ type: "view" }); 
[
    {
      name: 'expensive_products',
      type: 'view',
      options: { viewOn: 'products', pipeline: [Array] },
      info: { readOnly: true }
    },
    {
      name: 'monthly_revenue_summary',
      type: 'view',
      options: { viewOn: 'sales', pipeline: [Array] },
      info: { readOnly: true }
    }
  ]