const PostModel = require("../database/PostModel.js");
const UserModel = require("../database/UserModel.js");

const resolvers = {
  Mutation: {
    authenticateUser: async (_, args) => {
      const data = await UserModel.findOne({ fbID: args.fbID });
      const user = {
        fbID: args.fbID,
        name: args.name,
        picture: args.picture,
        bio: "",
        followers: [],
        following: [],
        email: args.email,
        createdAt: Date.now(),
      };

      if (data === null) {
        UserModel.create(user);
        return { ...user, id: "000000000" };
      } else {
        return UserModel.findOne({ fbID: args.fbID });
      }
    },
    editBio: (_, args) => {
      UserModel.updateOne({ fbID: args.fbID }, { bio: args.bio }).then((res) =>
        console.log(res)
      );
      return UserModel.findOne({ fbID: args.fbID });
    },
    addPost: async (_, args) => {
      const post = {
        fbID: args.fbID,
        text: args.text,
        imageUrl: args.imageUrl,
        comments: [],
        date: Date.now(),
      };
      await PostModel.create(post);

      return { ...post, id: "000000" };
    },
    deletePost: (_, args) => {
      return PostModel.deleteOne({ _id: args.roomId });
    },

    addComment: async (parent, args) => {
      const data = await PostModel.findOne({ _id: args.id });
      const newComment = { comment: args.text, fbID: args.fbId, likes: 0 };
      console.log(data);
      if (data != null) {
        try {
          PostModel.updateOne({ _id: id }, { comments: [newComment] });
          PostModel.findOne({ _id: id });
          return { comment: args.text, fbID: args.fbID };
        } catch (error) {
          PostModel.updateOne(
            { _id: args.id },
            { comments: [...data.comments, newComment] }
          );

          return { comment: args.text, fbID: args.fbID };
        }
      }
    },
  },
  Query: {
    getUser(_, args) {
      return UserModel.findOne({ fbID: args.fbID });
    },
    getUsers() {
      return UserModel.find({});
    },
    getPost(_, args) {
      return PostModel.findOne({ _id: args.id });
    },
    getPosts() {
      return PostModel.find({});
    },
  },
};

module.exports = resolvers;
