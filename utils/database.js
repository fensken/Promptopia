import mongoose from "mongoose";

let isConnected = false; // track connection

export const connectToDB = async () => {
	mongoose.set("strictQuery", true);

	if (isConnected) {
		console.log("MongoDB is already connected");
		return;
	}

	try {
		await mongoose.connect(process.env.MONGODB_URI, {
			dbName: "shared_prompt",
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		isConnected = true;

		console.log("MongoDB is successfully connected");
	} catch (error) {
		console.log(error);
	}
};
