use ShoppeeFood
switched to db ShoppeeFood
db.users.insertMany([
  { _id: ObjectId(), name: "Alice", email: "alice@example.com", address: "New York", phone: "123456789", registration_date: ISODate("2023-01-01") },
  { _id: ObjectId(), name: "Bob", email: "bob@example.com", address: "Los Angeles", phone: "987654321", registration_date: ISODate("2023-02-01") },
  { _id: ObjectId(), name: "Charlie", email: "charlie@example.com", address: "Chicago", phone: "1122334455", registration_date: ISODate("2023-03-01") },
  { _id: ObjectId(), name: "David", email: "david@example.com", address: "San Francisco", phone: "5566778899", registration_date: ISODate("2023-04-01") },
  { _id: ObjectId(), name: "Eva", email: "eva@example.com", address: "Boston", phone: "9988776655", registration_date: ISODate("2023-05-01") },
  { _id: ObjectId(), name: "Frank", email: "frank@example.com", address: "Seattle", phone: "6677889900", registration_date: ISODate("2023-06-01") },
  { _id: ObjectId(), name: "Grace", email: "grace@example.com", address: "Austin", phone: "4455667788", registration_date: ISODate("2023-07-01") },
  { _id: ObjectId(), name: "Henry", email: "henry@example.com", address: "Houston", phone: "2233445566", registration_date: ISODate("2023-08-01") },
  { _id: ObjectId(), name: "Ivy", email: "ivy@example.com", address: "Phoenix", phone: "8899001122", registration_date: ISODate("2023-09-01") },
  { _id: ObjectId(), name: "Jack", email: "jack@example.com", address: "Miami", phone: "3344556677", registration_date: ISODate("2023-10-01") }
]);
{
  acknowledged: true,
  insertedIds: {
    '0': ObjectId('677fcfe987b48bb58276606a'),
    '1': ObjectId('677fcfe987b48bb58276606b'),
    '2': ObjectId('677fcfe987b48bb58276606c'),
    '3': ObjectId('677fcfe987b48bb58276606d'),
    '4': ObjectId('677fcfe987b48bb58276606e'),
    '5': ObjectId('677fcfe987b48bb58276606f'),
    '6': ObjectId('677fcfe987b48bb582766070'),
    '7': ObjectId('677fcfe987b48bb582766071'),
    '8': ObjectId('677fcfe987b48bb582766072'),
    '9': ObjectId('677fcfe987b48bb582766073')
  }
}
db.menu.insertMany([
  { _id: ObjectId(), item_name: "Pizza", category: "Fast Food", price: 10 },
  { _id: ObjectId(), item_name: "Burger", category: "Fast Food", price: 8 },
  { _id: ObjectId(), item_name: "Pasta", category: "Italian", price: 12 },
  { _id: ObjectId(), item_name: "Salad", category: "Healthy", price: 7 },
  { _id: ObjectId(), item_name: "Sushi", category: "Japanese", price: 15 },
  { _id: ObjectId(), item_name: "Steak", category: "Western", price: 20 },
  { _id: ObjectId(), item_name: "Tacos", category: "Mexican", price: 9 },
  { _id: ObjectId(), item_name: "Pho", category: "Vietnamese", price: 8 },
  { _id: ObjectId(), item_name: "Ramen", category: "Japanese", price: 13 },
  { _id: ObjectId(), item_name: "Sandwich", category: "Fast Food", price: 6 }
]);
{
  acknowledged: true,
  insertedIds: {
    '0': ObjectId('677fcff387b48bb582766074'),
    '1': ObjectId('677fcff387b48bb582766075'),
    '2': ObjectId('677fcff387b48bb582766076'),
    '3': ObjectId('677fcff387b48bb582766077'),
    '4': ObjectId('677fcff387b48bb582766078'),
    '5': ObjectId('677fcff387b48bb582766079'),
    '6': ObjectId('677fcff387b48bb58276607a'),
    '7': ObjectId('677fcff387b48bb58276607b'),
    '8': ObjectId('677fcff387b48bb58276607c'),
    '9': ObjectId('677fcff387b48bb58276607d')
  }
}
db.orders.insertMany([
  { _id: ObjectId(), user_id: ObjectId("..."), order_date: ISODate("2023-10-01"), items: [{ menu_item_id: ObjectId("..."), quantity: 2 }], status: "completed" },
  { _id: ObjectId(), user_id: ObjectId("..."), order_date: ISODate("2023-10-02"), items: [{ menu_item_id: ObjectId("..."), quantity: 1 }], status: "cancelled" },
  { _id: ObjectId(), user_id: ObjectId("..."), order_date: ISODate("2023-10-03"), items: [{ menu_item_id: ObjectId("..."), quantity: 3 }], status: "completed" },
  { _id: ObjectId(), user_id: ObjectId("..."), order_date: ISODate("2023-10-04"), items: [{ menu_item_id: ObjectId("..."), quantity: 2 }], status: "completed" },
  { _id: ObjectId(), user_id: ObjectId("..."), order_date: ISODate("2023-10-05"), items: [{ menu_item_id: ObjectId("..."), quantity: 1 }], status: "cancelled" },
  { _id: ObjectId(), user_id: ObjectId("..."), order_date: ISODate("2023-10-06"), items: [{ menu_item_id: ObjectId("..."), quantity: 5 }], status: "completed" },
  { _id: ObjectId(), user_id: ObjectId("..."), order_date: ISODate("2023-10-07"), items: [{ menu_item_id: ObjectId("..."), quantity: 4 }], status: "completed" },
  { _id: ObjectId(), user_id: ObjectId("..."), order_date: ISODate("2023-10-08"), items: [{ menu_item_id: ObjectId("..."), quantity: 2 }], status: "completed" },
  { _id: ObjectId(), user_id: ObjectId("..."), order_date: ISODate("2023-10-09"), items: [{ menu_item_id: ObjectId("..."), quantity: 3 }], status: "cancelled" },
  { _id: ObjectId(), user_id: ObjectId("..."), order_date: ISODate("2023-10-10"), items: [{ menu_item_id: ObjectId("..."), quantity: 6 }], status: "completed" }
]);
BSONError: input must be a 24 character hex string, 12 byte Uint8Array, or an integer
db.orders.insertMany([
  { _id: ObjectId(), user_id: ObjectId("677fcfe987b48bb58276606a"), order_date: ISODate("2023-10-01"), items: [{ menu_item_id: ObjectId("677fcff387b48bb582766074"), quantity: 2 }], status: "completed" },
  { _id: ObjectId(), user_id: ObjectId("677fcfe987b48bb58276606b"), order_date: ISODate("2023-10-02"), items: [{ menu_item_id: ObjectId("677fcff387b48bb582766075"), quantity: 1 }], status: "cancelled" },
  { _id: ObjectId(), user_id: ObjectId("677fcfe987b48bb58276606c"), order_date: ISODate("2023-10-03"), items: [{ menu_item_id: ObjectId("677fcff387b48bb582766076"), quantity: 3 }], status: "completed" },
  { _id: ObjectId(), user_id: ObjectId("677fcfe987b48bb58276606d"), order_date: ISODate("2023-10-04"), items: [{ menu_item_id: ObjectId("677fcff387b48bb582766077"), quantity: 2 }], status: "completed" },
  { _id: ObjectId(), user_id: ObjectId("677fcfe987b48bb58276606e"), order_date: ISODate("2023-10-05"), items: [{ menu_item_id: ObjectId("677fcff387b48bb582766078"), quantity: 1 }], status: "cancelled" },
  { _id: ObjectId(), user_id: ObjectId("677fcfe987b48bb58276606f"), order_date: ISODate("2023-10-06"), items: [{ menu_item_id: ObjectId("677fcff387b48bb582766079"), quantity: 5 }], status: "completed" },
  { _id: ObjectId(), user_id: ObjectId("677fcfe987b48bb582766070"), order_date: ISODate("2023-10-07"), items: [{ menu_item_id: ObjectId("677fcff387b48bb58276607a"), quantity: 4 }], status: "completed" },
  { _id: ObjectId(), user_id: ObjectId("677fcfe987b48bb582766071"), order_date: ISODate("2023-10-08"), items: [{ menu_item_id: ObjectId("677fcff387b48bb58276607b"), quantity: 2 }], status: "completed" },
  { _id: ObjectId(), user_id: ObjectId("677fcfe987b48bb582766072"), order_date: ISODate("2023-10-09"), items: [{ menu_item_id: ObjectId("677fcff387b48bb58276607c"), quantity: 3 }], status: "cancelled" },
  { _id: ObjectId(), user_id: ObjectId("677fcfe987b48bb582766073"), order_date: ISODate("2023-10-10"), items: [{ menu_item_id: ObjectId("677fcff387b48bb58276607d"), quantity: 6 }], status: "completed" }
]);
{
  acknowledged: true,
  insertedIds: {
    '0': ObjectId('677fd2bc87b48bb58276607f'),
    '1': ObjectId('677fd2bc87b48bb582766080'),
    '2': ObjectId('677fd2bc87b48bb582766081'),
    '3': ObjectId('677fd2bc87b48bb582766082'),
    '4': ObjectId('677fd2bc87b48bb582766083'),
    '5': ObjectId('677fd2bc87b48bb582766084'),
    '6': ObjectId('677fd2bc87b48bb582766085'),
    '7': ObjectId('677fd2bc87b48bb582766086'),
    '8': ObjectId('677fd2bc87b48bb582766087'),
    '9': ObjectId('677fd2bc87b48bb582766088')
  }
}
db.orders.aggregate([
  { $match: { status: "completed" } },
  { $unwind: "$items" },
  {
    $lookup: {
      from: "menu",
      localField: "items.menu_item_id",
      foreignField: "_id",
      as: "menu_info",
    },
  },
  { $unwind: "$menu_info" },
  {
    $group: {
      _id: {
        year: { $year: "$order_date" },
        month: { $month: "$order_date" },
      },
      totalRevenue: {
        $sum: { $multiply: ["$items.quantity", "$menu_info.price"] },
      },
    },
  },
  { $sort: { "_id.year": 1, "_id.month": 1 } },
]);
{
  _id: {
    year: 2023,
    month: 10
  },
  totalRevenue: 258
}
db.orders.aggregate([
  { $unwind: "$items" },
  {
    $group: {
      _id: "$items.menu_item_id",
      totalQuantity: { $sum: "$items.quantity" },
    },
  },
  {
    $lookup: {
      from: "menu",
      localField: "_id",
      foreignField: "_id",
      as: "menu_info",
    },
  },
  { $unwind: "$menu_info" },
  { $sort: { totalQuantity: -1 } },
  { $limit: 1 },
]);
{
  _id: ObjectId('677fcff387b48bb58276607d'),
  totalQuantity: 6,
  menu_info: {
    _id: ObjectId('677fcff387b48bb58276607d'),
    item_name: 'Sandwich',
    category: 'Fast Food',
    price: 6
  }
}
db.orders.aggregate([
  { $match: { status: "completed" } },
  { $unwind: "$items" },
  {
    $lookup: {
      from: "menu",
      localField: "items.menu_item_id",
      foreignField: "_id",
      as: "menu_info",
    },
  },
  { $unwind: "$menu_info" },
  {
    $group: {
      _id: "$user_id",
      totalSpent: { $sum: { $multiply: ["$items.quantity", "$menu_info.price"] } },
    },
  },
  {
    $lookup: {
      from: "users",
      localField: "_id",
      foreignField: "_id",
      as: "user_info",
    },
  },
  { $unwind: "$user_info" },
  { $sort: { totalSpent: -1 } },
  { $limit: 1 },
]);
{
  _id: ObjectId('677fcfe987b48bb58276606f'),
  totalSpent: 100,
  user_info: {
    _id: ObjectId('677fcfe987b48bb58276606f'),
    name: 'Frank',
    email: 'frank@example.com',
    address: 'Seattle',
    phone: '6677889900',
    registration_date: 2023-06-01T00:00:00.000Z
  }
}
db.orders.aggregate([
  { $unwind: "$items" },
  {
    $lookup: {
      from: "menu",
      localField: "items.menu_item_id",
      foreignField: "_id",
      as: "menu_info",
    },
  },
  { $unwind: "$menu_info" },
  {
    $group: {
      _id: "$menu_info.category",
      totalRevenue: {
        $sum: { $multiply: ["$items.quantity", "$menu_info.price"] },
      },
    },
  },
  { $sort: { totalRevenue: -1 } },
]);
{
  _id: 'Western',
  totalRevenue: 100
}
{
  _id: 'Fast Food',
  totalRevenue: 64
}
{
  _id: 'Japanese',
  totalRevenue: 54
}
{
  _id: 'Italian',
  totalRevenue: 36
}
{
  _id: 'Mexican',
  totalRevenue: 36
}
{
  _id: 'Vietnamese',
  totalRevenue: 16
}
{
  _id: 'Healthy',
  totalRevenue: 14
}
db.orders.aggregate([
  { $match: { status: "cancelled" } },
  {
    $group: {
      _id: {
        year: { $year: "$order_date" },
        month: { $month: "$order_date" },
      },
      cancelledCount: { $sum: 1 },
    },
  },
  { $sort: { "_id.year": 1, "_id.month": 1 } },
]);

_id: {
    year: 2023,
    month: 10
  },
  cancelledCount: 3