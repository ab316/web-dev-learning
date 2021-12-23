import {
  model,
  Schema,
  SchemaTypes,
  Types,
  Model,
  Document,
  HydratedDocument,
  Query,
} from 'mongoose';

/*
Mongoose Jargon

Document represents a MongoDB document, an single item that is stored inside a collection
Schema defines the structure of this document as well as any constraints and additional instance/static methods
Model is a constructor/static class compiled from the schema. It provides static methods for CRUD
  So it contains methods like findById, find, where, etc...
HydratedDocument is the document object hydrated with the mongoose methods etc. This is the object returned by the Model methods
*/

// Document Interface. Defines the interface for the document that is stored in the db
export interface IUser {
  name: string;
  age: number;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  /* Note that the type comes from Types which is a namespace as it has be used as a type
  We use a union here since Mongoose can populate the field with the actual document.
  Similar to join in SQL databases
   */
  bestFriend: Types.ObjectId | IUser;
  // Use Types.Array for primitive types instead of plain arrays. Use Types.DocumentArray for array of documents
  hobbies: Types.Array<string>;
  address: IAddress;

  // Virtual property
  readonly nameEmail: string;

  // Instance method
  sayHello: () => void;
}

export interface IAddress {
  street: string;
  postalCode: string;
  city: string;
  state: string;
  country: string;
}

// Define interface static methods on the model
export interface IUserStaticMethods {
  findByName: (name: string) => Promise<HydratedDocument<IUser>>;
}

// Define query methods on the model. Query methods are different from static methods in that they
// can be chained
export interface IUserQueryHelpers {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  byName: (name: string) => Query<any, Document<IUser>> & IUserQueryHelpers;
}

// Combines the document interface, static methods and query helpers interfaces to define the complete interface for the model
// This is not needed if there are no static nor query helper functions
export type IUserModel = Model<IUser, IUserQueryHelpers> & IUserStaticMethods;

const addressSchema = new Schema<IAddress>({
  street: String,
  postalCode: String,
  city: String,
  state: String,
  country: String,
});

/*
Schema defines the shape of the document. Just like schema in a relational DB
Mongoose will validate, at compile time, if the paths (the fields) defined in the schema exist in the IUser interface
but not vice-versa. These validations are only run with the new/create/save methods of the Model
by default
*/
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
  // NOTE: Timestamps can be automatically added to documents: https://mongoosejs.com/docs/guide.html#timestamps
  // Use a function for the default to generate a new date everytime
  createdAt: {type: Date, default: () => new Date(), immutable: true},
  updatedAt: {type: Date},
  bestFriend: {
    // Note that the value comes from SchemaTypes which is a const as it has be used as a value
    type: SchemaTypes.ObjectId,
    // Tells which Model this ObjectId refers to. Here the bestFriend refers to another User
    ref: 'User',
  },
  hobbies: [String],
  address: addressSchema,
});

// Virtual property. these are not stored in the db. The can have setter and getter
userSchema.virtual('nameEmail').get(function (this: IUser) {
  return `${this.name} <${this.email}>`;
});

// Instance method on the model. It can be called on each document instance (Hydrated document)
// Need to use a regular function here, not an arrow function, as we want "this" to map to the instance of the model
// on which the method is called
userSchema.methods.sayHello = function () {
  console.log(`Hello! My name is ${this.name}`);
};

// Static method on the model
userSchema.statics.findByName = function (name: string) {
  return this.find({name: new RegExp(name, 'i')});
};

// Custom query
userSchema.query.byName = function (name: string) {
  return this.find({name: new RegExp(name, 'i')});
};

// Mongoose Middleware. This acts as a hook. We can add hooks to pre/post save, validate, remove, etc.
userSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Model is used for reading/write documents in the db
export default model<IUser, IUserModel>('User', userSchema);
