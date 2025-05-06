import Post from "../models/postModel.js";

export const getFeedPosts = async (req, res) => {
  try {
    const posts = await Post.find({})
      .populate("author", "name username profilePicture headline")
      .populate("comments.user", "name profilePicture")
      .sort({ createAt: -1 });

    console.log(posts);
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error in getFeedPosts controller:", error);
    res.status(500).json({ message: "Server error " });
  }
};
// export const getFeedPosts = async (req, res) => {
//   try {
//     const posts = await Post.find({
//       author: { $in: [req.user._id] },
//     })
//       .populate("author", "name username profilePicture headline")
//       .populate("comments.user", "name profilePicture")
//       .sort({ createAt: -1 });

//     console.log(posts);
//     res.status(200).json(posts);
//   } catch (error) {
//     console.error("Error in getFeedPosts controller:", error);
//     res.status(500).json({ message: "Server error " });
//   }
// };

export const createPost = async (req, res) => {
  console.log(req.body);
  try {
    const { content } = req.body;
    let newPost = new Post({
      author: req.user._id,
      content,
    });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    console.error("Error in createPost controller:", error);
    res.status(500).json({ message: "Server error " });
  }
};

export const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user._id;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found " });
    }
    if (post.author.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this post" });
    }
    await Post.findOneAndDelete(postId);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error in delelePost controller:", error);
    res.status(500).json({ message: "Server error " });
  }
};
// export const posts = async (req, res) => {
//   try{

//   const posts = await Post.find();
//   if (!posts ) {
//     return res.status(400).json({ success: false, message: "Posts not found"});
//   }
//   res.status(200).json({ success: true, posts });
//   } catch (error) {
//     res.status(400).json({success:false, message: error.message });
//   }
// }
