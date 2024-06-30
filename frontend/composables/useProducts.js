import products from "@/data/products.json";
import makes from "@/data/makes.json";
import listings from "@/data/listings.json";

export const useProducts = () => {
  return {
    products,
    makes,
    listings,
  };
};
