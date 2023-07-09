// import DownloadPDFButton from "./components/DownloadPDFButton";
import { Header } from "./components/Header";
import { DataProvider } from "./context/ProductsProvider";

function App() {
  return (
    <>
      <DataProvider>
        {/* <InvoicePDF /> */}
        <div className="w-screen h-screen flex justify-center items-center">
          <div className="w-full max-w-5xl px-6 flex flex-col gap-16">
            <Header />

            {/* <DownloadPDFButton /> */}
            {/* <UploadExcel /> */}
          </div>
        </div>
      </DataProvider>
    </>
  );
}

export default App;
