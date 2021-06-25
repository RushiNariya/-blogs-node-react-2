const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
  blogName: Schema.Types.String,
  stack: Schema.Types.String,
  description: Schema.Types.String,
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Creator',
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Creator',
    },
  ],
  comments: [
    {
      creatorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Creator',
      },
      comment: Schema.Types.String,
    },
  ],
  image: Schema.Types.String,
});

module.exports = mongoose.model('Blog', blogSchema);
