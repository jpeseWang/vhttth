import mongoose from 'mongoose'

const { Schema } = mongoose

const forumSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    imgSrc: {
      type: String,
    },
    date: {
      type: String,
      required: true,
    },
    datetime: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    authorAvatar: {
      type: String,
    },
    authorID: {
      type: String,
    },
    react: [{ userID: { String } }],
    comment: [
      {
        name: {
          type: String,
        },
        id: {
          type: String,
        },
        avatar: {
          type: String,
        },
        content: {
          type: String,
        },
        date: {
          type: String,
        },
      },
      { timestamps: true },
    ],
  },
  { timestamps: true },
)

//If the Post collection does not exist create a new one.
export default mongoose.models.Forum || mongoose.model('Forum', forumSchema)
