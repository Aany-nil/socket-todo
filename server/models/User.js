const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
     name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [30, "Name cannot exceed 30 characters"],
    },
    email: 
})