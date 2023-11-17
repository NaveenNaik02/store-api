import { Request, Response } from "express";
import { Query } from "mongoose";
import Product, { ProductDocument } from "../models/product";

type QueryType = {
  featured?: boolean;
  company?: string;
  name?: {
    $regex: string;
    $options: string;
  };
};

type ResultType = {
  name?: string;
  price?: number;
  featured?: boolean;
  rating?: number;
  createdAt?: Date;
  company?: "ikea" | "liddy" | "caressa" | "marcos" | null | undefined;
};

const getAllProductsStatic = async (req: Request, res: Response) => {
  const product = await Product.find({
    featured: true,
  });
  res.status(200).json({ product, nbHits: product.length });
};

const getAllProducts = async (req: Request, res: Response) => {
  const { featured, company, name, sort, fields, numericFilters } = req.query;
  const queryObject: QueryType = {};
  if (featured === "true" || featured === "false") {
    queryObject.featured = featured === "true" ? true : false;
  }
  if (typeof company === "string") {
    queryObject.company = company;
  }
  if (typeof name === "string") {
    queryObject.name = { $regex: name, $options: "i" };
  }
  console.log(numericFilters);
  if (typeof numericFilters === "string") {
    const operatorMap: Record<string, string> = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };
    const regEx = /\b(<|>|>=|=|<|<=)\b/g;
    const filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );
    const options = ["price", "rating"];
    filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        (queryObject as Record<string, any>)[field] = {
          [operator]: Number(value),
        };
      }
    });
  }

  let result: Query<ResultType[], ProductDocument>;

  if (typeof sort === "string") {
    const sortList = sort.split(",").join(" ");
    result = Product.find(queryObject).sort(sortList);
  } else {
    result = Product.find(queryObject).sort("createdAt");
  }

  if (typeof fields === "string") {
    const fieldsList = fields.split(",").join(" ");
    result = result.select(fieldsList);
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const products = await result.skip(skip).limit(limit);
  res.status(200).json({ products, nbHits: products.length });
};

export { getAllProductsStatic, getAllProducts };
