"use client";

import { useRef, useState } from "react";

export default function Attachment() {
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const filesArray = Array.from(e.target.files);
    setFiles(filesArray);
  };

  const handleRemoveFile = (fileName: string) => {
    const newFiles = files.filter((file) => file.name !== fileName);
    setFiles(newFiles);

    if (fileInputRef.current) {
      const dataTransfer = new DataTransfer();
      newFiles.forEach((file) => dataTransfer.items.add(file));
      fileInputRef.current.files = dataTransfer.files;
    }
  };

  return (
    <div className="mb-2">
      <input
        type="file"
        id="attachment"
        name="attachment"
        multiple
        className="hidden"
        onChange={handleFileChange}
        ref={fileInputRef}
      />
      <div className="flex items-center gap-4 overflow-hidden">
        <label
          htmlFor="attachment"
          className="inline-block cursor-pointer bg-blue-500 text-white hover:bg-blue-600 transition px-2 py-1 rounded shrink-0"
        >
          파일선택
        </label>
        <div className="flex flex-wrap gap-2">
          {files.map((file) => (
            <span
              key={file.name}
              className="bg-gray-200 px-2 py-1 rounded flex items-center gap-1"
            >
              {file.name}
              <button
                type="button"
                onClick={() => handleRemoveFile(file.name)}
                className="ml-1 text-red-600 font-bold"
                aria-label={`Remove ${file.name}`}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
