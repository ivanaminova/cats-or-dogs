import React, { useState, useRef } from "react";
import { CloudUpload } from "lucide-react";
import { PacmanLoader } from "react-spinners";

const UploadBox = ({ onImageSelect, isUploading }) => {
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = (file) => {
    if (!file.type.startsWith("image/")) {
      console.error("Only image files are allowed.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target.result);
      if (onImageSelect) onImageSelect(file);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFile(file);
      e.target.value = null;
    }
  };

  return (
    <div
      className={`flex flex-col items-center justify-center w-[96%] h-full border-2 border-[#f7f7f7] rounded-2xl cursor-pointer shadow-lg transition-all duration-500 
    ${
      isDragging || image
        ? "bg-white/80 border-solid"
        : " border-dashed bg-white/40 hover:bg-white/70"
    }
  `}
      onClick={handleClick}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        className="hidden"
        onChange={handleChange}
      />

      {isUploading ? (
        <PacmanLoader size={16} color="#f7f7f7" />
      ) : image ? (
        <img
          src={image}
          alt="Uploaded preview"
          className="object-contain w-48 h-48 rounded-xl"
        />
      ) : (
        <div className="flex flex-col items-center gap-1">
          <CloudUpload size={34} strokeWidth={1.5} />
          <p className="font-medium">Click or drag & drop to upload an image</p>
        </div>
      )}
      {}
    </div>
  );
};

export default UploadBox;
