import express from "express";
import { MongoClient } from "mongodb";

// ─── Database Configuration ───────────────────────────────────────────────────

/** Name of the MongoDB database to connect to */
const dbName = "school";

/** MongoDB connection URI (localhost, default port) */
const url = "mongodb://localhost:27017";

/** MongoDB client instance used to manage the database connection */
const client = new MongoClient(url);

// ─── Database Connection ──────────────────────────────────────────────────────

/**
 * Establishes a connection to MongoDB and retrieves all student records.
 *
 * @async
 * @function dbConnection
 * @returns {Promise<void>} Resolves when data is fetched and logged successfully.
 * @throws {Error} Throws an error if the MongoDB connection or query fails.
 */
async function dbConnection() {
  // Connect to the MongoDB server
  await client.connect();

  // Select the target database
  const db = client.db(dbName);

  // Access the "students" collection within the database
  const collections = db.collection("students");

  // Fetch all student documents and convert the cursor to an array
  const result = await collections.find().toArray();

  // Log all retrieved student records to the console
  console.log(result);
}

// Invoke the database connection function on server startup
dbConnection();

// ─── Express Server Setup ─────────────────────────────────────────────────────

/** Initialize the Express application */
const app = express();

/**
 * Start the Express server on port 3200.
 * The server listens for incoming HTTP requests.
 */
app.listen(3200);