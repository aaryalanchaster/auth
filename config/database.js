const mongoose = require("mongoose");

exports.connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_ONLINE_URI);
    console.log(`Connected to database`);
  } catch (error) {
    console.log(error.message);
  }
};
