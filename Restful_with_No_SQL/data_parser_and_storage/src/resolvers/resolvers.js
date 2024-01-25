/**
 * Query & Mutation Resolvers
 */

const CodeFile = require('../models/codeFile');
const Category = require('../models/Category');

const resolvers = {
  Query: {
    codeFiles: async () => {
      return await CodeFile.find({});
    },
    codeFile: async (_, { id }) => {
      return await CodeFile.findById(id);
    },
    categories: async () => {
      return await Category.find({}).populate('files');
    },
    category: async (_, { name }) => {
      return await Category.findOne({ name }).populate('files');
    },
  },
  
  Mutation: {
    createCodeFile: async (_, { input, categoryName }) => {
      const codeFile = await CodeFile.create(input);
      const category = await Category.findOne({ name: categoryName });
      category.files.push(codeFile);
      await category.save();
      return codeFile;
    },
    updateCodeFile: async (_, { id, input }) => {
      return await CodeFile.findByIdAndUpdate(id, input, { new: true });
    },
    deleteCodeFile: async (_, { id, categoryName }) => {
      const codeFile = await CodeFile.findByIdAndRemove(id);
      const category = await Category.findOne({ name: categoryName });
      category.files = category.files.filter(file => file._id.toString() !== id);
      await category.save();
      return codeFile;
    },
    createCategory: async (_, { input }) => {
      return await Category.create(input);
    },
  },
};

module.exports = resolvers;

