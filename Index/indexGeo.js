const { MongoClient } = require("mongodb");

async function main() {
  const uri = "mongodb://localhost:27017";
  const client = new MongoClient(uri);
  try {
    await client.connect();
    console.log("Connected to MongoDB!");
    const db = client.db("Location");
    const collection = db.collection("Geo");
    await collection.deleteMany({});
    // Thêm dữ liệu
    const data = [
      {
        name: "Park",
        location: { type: "Point", coordinates: [106.6297, 10.8231] },
      },
      {
        name: "Mall",
        location: { type: "Point", coordinates: [106.6652, 10.7626] },
      },
      {
        name: "Cafe",
        location: { type: "Point", coordinates: [106.7009, 10.7758] },
      },
    ];
    await collection.insertMany(data);
    console.log("Test data inserted.");

    // Tạo index
    await collection.createIndex({ location: "2dsphere" });
    console.log("2dsphere index created.");

    // Tìm địa điểm gần Nhà thờ Ðức Bà trong bán kính 2 km:
    const results = await collection
      .find({
        location: {
          $near: {
            $geometry: { type: "Point", coordinates: [106.7009, 10.7758] },
            $maxDistance: 2000,
          },
        },
      })
      .toArray();
    console.log("Nearby places:", results);

    const Polygon = await collection
      .find({
        location: {
          $geoWithin: {
            $geometry: {
              type: "Polygon",
              coordinates: [
                [
                  [106.6, 10.7],
                  [106.7, 10.8],
                  [106.8, 10.7],
                  [106.6, 10.7],
                ],
              ],
            },
          },
        },
      })
      .toArray();
    console.log("Location inside polygon:", Polygon);
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
    console.log("Disconnected from MongoDB!");
  }
}
main().catch(console.error);
