const { MongoClient } = require("mongodb");
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    await initializeSampleData();
    await showMenu();
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}
run();

const dbName = "Test";
const collectionProduct = "products";
const collectionOrder = "orders";
const collectionCustomer = "customers";

const sampleProducts = [
  {
    id: 1,
    name: "Laptop Dell",
    price: 1000,
    quantity: 10,
    category: "Laptop",
    created_at: new Date(),
  },
  {
    id: 2,
    name: "Gskill 16GB",
    price: 700,
    quantity: 20,
    category: "RAM",
    created_at: new Date(),
  },
  {
    id: 3,
    name: "RTX 3090",
    price: 1500,
    quantity: 15,
    category: "GPU",
    created_at: new Date(),
  },
  {
    id: 4,
    name: "Intel i7",
    price: 300,
    quantity: 25,
    category: "CPU",
    created_at: new Date(),
  },
  {
    id: 5,
    name: "Samsung SSD 1TB",
    price: 120,
    quantity: 50,
    category: "Storage",
    created_at: new Date(),
  },
  {
    id: 6,
    name: "Corsair PSU 750W",
    price: 90,
    quantity: 40,
    category: "Power Supply",
    created_at: new Date(),
  },
  {
    id: 7,
    name: "Asus Motherboard",
    price: 200,
    quantity: 30,
    category: "Motherboard",
    created_at: new Date(),
  },
  {
    id: 8,
    name: "Cooler Master Case",
    price: 150,
    quantity: 15,
    category: "Case",
    created_at: new Date(),
  },
  {
    id: 9,
    name: "Logitech Mouse",
    price: 50,
    quantity: 100,
    category: "Accessories",
    created_at: new Date(),
  },
  {
    id: 10,
    name: "HP Monitor 24 inch",
    price: 180,
    quantity: 20,
    category: "Monitor",
    created_at: new Date(),
  },
];


const sampleCustomers = Array.from({ length: 60 }, (_, i) => ({
id: i + 1,
name: `Customer ${i + 1}`,
address: `Address ${i + 1}`,
phone: `12345${i.toString().padStart(5, "0")}`,
email: `customer${i + 1}@gmail.com`,
created_at: new Date(),
}));


async function sampleOrders(batchSize = 10000, totalOrders = 1000000) {
const db = client.db(dbName);
const ordersCollection = db.collection(collectionOrder);
const customers = sampleCustomers.map((c) => c.id);
const products = sampleProducts.map((p) => p.id);

for (let i = 0; i < totalOrders; i += batchSize) {
  const orders = Array.from({ length: batchSize }, () => ({
    customer_id: customers[Math.floor(Math.random() * customers.length)],
    product_id: products[Math.floor(Math.random() * products.length)],
    status: ["processing", "completed", "pending"][Math.floor(Math.random() * 3)],
    quantity: Math.floor(Math.random() * 10) + 1,
    created_at: new Date(),
  }));

  try {
    await ordersCollection.insertMany(orders);
    console.log(`Inserted order batch ${i / batchSize + 1}`);
  } catch (error) {
    console.error("Error inserting orders:", error.message);
    break;
  }
}
}

async function initializeSampleData() {
  const db = client.db(dbName);
  const collection_product = db.collection(collectionProduct);
  const collection_order = db.collection(collectionOrder);
  const collection_customer = db.collection(collectionCustomer);

  const existingProducts = await collection_product.countDocuments();
  if (existingProducts === 0) {
    console.log(
      "There aren't any data in products, adding products automaticly"
    );
    await collection_product.insertMany(sampleProducts);
  } else {
    console.log("There is an existing product data");
  }

  const existingCustomers = await collection_customer.countDocuments();
  if (existingCustomers === 0) {
    console.log(
      "There aren't any data in customers, adding customers automaticly"
    );
    await collection_customer.insertMany(sampleCustomers);
  } else {
    console.log("There is an existing customer data");
  }

  const existingOrders = await collection_order.countDocuments();
  if (existingOrders === 0) {
    console.log("There aren't any data in orders, adding orders automaticly");
    await sampleOrders();
  } else {
    console.log("There is an existing order data");
  }
}

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function showMenu() {
  console.log("\n=== Menu ===");
  console.log("\n=== Product Management System ===");
  console.log("1. View all products");
  console.log("2. Add a new product");
  console.log("3. Update product information (price, quantity, configuration)");
  console.log("4. Delete a product");
  console.log("5. View all orders");
  console.log("6. Add new order");
  console.log("7. Completed order");
  console.log("8. Revenue statistics by product");
  console.log("9. Revenue statistics by date");
  console.log("10. Create product view");
  console.log("11. Exit");
  rl.question("Choose an option: ", handleOption);
}

