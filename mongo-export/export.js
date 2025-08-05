// export.js

// ⛳ STEP 1: Load .env from parent directory (pos/.env)
require("dotenv").config({ path: "../.env" });

const { MongoClient } = require("mongodb");
const fs = require("fs");

// ⛳ STEP 2: Read the connection URI from .env
const uri = process.env.MONGODB_URI;

// Optional: Confirm URI is loaded (remove this after testing)
console.log("✅ URI loaded from .env:", uri);

const client = new MongoClient(uri);

// ⛳ STEP 3: Function to export collection
async function exportCollectionToJSON(collectionName) {
  try {
    await client.connect();
    const db = client.db("posDB_development");
    const collection = db.collection(collectionName);
    const data = await collection.find({}).toArray();

    fs.writeFileSync(`${collectionName}.json`, JSON.stringify(data, null, 2));
    console.log(`✅ Exported ${collectionName}.json`);
  } catch (err) {
    console.error("❌ Error:", err);
  } finally {
    await client.close();
  }
}

// ⛳ STEP 4: List of collections to export
const collections = ["orders", "products", "users", "customers", "settings", "suppliers"];

// ⛳ STEP 5: Loop and export
(async () => {
  for (const col of collections) {
    await exportCollectionToJSON(col);
  }
})();
