const { MongoClient } = require('mongodb');

const uri = "mongodb://localhost:27017"; // Thay đổi nếu dùng MongoDB Atlas
const client = new MongoClient(uri);

async function connectToMongoDB() {
    try {
        await client.connect();
        console.log(" Connected to MongoDB");
        return client.db("eShop");
    } catch (e) {
        console.error(" Connection error:", e);
        process.exit(1);
    }
}

//  1. THÊM ĐƠN HÀNG MỚI
async function insertOrders(db) {
    const orderCollection = db.collection("OrderCollection");

    const order = {
        orderid: 1,
        products: [
            { product_id: "quanau", product_name: "quan au", size: "XL", price: 10, quantity: 1 },
            { product_id: "somi", product_name: "ao so mi", size: "XL", price: 10.5, quantity: 2 }
        ],
        total_amount: 31,
        delivery_address: "Hanoi"
    };

    await orderCollection.insertOne(order);
    console.log(" Order inserted!");
}

//  2. CHỈNH SỬA ĐỊA CHỈ GIAO HÀNG THEO ORDERID
async function updateDeliveryAddress(db, orderid, newAddress) {
    const orderCollection = db.collection("OrderCollection");

    await orderCollection.updateOne(
        { orderid: orderid },
        { $set: { delivery_address: newAddress } }
    );

    console.log(` Updated delivery address for order ${orderid}`);
}

//  3. XOÁ ĐƠN HÀNG THEO ORDERID
async function removeOrder(db, orderid) {
    const orderCollection = db.collection("OrderCollection");

    await orderCollection.deleteOne({ orderid: orderid });
    console.log(` Order ${orderid} deleted`);
}

//  4. ĐỌC TẤT CẢ ĐƠN HÀNG
async function readOrders(db) {
    const orderCollection = db.collection("OrderCollection");
    const orders = await orderCollection.find().toArray();

    console.log(" All Orders:");

    orders.forEach(order => {
        const tableData = order.products.map((product, index) => ({
            No: index + 1,
            "Product Name": product.product_name,
            Price: product.price,
            Quantity: product.quantity,
            Total: product.price * product.quantity
        }));

        console.table(tableData);
    });
}


//  5. TÍNH TỔNG TẤT CẢ ĐƠN HÀNG
async function calculateTotalAmount(db) {
    const orderCollection = db.collection("OrderCollection");
    const orders = await orderCollection.find().toArray();

    const total = orders.reduce((sum, order) => sum + order.total_amount, 0);
    console.log(" Total amount of all orders:", total);
}

//  6. ĐẾM SỐ LƯỢNG SẢN PHẨM CÓ product_id = 'somi'
async function countProductSomi(db) {
    const orderCollection = db.collection("OrderCollection");
    const orders = await orderCollection.find().toArray();
    
    let count = 0;
    orders.forEach(order => {
        order.products.forEach(product => {
            if (product.product_id === "somi") {
                count += product.quantity;
            }
        });
    });

    console.log(' Total quantity of product "somi":', count);
}


(async () => {
    const db = await connectToMongoDB();
    
    await insertOrders(db);        // Thêm đơn hàng
    await updateDeliveryAddress(db, 1, "Ho Chi Minh City"); // Cập nhật địa chỉ giao hàng
    await readOrders(db);          // Hiển thị danh sách đơn hàng
    await calculateTotalAmount(db);// Tính tổng tiền
    await countProductSomi(db);    // Đếm số lượng sản phẩm "somi"
    await removeOrder(db, 1);      // Xóa đơn hàng

    await client.close(); // Đóng kết nối MongoDB
    console.log("🔌 Disconnected from MongoDB");
})();
