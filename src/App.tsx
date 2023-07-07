// import DownloadPDFButton from "./components/DownloadPDFButton";
import { Header } from "./components/Header";

function App() {
  return (
    <>
      {/* <InvoicePDF /> */}
      <div className="w-screen h-screen flex justify-center items-center">
        <div className="w-full max-w-5xl px-6 flex flex-col gap-16">
          <Header />
          {/* <DownloadPDFButton /> */}
          {/* <UploadExcel /> */}
        </div>
      </div>
    </>
  );
}

export default App;
