const mongoose = require("mongoose");
const { Schema } = mongoose;

const blogSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        content: {
            type: String,
            required: true,
        },

        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        category: {
            type: String,
            required: true,
        },

        image: {
            type: String, // URL or local path
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.models.Blog || mongoose.model("Blog", blogSchema);
