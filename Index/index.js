use sales
switched to db sales
 db.sales.insertMany([ 
  { 
saleId: 1, product: "Laptop", amount: 1200, region: "North", date: 
new Date("2025-01-10") }, 
  { 
saleId: 2, product: "Phone", amount: 800, region: "South", date: 
new Date("2025-01-11") }, 
  { 
saleId: 3, product: "Tablet", amount: 600, region: "East", date: 
new Date("2025-01-12") }, 
]); 
{
  acknowledged: true,
  insertedIds: {
    '0': ObjectId('6788f2a12cd5b77cb4a42ef5'),
    '1': ObjectId('6788f2a12cd5b77cb4a42ef6'),
    '2': ObjectId('6788f2a12cd5b77cb4a42ef7')
  }
}
db.sales.find({ amount: { $gte: 1000 } 
}).explain("executionStats"); 
{
    prunedSimilarIndexes: false,
    winningPlan: {
      isCached: false,
      stage: 'COLLSCAN',
      filter: {
        amount: {
          '$gte': 1000
        }
      },
      direction: 'forward'
    },
    rejectedPlans: []
  },
  executionStats: {
    executionSuccess: true,
    nReturned: 1,
    executionTimeMillis: 7,
    totalKeysExamined: 0,
    totalDocsExamined: 3,
    executionStages: {
      isCached: false,
      stage: 'COLLSCAN',
      filter: {
        amount: {
          '$gte': 1000
        }
      },
      nReturned: 1,
      executionTimeMillisEstimate: 0,
      works: 4,
      advanced: 1,
      needTime: 2,
      needYield: 0,
      saveState: 0,
      restoreState: 0,
      isEOF: 1,
      direction: 'forward',
      docsExamined: 3
    }
  },
  queryShapeHash: '3715DCB47CF106B03F080CE057AE01F5C83AECFB639B04B52AA7ADEF8A2A72D9',
  command: {
    find: 'sales',
    filter: {
      amount: {
        '$gte': 1000
      }
    },
    '$db': 'sales'
  },
  serverInfo: {
    host: 'DESKTOP-J7I1LEB',
    port: 27017,
    version: '8.0.4',
    gitVersion: 'bc35ab4305d9920d9d0491c1c9ef9b72383d31f9'
  },
  serverParameters: {
    internalQueryFacetBufferSizeBytes: 104857600,
    internalQueryFacetMaxOutputDocSizeBytes: 104857600,
    internalLookupStageIntermediateDocumentMaxSizeBytes: 104857600,
    internalDocumentSourceGroupMaxMemoryBytes: 104857600,
    internalQueryMaxBlockingSortMemoryUsageBytes: 104857600,
    internalQueryProhibitBlockingMergeOnMongoS: 0,
    internalQueryMaxAddToSetBytes: 104857600,
    internalDocumentSourceSetWindowFieldsMaxMemoryBytes: 104857600,
    internalQueryFrameworkControl: 'trySbeRestricted',
    internalQueryPlannerIgnoreIndexWithCollationForRegex: 1
  },
  ok: 1
}
 db.sales.createIndex({ amount: 1 }); 
