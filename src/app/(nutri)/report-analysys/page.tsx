"use client";

import { useState } from "react";
import { Eye, FileText, Trash } from "lucide-react";
import * as Tooltip from "@radix-ui/react-tooltip";
import axios from "axios";

export default function DocumentUploader() {
  const [files, setFiles] = useState<{ file: File; summary: string }[]>([]);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      let uploadedFiles: any = Array.from(event.target.files);

      const formData = new FormData();

      formData.set("files", event.target.files[0]);

      const { data } = await axios.post(
        "http://192.168.1.163:8000/v1/generate_nutrient_from_pdfs",
        formData
      );

      let localreport = localStorage.getItem("report-analysys");
      let report = localreport ? JSON.parse(localreport) : {};

      report = { ...report, [uploadedFiles[0].name]: data?.nutrient_summary };
      localStorage.setItem("report-analysys", JSON.stringify(report));

      uploadedFiles = uploadedFiles.map((file: any) => ({
        file,
        summary: data?.nutrient_summary || "",
      }));

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
            <h3 className="text-xl font-semibold text-gray-800 ">
              Uploaded Files
            </h3>
            <ul className="mt-1 space-y-0">
              {files.map((file, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between px-4 py-1 rounded-lg "
                >
                  {/* Left Side: Index & File Name */}
                  <div>
                    <div className="flex items-center space-x-3">
                      <span className="font-semibold text-[#5a189a]">
                        {index + 1}.
                      </span>
                      <span className="text-black flex-1 truncate">
                        {file.file.name}
                      </span>
                    </div>
                    {/* <div>
                      <h6>Summary</h6>
                      <div className="text-xs text-gray-500 w-1/3 ">
                        {file.summary}
                      </div>
                    </div> */}
                  </div>

                  {/* Right Side: Action Buttons */}

                  <div className="flex space-x-2">
                    {/* Preview Button with Eye Icon */}
                    {/* View Button */}
                    <Tooltip.Provider delayDuration={200}>
                      <Tooltip.Root>
                        <Tooltip.Trigger asChild>
                          <button
                            onClick={() =>
                              window.open(URL.createObjectURL(file.file))
                            }
                            className="text-white bg-[#9d4edd] p-2 rounded-lg shadow hover:bg-[#7b2cbf] transition flex items-center justify-center"
                          >
                            <Eye className="h-5 w-5" />
                          </button>
                        </Tooltip.Trigger>
                        <Tooltip.Portal>
                          <Tooltip.Content
                            className="bg-pink-300 text-gray-600 px-2 py-0.5 rounded-lg text-sm shadow-lg font-medium"
                            side="top"
                            align="center"
                            sideOffset={5} // ✅ Keeps tooltip away from the button
                            collisionPadding={10} // ✅ Prevents overlapping
                          >
                            View
                            <Tooltip.Arrow className="fill-pink-500" />
                          </Tooltip.Content>
                        </Tooltip.Portal>
                      </Tooltip.Root>
                    </Tooltip.Provider>

                    {/* Analyze Button with File Icon */}
                    {/* Edit Button */}
                    <Tooltip.Provider delayDuration={200}>
                      <Tooltip.Root>
                        <Tooltip.Trigger asChild>
                          <button
                            onClick={() =>
                              console.log("Edit File:", file.file.name)
                            }
                            className="text-white bg-[#ff758f] p-2 rounded-lg shadow hover:bg-[#ff5c7c] transition flex items-center justify-center"
                          >
                            <FileText className="h-5 w-5" />
                          </button>
                        </Tooltip.Trigger>
                        <Tooltip.Content
                          className="bg-pink-300 text-gray-600 px-2 py-0.5 rounded-lg text-sm shadow-lg font-medium"
                          side="top"
                          align="center"
                          sideOffset={5} // ✅ Keeps tooltip away from the button
                          collisionPadding={10} // ✅ Prevents overlapping
                        >
                          Edit
                          <Tooltip.Arrow className="fill-pink-500" />
                        </Tooltip.Content>
                      </Tooltip.Root>
                    </Tooltip.Provider>

                    {/* Delete Button with Trash Icon */}
                    {/* Delete Button */}
                    <Tooltip.Provider delayDuration={200}>
                      <Tooltip.Root>
                        <Tooltip.Trigger asChild>
                          <button
                            onClick={() => removeFile(index)}
                            className="text-white bg-[#ff595e] p-2 rounded-lg shadow hover:bg-[#d93740] transition flex items-center justify-center"
                          >
                            <Trash className="h-5 w-5" />
                          </button>
                        </Tooltip.Trigger>
                        <Tooltip.Content
                          className="bg-pink-300 text-gray-600 px-2 py-0.5 rounded-lg text-sm shadow-lg font-medium"
                          side="top"
                          align="center"
                          sideOffset={5} // ✅ Keeps tooltip away from the button
                          collisionPadding={10} // ✅ Prevents overlapping
                        >
                          Delete
                          <Tooltip.Arrow className="fill-pink-500" />
                        </Tooltip.Content>
                      </Tooltip.Root>
                    </Tooltip.Provider>
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
