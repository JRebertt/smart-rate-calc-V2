import { useEffect, useState } from "react";
import { Product } from "../@types/types";
import { collection, getDocs, query, limit } from "firebase/firestore";
import { db } from "../lib/firebase/firebase";


export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const productsCollection = collection(db, "products");
      const productsQuery = query(productsCollection, limit(150));
      const productsSnapshot = await getDocs(productsQuery);
      const productsList = productsSnapshot.docs.map((doc) => ({
        value: doc.id,
        label: doc.data().productName,
        cashPrice: doc.data().cashPrice,
      }));
      setProducts(productsList);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  return { products, loading };
}