db.sales.find({ amount: { $gte: 1000 } 
}).explain("executionStats");
{
        isMultiKey: false,
        multiKeyPaths: {
          amount: []
        },
        isUnique: false,
        isSparse: false,
        isPartial: false,
        indexVersion: 2,
        direction: 'forward',
        indexBounds: {
          amount: [
            '[1000, inf.0]'
          ]
        },
        keysExamined: 1,
        seeks: 1,
        dupsTested: 0,
        dupsDropped: 0
      }
    }
  },
  queryShapeHash: '3715DCB47CF106B03F080CE057AE01F5C83AECFB639B04B52AA7ADEF8A2A72D9',
  command: {
    find: 'sales',
    filter: {
      amount: {
        '$gte': 1000
      }
    },
    '$db': 'sales'
  },
  serverInfo: {
    host: 'DESKTOP-J7I1LEB',
    port: 27017,
    version: '8.0.4',
    gitVersion: 'bc35ab4305d9920d9d0491c1c9ef9b72383d31f9'
  },
  serverParameters: {
    internalQueryFacetBufferSizeBytes: 104857600,
    internalQueryFacetMaxOutputDocSizeBytes: 104857600,
    internalLookupStageIntermediateDocumentMaxSizeBytes: 104857600,
    internalDocumentSourceGroupMaxMemoryBytes: 104857600,
    internalQueryMaxBlockingSortMemoryUsageBytes: 104857600,
    internalQueryProhibitBlockingMergeOnMongoS: 0,
    internalQueryMaxAddToSetBytes: 104857600,
    internalDocumentSourceSetWindowFieldsMaxMemoryBytes: 104857600,
    internalQueryFrameworkControl: 'trySbeRestricted',
    internalQueryPlannerIgnoreIndexWithCollationForRegex: 1
  },
  ok: 1
}
 db.testCollection.insertMany([ 
  [
  {
    "name": "User_0",
    "age": 25,
    "email": "user_0@example.com",
    "createdAt": "2025-01-01T00:00:00Z"
  },
  {
    "name": "User_1",
    "age": 30,
    "email": "user_1@example.com",
    "createdAt": "2025-01-02T00:00:00Z"
  },
  {
    "name": "User_2",
    "age": 22,
    "email": "user_2@example.com",
    "createdAt": "2025-01-03T00:00:00Z"
  },
  {
    "name": "User_3",
    "age": 28,
    "email": "user_3@example.com",
    "createdAt": "2025-01-04T00:00:00Z"
  },
  {
    "name": "User_4",
    "age": 35,
    "email": "user_4@example.com",
    "createdAt": "2025-01-05T00:00:00Z"
  },
  {
    "name": "User_5",
    "age": 27,
    "email": "user_5@example.com",
    "createdAt": "2025-01-06T00:00:00Z"
  },
  {
    "name": "User_6",
    "age": 24,
    "email": "user_6@example.com",
    "createdAt": "2025-01-07T00:00:00Z"
  },
  {
    "name": "User_7",
    "age": 29,
    "email": "user_7@example.com",
    "createdAt": "2025-01-08T00:00:00Z"
  },
  {
    "name": "User_8",
    "age": 26,
    "email": "user_8@example.com",
    "createdAt": "2025-01-09T00:00:00Z"
  },
  {
    "name": "User_9",
    "age": 31,
    "email": "user_9@example.com",
    "createdAt": "2025-01-10T00:00:00Z"
  }
]

]); 
{
  acknowledged: true,
  insertedIds: {
    '0': ObjectId('6788f5222cd5b77cb4a42ef8')
  }
}
db.testCollection.insertMany([
  { "name": "User_0", "age": 25, "email": "user_0@example.com", "createdAt": "2025-01-01T00:00:00Z" },
  { "name": "User_1", "age": 30, "email": "user_1@example.com", "createdAt": "2025-01-02T00:00:00Z" },
  { "name": "User_2", "age": 22, "email": "user_2@example.com", "createdAt": "2025-01-03T00:00:00Z" },
  { "name": "User_3", "age": 28, "email": "user_3@example.com", "createdAt": "2025-01-04T00:00:00Z" },
  { "name": "User_4", "age": 35, "email": "user_4@example.com", "createdAt": "2025-01-05T00:00:00Z" },
  { "name": "User_5", "age": 27, "email": "user_5@example.com", "createdAt": "2025-01-06T00:00:00Z" },
  { "name": "User_6", "age": 24, "email": "user_6@example.com", "createdAt": "2025-01-07T00:00:00Z" },
  { "name": "User_7", "age": 29, "email": "user_7@example.com", "createdAt": "2025-01-08T00:00:00Z" },
  { "name": "User_8", "age": 26, "email": "user_8@example.com", "createdAt": "2025-01-09T00:00:00Z" },
  { "name": "User_9", "age": 31, "email": "user_9@example.com", "createdAt": "2025-01-10T00:00:00Z" }
]);
{
  acknowledged: true,
  insertedIds: {
    '0': ObjectId('6788f5852cd5b77cb4a42ef9'),
    '1': ObjectId('6788f5852cd5b77cb4a42efa'),
    '2': ObjectId('6788f5852cd5b77cb4a42efb'),
    '3': ObjectId('6788f5852cd5b77cb4a42efc'),
    '4': ObjectId('6788f5852cd5b77cb4a42efd'),
    '5': ObjectId('6788f5852cd5b77cb4a42efe'),
    '6': ObjectId('6788f5852cd5b77cb4a42eff'),
    '7': ObjectId('6788f5852cd5b77cb4a42f00'),
    '8': ObjectId('6788f5852cd5b77cb4a42f01'),
    '9': ObjectId('6788f5852cd5b77cb4a42f02')
  }
}
 db.places.insertMany([ 
  { 
name: "Park", location: { type: "Point", coordinates: [106.6297, 
10.8231] } }, // TPHCM 
  { 
name: "Mall", location: { type: "Point", coordinates: [106.6652, 
10.7626] } }, // Landmark 81 
  { 
name: "Cafe", location: { type: "Point", coordinates: [106.7009, 
10.7758] } }  // Nhà thờ Đức Bà 
]);
{
  acknowledged: true,
  insertedIds: {
    '0': ObjectId('6788f9f72cd5b77cb4a42f03'),
    '1': ObjectId('6788f9f72cd5b77cb4a42f04'),
    '2': ObjectId('6788f9f72cd5b77cb4a42f05')
  }
}
 db.places.createIndex({ location: "2dsphere" });
location_2dsphere
 db.places.find({ 
location: { 
$near: { 
$geometry: { type: "Point", coordinates: [106.7009, 10.7758] }, 
$maxDistance: 2000 // 2 km 
    } 
  } 
});
{
  _id: ObjectId('6788f9f72cd5b77cb4a42f05'),
  name: 'Cafe',
  location: {
    type: 'Point',
    coordinates: [
      106.7009,
      10.7758
    ]
  }
}
 db.places.find({ 
location: { 
$geoWithin: { 
$geometry: { 
type: "Polygon", 
coordinates: [ 
          [ 
            [106.6, 10.7], 
            [106.7, 10.8], 
            [106.8, 10.7], 
            [106.6, 10.7] // Đóng vòng 
          ] 
        ] 
      } 
    }
 } 
});
{
  _id: ObjectId('6788f9f72cd5b77cb4a42f04'),
  name: 'Mall',
  location: {
    type: 'Point',
    coordinates: [
      106.6652,
      10.7626
    ]
  }
}
{
    _id: ObjectId('6788f9f72cd5b77cb4a42f04'),
    name: 'Mall',
    location: {
      type: 'Point',
      coordinates: [
        106.6652,
        10.7626
      ]
    }
}
{
    _id: ObjectId('6788f9f72cd5b77cb4a42f05'),
    name: 'Cafe',
    location: {
      type: 'Point',
      coordinates: [
        106.7009,
        10.7758
      ]
    }
  }  