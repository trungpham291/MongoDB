const { MongoClient } = require("mongodb");

async function main() {
    const uri = "mongodb://localhost:27017"; // Replace with your URI if different
    const client = new MongoClient(uri);

    try {
        // Connect to MongoDB
        await client.connect();
        console.log("Connected to MongoDB!");

        const db = client.db("sales");
        const collection = db.collection("testCollection");

        // Clear existing data if any
        await collection.deleteMany({});
        console.log("Collection cleared.");

        // Generate sample data (1 million records)
        console.log("Inserting test data...");
        const bulkData = [];
        for (let i = 0; i < 1000000; i++) {
            bulkData.push({
                name: `User_${i}`,
                age: Math.floor(Math.random() * 100),
                email: `user_${i}@example.com`,
                createdAt: new Date()
            });
        }
        await collection.insertMany(bulkData);
        console.log("Test data inserted.");

        // Query without index
        console.time("Query without index");
        await collection.find({ age: 25 }).toArray();
        console.timeEnd("Query without index");

        // Create index
        console.log("Creating index on 'age' field...");
        await collection.createIndex({ age: 1 });
        console.log("Index created.");

        // Query with index
        console.time("Query with index");
        await collection.find({ age: 25 }).toArray();
        console.timeEnd("Query with index");

        // Check indexes
        const indexes = await collection.indexes();
        console.log("Indexes:", indexes);
    } catch (err) {
        console.error(err);
    } finally {
        // Close connection
        await client.close();
        console.log("Disconnected from MongoDB!");
    }
}

main().catch(console.error);
