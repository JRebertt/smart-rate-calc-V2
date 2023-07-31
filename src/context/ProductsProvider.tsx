import React, { createContext, useContext, useState, useEffect } from "react";
import { collection, getDocs, query, limit } from "firebase/firestore";
import { Product } from "../@types/types";
import { db } from "../lib/Firebase/firebase";

type DataContextType = {
  products: Product[];
  loading: boolean;
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};

type DataProviderProps = {
  children: React.ReactNode;
};

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
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
        localStorage.setItem("products", JSON.stringify(productsList));
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    const cachedData = localStorage.getItem("products");
    if (cachedData) {
      setProducts(JSON.parse(cachedData));
    } else {
      fetchProducts();
    }
  }, []);

  const contextValue: DataContextType = {
    products,
    loading,
  };

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
};
