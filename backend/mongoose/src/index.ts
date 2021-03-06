import mongoose from 'mongoose';
import User from './model/User';

async function setup() {
  await mongoose.connect(
    `mongodb+srv://admin:${process.env.MONGODB_PASS}@cluster0.pjuci.mongodb.net/mongoose`,
  );
  console.log('Connected to MongoDB');

  try {
    await User.deleteMany();

    const user1 = new User({
      name: 'User 1',
      age: '28',
      email: 'USER1@gmail.com',
      hobbies: ['Programming', 'Reading'],
      address: {
        street: 'This St',
      },
      addressDetails: {
        street: 'This St',
        postalCode: '12345',
        city: 'Gothenburg',
        country: 'Sweden',
      },
    });

    await user1.save();

    let user2 = await User.create({
      name: 'User 2',
      // email: ' ', // This will fail due to the minLength constraint
      // email: 'missing.atsign.gmail.com', // This will fail due to custom validation check
      email: 'User2@gmail.com',
      // age: -28, // This cause the save to fail as age has a min value of 1 in the schema
      age: 28,
      // This will still create an array with a single value since hobbies is an array
      hobbies: 'Cooking',
    });
    console.log('user 2', user2);

    user2.name = 'User 2U';
    // This will not be saved as createdAt is set to immutable
    user2.createdAt = new Date('2020-01-01');
    user2 = await user2.save();

    console.log('User 2 updated', user2);

    // Mongoose queries are not promises, even though they can be used with async/await syntax and have a .then method
    // Calling .then multiple times on the query will actually run the query multiple times
    // https://mongoosejs.com/docs/queries.html
    const updateResult = await User.updateOne(
      {_id: user2.id},
      // {email: 'user2.updatedgmail.com'},
      {email: 'user2.updated@gmail.com'},
      {runValidators: true}, // without runValidators, validations defined in the schema will not run for update
    );
    console.log('Update result', updateResult);

    // the where and conditions can also be chained
    const res = await User.where('age').gt(12).select(['name', 'age']);
    console.log('Where age > 12 result:', res);

    // Set user1's bestFriend to be user2
    await User.findByIdAndUpdate(
      {_id: user1._id},
      {bestFriend: user2._id},
      {runValidators: true},
    );

    let user = await User.findById(user1.id);
    console.log('\nFind User without populate', user);
    if (user?.bestFriend instanceof mongoose.Types.ObjectId) {
      console.log('user.bestFriend is an ObjectId');
    } else {
      console.log('user.bestFriend is a Document');
    }

    user = await User.findById(user1.id).populate('bestFriend');
    console.log('\nFind User with populate', user);
    if (user?.bestFriend instanceof mongoose.Types.ObjectId) {
      console.log('user.bestFriend is an ObjectId');
    } else {
      console.log('user.bestFriend is a Document');
    }

    // Instance method for models
    user1.sayHello();

    await User.create({
      name: 'abdullah',
      email: 'abdullah@gmail.com',
      age: 28,
    });

    const findByNameUser = await User.findByName('abdullah');
    console.log('static findyByName user:', findByNameUser);

    console.log(
      'custom query',
      await User.find().where('age').gt(10).byName('abdullah'),
    );

    console.log('Virtual property', user1.nameEmail);
  } catch (e: unknown) {
    if (e instanceof Error) console.error(e.message);
  }
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
setup();
