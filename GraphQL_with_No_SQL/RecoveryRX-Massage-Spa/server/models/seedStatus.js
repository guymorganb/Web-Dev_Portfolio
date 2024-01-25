import mongoose from 'mongoose';

const seedStatusSchema = new mongoose.Schema({
  seeded: {
    type: Boolean,
    default: false
  }
});

const SeedStatus = mongoose.model('SeedStatus', seedStatusSchema);
export default SeedStatus;