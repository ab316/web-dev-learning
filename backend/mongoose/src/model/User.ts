import {model, Schema, SchemaTypes, Types} from 'mongoose';

export interface IUser {
  name: string;
  age: number;
  email: string;
  createdAt: Date;
  /* Note that the type comes from Types which is a namespace as it has be used as a type
  We use a union here since Mongoose can populate the field with the actual database.
  Similar to join in SQL databases
   */
  bestFriend: Types.ObjectId | IUser;
  // Use Types.Array for primitive types instead of plain arrays. Use Types.DocumentArray for array of documents
  hobbies: Types.Array<string>;
  address: {
    street: string;
    city: string;
  };
  addressDetails: IAddressDetails;
}

export interface IAddressDetails {
  street: string;
  postalCode: string;
  city: string;
  state: string;
  country: string;
}

const addressSchema = new Schema<IAddressDetails>({
  street: String,
  postalCode: String,
  city: String,
  state: String,
  country: String,
});

// Mongoose will validate, at compile time, if the paths (the fields) exist in the IUser interface
// but not vice-versa. These validations are only run with the new/create/save methods of the Model
// by default
const userSchema = new Schema<IUser>({
  name: String,
  age: {type: Number, min: 1, max: 150},
  email: {
    type: String,
    required: true,
    lowercase: true,
    minlength: 3,
    // Custom validation: See https://mongoosejs.com/docs/validation.html
    validate: {
      message: (props) => `Invalid value provided: ${props.value}`,
      validator: (email: string) => email.trim().includes('@'),
    },
  },
  // Use a function for the default to generate a new date everytime
  createdAt: {type: Date, default: () => new Date(), immutable: true},
  bestFriend: {
    // Note that the value comes from SchemaTypes which is a const as it has be used as a value
    type: SchemaTypes.ObjectId,
    // Tells which Model this ObjectId refers to. Here the bestFriend refers to another User
    ref: 'User',
  },
  hobbies: [String],
  address: {
    street: String,
    city: String,
  },
  addressDetails: addressSchema,
});

export default model<IUser>('User', userSchema);