async function handleOption(option) {
  switch (option.trim()) {
    case "1":
      await viewProducts();
      break;
    case "2":
      await addProduct();
      break;
    case "3":
      await updateProduct();
      break;
    case "4":
      await deleteProduct();
      break;
    case "5":
      await viewAllOrders();
      break;
    case "6":
      await addNewOrders();
      break;
    case "7":
      await completeOrder();
      break;
    case "8":
      await viewRevenueProduct();
      break;
    case "9":
      await viewRevenueByDate();
      break;
    case "10":
      await createOrderViews();
      break;
    case "11":
      await createIndexOrders();
      break;
    case "12":
      rl.close();
      await client.close();
      process.exit(0);
    default:
      console.log("Invalid option. Please try again.");
      showMenu();
      break;
  }
}

async function viewProducts() {
  const db = client.db(dbName);
  const products = await db.collection(collectionProduct).find().toArray();
  console.log("\n=== Product List ===");
  if (products.length === 0) {
    console.log("No products available.");
  } else {
    products.forEach((product) => {
      console.log(
        `${product.id}. ${product.name} - Price: $${product.price}, Quantity: ${product.quantity}, Category: ${product.category}`
      );
    });
  }
  showMenu();
}

async function addProduct() {
  rl.question("Enter product name: ", async (name) => {
    rl.question("Enter price: ", async (priceInput) => {
      const price = parseFloat(priceInput);
      rl.question("Enter quantity: ", async (quantityInput) => {
        const quantity = parseInt(quantityInput, 10);
        rl.question("Enter category: ", async (category) => {
          const db = client.db(dbName);
          const maxId = await db
            .collection(collectionProduct)
            .find()
            .sort({ id: -1 })
            .limit(1)
            .toArray();
          const newId = maxId.length > 0 ? maxId[0].id + 1 : 1;
          const newProduct = {
            id: newId,
            name,
            price,
            quantity,
            category,
            created_at: new Date(),
          };
          await db.collection(collectionProduct).insertOne(newProduct);
          console.log("Product added successfully.");
          showMenu();
        });
      });
    });
  });
}

async function updateProduct() {
  rl.question("Enter product ID to update: ", async (id) => {
    const productId = parseInt(id.trim());
    const db = client.db(dbName);
    const product = await db
      .collection(collectionProduct)
      .findOne({ id: productId });
    if (!product) {
      console.log("Product not found.");
      showMenu();
    } else {
      rl.question("Enter new price: ", async (priceInput) => {
        const price =
          priceInput.trim() !== "" ? parseFloat(priceInput) : product.price;
        rl.question("Enter new quantity: ", async (quantityInput) => {
          const quantity =
            quantityInput.trim() !== ""
              ? parseInt(quantityInput, 10)
              : product.quantity;
          rl.question("Enter new category: ", async (category) => {
            const updatedCategory =
              category.trim() !== "" ? category : product.category;
            await db.collection(collectionProduct).updateOne(
              { id: productId },
              {
                $set: {
                  price,
                  quantity,
                  category: updatedCategory,
                },
              }
            );
            console.log("Product updated successfully.");
            showMenu();
          });
        });
      });
    }
  });
}

async function deleteProduct() {
  rl.question("Enter product ID to delete: ", async (id) => {
    const productId = parseInt(id.trim());
    const db = client.db(dbName);
    const result = await db
      .collection(collectionProduct)
      .deleteOne({ id: productId });
    if (result.deletedCount === 0) {
      console.log("Product not found.");
    } else {
      console.log("Product deleted successfully.");
    }
    showMenu();
  });
}

async function viewAllOrders() {
  const db = client.db(dbName);
  const ordersCollection = db.collection(collectionOrder);

  try {
    const orders = await ordersCollection.find().toArray();

    console.log("\n=== All Orders ===");
    if (orders.length === 0) {
      console.log("No orders found.");
    } else {
      orders.forEach((order) => {
        console.log(
          `Order ID: ${order.id}, Customer ID: ${order.customer_id}, Product ID: ${order.product_id}, Quantity: ${order.quantity}, Status: ${order.status}, Date: ${order.created_at}`
        );
      });
    }
  } catch (error) {
    console.error("Error retrieving orders:", error);
  }

  showMenu();
}

async function addNewOrders() {
  rl.question("Enter customer ID: ", async (customerInput) => {
    const customerId = parseInt(customerInput.trim(), 10);
    if (isNaN(customerId)) {
      console.log("Invalid ID");
      return showMenu();
    }

    rl.question("Enter product ID: ", async (productInput) => {
      const productId = parseInt(productInput.trim(), 10);
      if (isNaN(productId)) {
        console.log("Invalid ID");
        return showMenu();
      }

      rl.question("Enter quantity: ", async (quantityInput) => {
        const quantity = parseInt(quantityInput.trim(), 10);
        if (isNaN(quantity) || quantity <= 0) {
          console.log("Invalid quantity.");
          return showMenu();
        }

        const db = client.db(dbName);
        const ordersCollection = db.collection(collectionOrder);
        const productsCollection = db.collection(collectionProduct);
        const customersCollection = db.collection(collectionCustomer);

        const customer = await customersCollection.findOne({ id: customerId });
        if (!customer) {
          console.log("Customer not found");
          return showMenu();
        }
        const product = await productsCollection.findOne({ id: productId });
        if (!product) {
          console.log("Product not found");
          return showMenu();
        }

        const maxOrderId = await ordersCollection
          .find()
          .sort({ id: -1 })
          .limit(1)
          .toArray();
        const newOrderId = maxOrderId.length > 0 ? maxOrderId[0].id + 1 : 1;

        const newOrder = {
          id: newOrderId,
          customer_id: customerId,
          product_id: productId,
          quantity,
          status: "processing",
          created_at: new Date(),
        };

        await ordersCollection.insertOne(newOrder);

        console.log("Order added successfully");
        showMenu();
      });
    });
  });
}

