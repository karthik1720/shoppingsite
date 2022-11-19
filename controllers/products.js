import express from "express";
import mongoose from "mongoose";
import Products from "../models/productModel.js";

export const addProduct = async (req, res, next) => {
  console.log("called");
  const { title, price, description, image, rate, count, brand, model, stock } =
    req.body;
  try {
    const newProduct = new Products({
      price: price,
      title: title,
      description: description,
      image: image,
      rating: {
        rate: rate,
        count: count,
      },
      stock: stock,
      brand: brand,
      model: model,
    });
    await newProduct.save();
    res.json(newProduct);
  } catch (error) {
    console.log(error);
  }
};

export const getProducts = async (req, res, next) => {
  try {
    const products = await Products.find();
    res.send(products);
  } catch (error) {
    console.log(error);
  }
};

export const getProduct = async (req, res, next) => {
  const id = req.params.id;
  try {
    const product = await Products.findOne({ _id: id });
    res.send(product);
  } catch (error) {}
};

export const deleteProduct = async (req, res, next) => {
  const id = req.params.id;
  try {
    const product = await Products.findByIdAndDelete({ _id: id });
    res.send(product.title);
  } catch (error) {}
};

export const updateProduct = async (req, res, next) => {};

export const viewFeatured = async (req, res, next) => {
  try {
    console.log("Hi");
    const featured = await Products.find().sort({ "rating.rate": -1 }).limit(4);
    console.log(featured);
    res.send(featured);
  } catch (error) {}
};
