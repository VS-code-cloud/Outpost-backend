import mongoose from 'mongoose';
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;
const postSchema = new Schema(
  {
    title: { type: String, required: true },
    message: { type: String, required: true },
    name: { type: String, required: true },

    tags: [String],
    creator: String,
    selectedFile: String,

    likes: { type: [String], default: [] },
    comments: { type: [String], default: [] },
    location: String,
    createdAt: {
      type: Date,
      default: new Date(),
    },
    amount: { type: Number },
  },
  { timeStamps: true }
);

var PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;
