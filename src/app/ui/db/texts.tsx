"use client";

import { useState } from "react";
import { Text } from "@/app/lib/definitions";
import { createClient } from "@/supabase/client";

export default function Texts({ texts }: { texts: Text[] | null }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const supabase = createClient();

  const handleDownload = async (filePath: string) => {
    const { data, error } = await supabase.storage
      .from("attachments")
      .download(filePath.replace(/^.*\/(.*?)\/(.*?)$/, "$1/$2"));

    if (error) {
      console.error("다운로드 실패:", error);
      return;
    }

    const fileName = filePath.split("/").pop() || "downloaded-file";
    const url = URL.createObjectURL(data);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!texts || texts.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500 text-center text-lg">
        원하는 데이터를 저장해보세요
      </div>
    );
  }

  return (
    <div className="mt-5 mx-4 xl:mx-[auto] max-w-[1258px] space-y-5">
      {texts.map((text, index) => (
        <div
          key={text.id || index}
          className="flex flex-col bg-white rounded-[30px] shadow-md p-4"
        >
          <div className="flex min-h-24">
            <div className="flex-1 mr-4">
              <p className="break-all text-sm">{text.text}</p>
            </div>
            <div className="flex flex-col items-end justify-between shrink-0 text-right">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="text-sm text-blue-500 hover:underline self-end"
              >
                첨부파일
              </button>
              <span className="text-xs text-gray-400">
                {new Date(text.created_at).toLocaleString()}
              </span>
            </div>
          </div>

          {openIndex === index &&
            Array.isArray(text.attachments) &&
            text.attachments.length > 0 && (
              <ul className="mt-2 text-sm text-gray-600 list-disc list-inside">
                {text.attachments.map((path: string, i: number) => {
                  const fileName = path.split("/").pop();
                  return (
                    <li key={i} className="mb-4">
                      <button
                        type="button"
                        onClick={() => handleDownload(path)}
                        className="text-blue-500 hover:underline"
                      >
                        {fileName}
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
        </div>
      ))}
    </div>
  );
}
