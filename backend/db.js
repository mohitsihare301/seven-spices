const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();
const mongoURI="mongodb+srv://gofood:mern12345@cluster0.olsw4jt.mongodb.net/gofoodmern?retryWrites=true&w=majority"
const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB");
    const foodCollection= await mongoose.connection.db.collection("food_items");
    const foodItems = await foodCollection.find({}).toArray();
    global.food_items = foodItems;
   
    const categoryCollection= await mongoose.connection.db.collection("food_Category");
    const foodCategory= await categoryCollection.find({}).toArray();
    global.food_category = foodCategory;
    
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

module.exports = connectToMongo;












