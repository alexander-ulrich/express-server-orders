import mongoose from "mongoose";

try {
  await mongoose.connect(process.env.MONGODB_URI!, {
    dbName: "orders",
  });
  console.log("\x1b[35mMongoDB connected via Mongoose\x1b[0m");
} catch (error) {
  console.error("MongoDB connection error:", error);
  process.exit(1);
}
