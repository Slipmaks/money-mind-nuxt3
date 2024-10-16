import mongoose from "mongoose";

export default async () => {
  if (mongoose.connections.length > 0) {
    console.log("Already connected to MongoDB");
    return;
  }
  try {
    const connectionString = process.env.MONGODB_URI as string;
    console.log(connectionString);

    await mongoose.connect(connectionString, {
      serverApi: {
        version: mongoose.mongo.ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
    const response = await mongoose.connection.db?.command({
      ping: 1,
    });

    console.log("ping", response?.ok);
    console.log("Подключение к MongoDB успешно");
  } catch (error) {
    console.error("Ошибка подключения к MongoDB:", error);
  }
};
