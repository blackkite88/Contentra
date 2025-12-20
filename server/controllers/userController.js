import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);
let db;

const connectDB = async () => {
  if (!db) {
    await client.connect();
    db = client.db();
  }
  return db;
};

/* =======================
   Get User Creations
======================= */

export const getUserCreations = async (req, res) => {
  try {
    const { userId } = req.auth();
    const db = await connectDB();

    const creations = await db
      .collection("creations")
      .find({ userId })
      .sort({ createdAt: -1 })
      .toArray();

    res.json({ success: true, creations });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

/* =======================
   Get Published Creations
======================= */

export const getPublishedCreations = async (req, res) => {
  try {
    const db = await connectDB();

    const creations = await db
      .collection("creations")
      .find({ publish: true })
      .sort({ createdAt: -1 })
      .toArray();

    res.json({ success: true, creations });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

/* =======================
   Toggle Like Creation
======================= */

export const toggleLikeCreation = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { id } = req.body;

    const db = await connectDB();
    const creation = await db
      .collection("creations")
      .findOne({ _id: new ObjectId(id) });

    if (!creation) {
      return res.json({ success: false, message: "Creation not found" });
    }

    const hasLiked = creation.likes?.includes(userId);

    if (hasLiked) {
      // Unlike
      await db.collection("creations").updateOne(
        { _id: new ObjectId(id) },
        { $pull: { likes: userId } }
      );

      return res.json({ success: true, message: "Creation Unliked" });
    } else {
      // Like
      await db.collection("creations").updateOne(
        { _id: new ObjectId(id) },
        { $addToSet: { likes: userId } } // prevents duplicates
      );

      return res.json({ success: true, message: "Creation Liked" });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
