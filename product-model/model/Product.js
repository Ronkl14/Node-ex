import mongoose from "mongoose";
import slugify from "slugify";

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
      unique: [true, "Name already exists"],
    },
    slug: String,
    category: {
      type: String,
      required: [true, "Category is required"],
    },
    isActive: {
      type: Boolean,
    },
    details: {
      description: {
        type: String,
        required: [true, "Please add a description"],
        minlength: [10, "Description must be at least 10 characters"],
      },
      price: {
        type: Number,
        validate: {
          validator: function (value) {
            return value > 0;
          },
          message: "Price must be greater than 0",
        },
      },
      discount: {
        type: Number,
        default: 0,
      },
      images: {
        type: [String],
        minItems: [2, "Must have 2 images at least"],
      },
      phone: {
        type: String,
        required: [true, "Please add a phone number"],
        validate: {
          validator: function (value) {
            return /^(\+9725|\+972-5|9725|05)[-\s]?\d{8}$/.test(value);
          },
          message: "Please add a valid Israeli phone number",
        },
      },
      dateAdded: {
        type: Date,
        default: Date.now,
      },
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

// Middleware - Create slug from name
ProductSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

export default mongoose.model("Product", ProductSchema);
