"use client";

import { useState } from "react";
import { Eye, FileText, Trash, Loader2 } from "lucide-react";

export default function DocumentUploader() {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const uploadedFiles = Array.from(event.target.files);
      setFiles((prevFiles) => [...prevFiles, ...uploadedFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (

<div className="container mx-auto px-6 py-6 ">
  <div className="mt-0 p-6 rounded-xl">
    {/* Centered Upload Button */}
    <div className="flex justify-center items-center ">
      <input
        type="file"
        accept=".pdf,.doc,.docx"
        multiple
        className="hidden"
        id="file-upload"
        onChange={handleFileUpload}
      />
      <label
        htmlFor="file-upload"
        className="block w-48 text-center bg-gradient-to-r from-[#7b2cbf] to-[#5a189a] text-white font-medium px-4 py-2 rounded-lg cursor-pointer hover:scale-105 transition-transform shadow-md"
      >
        Upload PDF / DOCX
      </label>
    </div>

    {/* 📁 Display Uploaded Files */}
    {files.length > 0 && (
      <div className="mt-6 bg-white p-4 rounded-lg shadow-md ">
        <h3 className="text-xl font-semibold text-gray-800 ">Uploaded Files</h3>
        <ul className="mt-1 space-y-0">
          {files.map((file, index) => (
            <li key={index} className="flex items-center justify-between px-4 py-1 rounded-lg ">
              {/* Left Side: Index & File Name */}
              <div className="flex items-center space-x-3">
                <span className="font-semibold text-[#5a189a]">{index + 1}.</span>
                <span className="text-black flex-1 truncate">{file.name}</span>
              </div>

              {/* Right Side: Action Buttons */}

              <div className="flex space-x-2">
                {/* Preview Button with Eye Icon */}
                <button
                  onClick={() => window.open(URL.createObjectURL(file))}
                  className="text-white bg-[#9d4edd] p-2 rounded-lg shadow hover:bg-[#7b2cbf] transition flex items-center justify-center"
                >
                  <Eye className="h-5 w-5" />
                </button>

                {/* Analyze Button with File Icon */}
                <button
                  onClick={() => handleProcessFile(file)}
                  className="text-white bg-[#ff758f] p-2 rounded-lg shadow hover:bg-[#ff5c7c] transition flex items-center justify-center"
                >
                  <FileText className="h-5 w-5" />
                </button>

                {/* Delete Button with Trash Icon */}
                <button
                  onClick={() => handleDeleteFile(index)}
                  className="text-white bg-[#ff595e] p-2 rounded-lg shadow hover:bg-[#d93740] transition flex items-center justify-center"
                >
                  <Trash className="h-5 w-5" />
                </button>
              </div>

            </li>
          ))}
        </ul>
      </div>
    )}
  </div>
</div>




  );
}