async function completeOrder() {
  const db = client.db(dbName);
  const ordersCollection = db.collection(collectionOrder);

  rl.question(
    "Enter the ID of the order to completed: ",
    async (orderIdInput) => {
      const orderId = parseInt(orderIdInput.trim());
      try {
        const result = await ordersCollection.updateOne(
          { id: orderId },
          { $set: { status: "completed" } }
        );

        if (result.matchedCount === 0) {
          console.log("Order not found.");
        } else {
          console.log("Order marked as completed.");
        }
      } catch (error) {
        console.error("Error updating the order:", error);
      }
      showMenu();
    }
  );
}

async function viewRevenueProduct() {
  const db = client.db(dbName);
  const ordersCollection = db.collection(collectionOrder);
  const productsCollection = db.collection(collectionProduct);

  rl.question(
    "Enter the Product ID to calculate revenue: ",
    async (productIdInput) => {
      const productId = parseInt(productIdInput.trim());
      try {
        const product = await productsCollection.findOne({ id: productId });
        if (!product) {
          console.log("Product not found.");
          return showMenu();
        }

        const orders = await ordersCollection
          .aggregate([
            { $match: { product_id: productId, status: "completed" } },
            {
              $group: {
                _id: "$product_id",
                totalRevenue: {
                  $sum: { $multiply: ["$quantity", product.price] },
                },
              },
            },
          ])
          .toArray();

        if (orders.length === 0) {
          console.log("No completed orders for this product.");
        } else {
          console.log(
            `Total revenue for product ID ${productId}: $${orders[0].totalRevenue.toFixed(
              2
            )}`
          );
        }
      } catch (error) {
        console.error("Error calculating revenue:", error);
      }
      showMenu();
    }
  );
}

async function viewRevenueByDate() {
  const db = client.db(dbName);

  const pipeline = [
    {
      $lookup: {
        from: collectionProduct,
        localField: "product_id",
        foreignField: "id",
        as: "productDetails",
      },
    },
    { $unwind: "$productDetails" },
    {
      $group: {
        _id: {
          year: { $year: "$created_at" },
          month: { $month: "$created_at" },
          day: { $dayOfMonth: "$created_at" },
        },
        totalRevenue: {
          $sum: {
            $multiply: ["$quantity", "$productDetails.price"],
          },
        },
      },
    },
    { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 } },
  ];

  const statistics = await db
    .collection(collectionOrder)
    .aggregate(pipeline)
    .toArray();

  console.log("\n=== Revenue Statistics ===");
  statistics.forEach((stat) => {
    console.log(
      `Date: ${stat._id.year}-${stat._id.month}-${
        stat._id.day
      }, Total Revenue: $${stat.totalRevenue.toFixed(2)}`
    );
  });
  showMenu();
}

async function createOrderViews() {
  await db.createCollection("OrderDetails", {
    viewOn: "orders",
    pipeline: [
      {
        $lookup: {
          from: "customers",
          localField: "customer_id",
          foreignField: "id",
          as: "customer",
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "product_id",
          foreignField: "id",
          as: "product",
        },
      },
      {
        $unwind: "$customer",
      },
      {
        $unwind: "$product",
      },
      {
        $project: {
          _id: 0,
          order_id: "$id",
          customer_name: "$customer.name",
          product_name: "$product.name",
          quantity: 1,
          status: 1,
          order_date: "$created_at",
        },
      },
    ],
  });
  console.log("OrderDetails view created");
  showViewData();
  showMenu();
}

async function showViewData() {
  try {
    const orderDetails = await db.collection("OrderDetails").find().toArray();

    console.log("Order Details:");
    console.table(orderDetails);
  } catch (error) {
    console.error(
      "Error retrieving data from OrderDetails view:",
      error.message
    );
  }
}

async function createIndexOrders() {
  try {
    await db
      .collection("orders")
      .createIndex(
        { customer_id: 1, product_id: 1 },
        { name: "customer_product_index" }
      );

    console.time("Index Execution Time");
    const orders = await db.collection("orders").find().toArray();
    console.timeEnd("Index Execution Time");

    console.log("Orders:");
    console.table(orders);
  } catch (error) {
    console.error("Error creating index or fetching orders:", error.message);
  }
}
