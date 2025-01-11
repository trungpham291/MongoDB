// const { MongoClient }  = require('mongodb');
// const uri = "mongodb://localhost:27017"; 
// const client = new MongoClient(uri); 

// async function tesConnection(uri) {
//     try{
//         await client.connect();
//         console.log("Connected successfully to MongoDB");
//     } catch(err){
//         console.error("Connection failed", err);
//     }finally {
//         await client.close();
//     }
// }

// tesConnection();


const { MongoClient } = require('mongodb');
const readline = require('readline');

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);
const dbName = "todoDB";
const collectionName = "tasks";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let nextId = 1;

const sampleTasks = [
    { id: nextId++, description: "Hoàn thành báo cáo công việc", done: false },
    { id: nextId++, description: "Lên kế hoạch họp nhóm", done: false },
    { id: nextId++, description: "Dọn dẹp nhà cửa", done: true },
    { id: nextId++, description: "Đi mua sắm đồ ăn", done: false },
    { id: nextId++, description: "Tập thể dục buổi sáng", done: true },
    { id: nextId++, description: "Đọc sách về lập trình", done: false },
    { id: nextId++, description: "Chuẩn bị tài liệu thuyết trình", done: true },
    { id: nextId++, description: "Học thêm một kỹ năng mới", done: false },
    { id: nextId++, description: "Gọi điện cho gia đình", done: true },
    { id: nextId++, description: "Đi khám sức khỏe định kỳ", done: false },
];

async function initializeSampleData() {
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const existingTasks = await collection.countDocuments();

    if (existingTasks === 0) {
        console.log("Không có dữ liệu, khởi tạo 10 công việc mẫu...");
        await collection.insertMany(sampleTasks);
    } else {
        console.log("Dữ liệu đã tồn tại.");
    }
}

async function showMenu() {
    console.log("\n=== To-Do List ===");
    console.log("1. Xem tất cả công việc");
    console.log("2. Thêm công việc mới");
    console.log("3. Cập nhật công việc");
    console.log("4. Xóa công việc");
    console.log("5. Thoát");

    rl.question("Chọn một tùy chọn: ", handleOption);
}

async function handleOption(option) {
    switch (option.trim()) {
        case '1':
            await viewTasks();
            break;
        case '2':
            await addTask();
            break;
        case '3':
            await updateTask();
            break;
        case '4':
            await deleteTask();
            break;
        case '5':
            console.log("Thoát chương trình. Tạm biệt!");
            rl.close();
            await client.close();
            process.exit(0);
        default:
            console.log("Lựa chọn không hợp lệ. Vui lòng thử lại.");
    }
    showMenu();
}

async function viewTasks() {
    const db = client.db(dbName);
    const tasks = await db.collection(collectionName).find().toArray();
    console.log("\n=== Danh sách công việc ===");
    if (tasks.length === 0) {
        console.log("Không có công việc nào.");
    } else {
        tasks.forEach(task => {
            console.log(`ID: ${task.id} ${task.done ? "[X]" : "[ ]"} ${task.description}`);
        });
    }
}

async function addTask() {
    rl.question("Nhập mô tả công việc: ", async (description) => {
        const db = client.db(dbName);
        const newTask = { id: nextId++, description, done: false };
        await db.collection(collectionName).insertOne(newTask);
        console.log("Công việc đã được thêm.");
        showMenu();
    });
}

async function updateTask() {
    rl.question("Nhập ID công việc cần cập nhật: ", async (id) => {
        const taskId = parseInt(id.trim());
        const db = client.db(dbName);
        const task = await db.collection(collectionName).findOne({ id: taskId });
        if (!task) {
            console.log("Không tìm thấy công việc.");
        } else {
            rl.question("Công việc đã hoàn thành chưa? (yes/no): ", async (done) => {
                const isDone = done.trim().toLowerCase() === 'yes';
                await db.collection(collectionName).updateOne({ id: taskId }, { $set: { done: isDone } });
                console.log("Công việc đã được cập nhật.");
                showMenu();
            });
        }
    });
}

async function deleteTask() {
    rl.question("Nhập ID công việc cần xóa: ", async (id) => {
        const taskId = parseInt(id.trim());
        const db = client.db(dbName);
        const result = await db.collection(collectionName).deleteOne({ id: taskId });
        if (result.deletedCount === 0) {
            console.log("Không tìm thấy công việc.");
        } else {
            console.log("Công việc đã được xóa.");
        }
        showMenu();
    });
}

async function main() {
    try {
        await client.connect();
        console.log("Kết nối đến MongoDB thành công!");
        await initializeSampleData();
        showMenu();
    } catch (err) {
        console.error("Lỗi khi kết nối MongoDB:", err.message);
        rl.close();
        process.exit(1);
    }
}

main();
