import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema.Types;
const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  id: { type: String },
  pic: {
    type: String,
    default:
      'https://res.cloudinary.com/cnq/image/upload/v1586197723/noimage_d4ipmd.png',
  },
  followers: [{ type: ObjectId, ref: 'User' }],
  following: [{ type: ObjectId, ref: 'User' }],
  stripe_account_id: '',
  stripe_seller: {},
  stripeSession: {},
});

export default mongoose.model('User', userSchema);
