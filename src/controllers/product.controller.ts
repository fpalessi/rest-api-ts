import { Request, Response } from "express";
import {
  CreateProductInput,
  UpdateProductInput,
} from "../schemas/product.schema";
import {
  createProduct,
  deleteProduct,
  findAndUpdateProduct,
  findProduct,
} from "../services/product.service";
import { getProducts } from "../services/user.service";

export const createProductHandler = async (
  req: Request<{}, {}, CreateProductInput["body"]>,
  res: Response
) => {
  const userId = res.locals.user._id;

  const body = req.body;

  const product = await createProduct({ ...body, user: userId });

  return res.send(product);
};

export const updateProductHandler = async (
  req: Request<UpdateProductInput["params"]>,
  res: Response
) => {
  const userId = res.locals.user._id;

  const productId = req.params.productId;
  const update = req.body;

  const product = await findProduct({ productId });

  if (!product) {
    return res.sendStatus(404);
  }

  if (String(product.user) !== userId) {
    return res.sendStatus(403);
  }

  const updatedProduct = await findAndUpdateProduct({ productId }, update, {
    new: true,
  });

  return res.send(updatedProduct);
};

export const getProductHandler = async (
  req: Request<UpdateProductInput["params"]>,
  res: Response
) => {
  const productId = req.params.productId;
  const product = await findProduct({ productId });

  if (!product) {
    return res.status(404);
  }

  return res.send(product);
};

export const getProductsHandler = async (req: Request, res: Response) => {
  try {
    const products = await getProducts();
    console.log(products);

    return res.status(200).json(products);
  } catch (error) {
    console.log(error);
    return res.status(400).send("mal");
  }
};

export const deleteProductHandler = async (
  req: Request<UpdateProductInput["params"]>,
  res: Response
) => {
  const userId = res.locals.user._id;
  const productId = req.params.productId;

  const product = await findProduct({ productId });

  if (!product) {
    return res.sendStatus(404);
  }

  if (String(product.user) !== userId) {
    return res.sendStatus(403);
  }

  await deleteProduct({ productId });

  return res.sendStatus(200);
};
