// import cartModel from "../models/cartModel";
import User from "../models/userModel.js";
import mongoose from "mongoose";

export const addItems = async (req, res, next) => {
  try {
    const { item, productid, productname } = req.body;
    console.log(productid + "\n" + item);
    let user = await User.findByIdAndUpdate({ _id: req.userid });
    console.log(user);
    let isItemAlreadyThere = user.item.findIndex((i) => i.id === productid);
    console.log(isItemAlreadyThere);
    if (isItemAlreadyThere > -1) {
      user.item[isItemAlreadyThere].count += item;
      await user.save();
      console.log("if");
    } else {
      console.log(productname);
      user.item.push({
        id: productid,
        count: item,
        productname: productname,
      });
      await user.save();
    }

    console.log("updated");
    res.json(user.item);
  } catch (error) {}
};

export const viewItems = async (req, res, next) => {
  try {
    console.log(req.userid);
    const pipeline = [
      {
        $match: {
          _id: mongoose.Types.ObjectId(req.userid),
        },
      },

      {
        $lookup: {
          from: "products",
          localField: "item.productname",
          foreignField: "title",
          as: "result",
        },
      },
      {
        $project: {
          result: {
            _id: 1,
            description: 1,
            rating: 1,
            title: 1,
            image: 1,
            price: 1,
          },
          count: "$item.count",
        },
      },
    ];

    const agg = await User.aggregate(pipeline);
    const finalRes = [];
    console.log(agg[0].result.length);
    for (let i = 0; i < agg[0].result.length; i++) {
      finalRes.push({ count: agg[0].count[i], ...agg[0].result[i] });
    }

    res.json(finalRes);
  } catch (error) {
    res.json({ message: "error" });
  }
};

export const deleteItems = async (req, res, next) => {
  try {
    console.log("called");
    const id = req.params.id;

    let user2 = await User.findByIdAndUpdate(
      { _id: req.userid },
      { $pull: { item: { id: id } } },
      { multi: true }
    );

    await user2.save();
    console.log("done");
    res.send("done");
  } catch (error) {}
};
