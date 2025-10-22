import "./App.css";
import { useState } from "react";
import UploadBox from "./components/UploadBox";
import toast, { Toaster } from "react-hot-toast";
import Result from "./components/Result";

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [resultString, setResultString] = useState("");

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
      const formData = new FormData();
      formData.append("image", selectedImage);

      await new Promise((resolve) => setTimeout(resolve, 3000));

      // const response = await fetch("neshto", {
      //   method: "POST",
      //   body: formData,
      // });
      //
      // if (!response.ok) throw new Error("Upload failed");
      //
      // const data = await response.json();
      // setResultString(data);

      const simulatedResponse = "dog";
      setResultString(simulatedResponse);

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
    setResultString("");
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
      <div className="flex flex-row items-center gap-4">
        <img className="h-10" src="HPE_logo_wht_rev_rgb.png" alt="HPE" />
        <p className="text-4xl text-[#f7f7f7]">+</p>
        <img className="h-20" src="logo.png" alt="Logo" />
      </div>

      <div className="h-68 w-100 mt-10 m-2">
        {isUploaded ? (
          <Result resultString={resultString} />
        ) : (
          <UploadBox isUploading={isUploading} onImageSelect={handleImageSelect} />
        )}
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
