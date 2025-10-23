import "./App.css";
import { useState } from "react";
import UploadBox from "./components/UploadBox";
import toast, { Toaster } from "react-hot-toast";
import Result from "./components/Result";
import Header from "./components/Header";
import { AnimatePresence, motion } from "framer-motion";

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [resultResponse, setResultResponse] = useState("");
  const [accuracyResponse, setAccuracyResponse] = useState(0);

  const handleImageSelect = (file) => {
    setSelectedImage(file);
  };

  const handleUpload = async () => {
    if (!selectedImage) {
      toast.error("Select an image first.");
      return;
    }

    setIsUploading(true);
    toast.loading("Uploading... Please wait.");

    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      const formData = new FormData();
      formData.append("image", selectedImage);


      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        body: formData,
      });
      
      if (!response.ok) throw new Error("Upload failed");
      
      const data = await response.json();
      const [prediction, accuracy] = data.split(" ");
      prediction === "куче" ? setResultResponse("dog") : setResultResponse("cat");
      setAccuracyResponse(accuracy);
      setResultResponse(data);

      const simulatedResponse = "cat";
      const simulatedAccuracy = 1.234;
      setResultResponse(simulatedResponse);
      setAccuracyResponse(simulatedAccuracy);

      toast.dismiss();
      toast.success("Image uploaded successfully!");
      setIsUploaded(true);
    } catch (err) {
      toast.dismiss();
      toast.error(`Upload failed: ${err.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRestart = () => {
    setSelectedImage(null);
    setIsUploading(false);
    setIsUploaded(false);
    setResultResponse("");
  };

  const getButtonLabel = () => {
    if (isUploading) return "Uploading...";
    if (isUploaded) return "TRY AGAIN";
    return "TEST";
  };

  const handleButtonClick = () => {
    if (isUploading) return;
    if (isUploaded) {
      handleRestart();
    } else {
      handleUpload();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center pt-4 gap-10">
      <Header />

      <div className="h-76 w-120 mt-10 m-2 flex justify-center">
        <AnimatePresence mode="wait">
          {!isUploaded ? (
            <motion.div
              key="upload"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="w-full flex justify-center"
            >
              <UploadBox
                isUploading={isUploading}
                onImageSelect={handleImageSelect}
              />
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="w-full flex justify-center"
            >
              <Result resultResponse={resultResponse} accuracyResponse={accuracyResponse}/>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div
        onClick={handleButtonClick}
        className={`mt-6 py-4 px-10 bg-white/90 text-[#222222] font-medium text-lg rounded-xl shadow-md transition-all duration-400 cursor-pointer ${
          isUploading
            ? "opacity-60 cursor-not-allowed"
            : "hover:scale-103 active:scale-95"
        }`}
      >
        {getButtonLabel()}
      </div>
      <div className="absolute bottom-1 right-1 text-xs text-white/60 text-right">
        HPE Sofia Hub Data and AI team for Junior Achievement Manager for a Day,
        2025
      </div>
      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  );
}

export default App;
