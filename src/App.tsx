import { collection, getDocs, limit, query } from "firebase/firestore";
import { Header } from "./components/Header";
import { DataProvider } from "./context/ProductsProvider";
import { db } from "./lib/Firebase/firebase";
import { Product } from "./@types/types";

function App() {
  type Order = {
    id: string;
    cardBrand: string;
    customerName: string;
    installmentValue: number;
    numberOfInstallments: number;
    paymentOption: string;
    products: Product[];
    totalPrice: number;
  };

  const fetchOrders = async () => {
    try {
      const ordersCollection = collection(db, "orders");
      const ordersQuery = query(ordersCollection, limit(150));
      const ordersSnapshot = await getDocs(ordersQuery);
      const ordersList: Order[] = ordersSnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          cardBrand: data.cardBrand,
          customerName: data.customerName,
          installmentValue: data.installmentValue,
          numberOfInstallments: data.numberOfInstallments,
          paymentOption: data.paymentOption,
          products: data.products.map((product: any) => ({
            value: product.value,
            label: product.label,
            cashPrice: product.cashPrice,
          })),
          totalPrice: data.totalPrice,
        };
      });
      setOrders(ordersList);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  return (
    <>
      <DataProvider>
        <div className="w-screen h-screen flex justify-center items-center">
          <div className="w-full max-w-5xl px-6 flex flex-col gap-16">
            <Header />
          </div>
        </div>
      </DataProvider>
    </>
  );
}

export default App;
