const db = require('../config/connection');
const { User, Scholarship} = require('../models');
const userSeeds = require('./userSeeds.json');
const scholarshipSeeds = require('./scholarshipSeed.json')


db.once('open', async () => {
  try {
    await User.deleteMany({});
    await Scholarship.deleteMany({});

    await User.create(userSeeds);
    await Scholarship.create(scholarshipSeeds)

  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
