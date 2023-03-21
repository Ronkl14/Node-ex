import mongoose from "mongoose";
import slugify from "slugify";

const RestaurantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
      unique: [true, "Name already exists"],
      maxlength: [50, "Name too long"],
    },
    slug: String,
    address: {
      city: {
        type: String,
        enum: ["Tel Aviv", "Beersheva", "Afula"],
      },
      street: {
        type: String,
      },
      coordinates: {
        type: [Number],
        index: "2dsphere",
      },
    },
    cuisine: {
      type: [String],
      enum: ["Asian", "Italian", "Israeli"],
    },
    kosher: {
      type: Boolean,
      default: false,
    },
    reviews: {
      type: [
        {
          date: { type: Date, required: true, default: Date.now },
          score: { type: Number, required: true },
        },
      ],
      required: true,
      minItems: 3,
    },
  },
  {
    toJSON: {
      virtuals: true,
      // Hide the _id and the __v field from the frontend
      transform: function (_, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
    toObject: {
      virtuals: true,
      // Hide the _id and the __v field from the frontend
      transform: function (_, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

RestaurantSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

export default mongoose.model("Restaurant", RestaurantSchema);
