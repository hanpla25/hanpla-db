"use client";

import { useRef } from "react";

export default function TextForm() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleResize = () => {
    const textarea = textareaRef.current;
    const maxLine = 5;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(
        textarea.scrollHeight,
        maxLine * 28
      )}px`;
    }
  };

  return (
    <form
      action=""
      className="fixed bottom-0 left-0 right-0 mx-auto max-w-[1258px] bg-white p-4 shadow-lg flex flex-col"
    >
      <textarea
        name="text"
        id="text"
        className="w-full p-2 border rounded-md resize-none mb-4"
        rows={1}
        required
        ref={textareaRef}
        placeholder="내용을 입력하세요"
        onInput={handleResize}
      />
      <div className="flex justify-between">
        <input
          type="file"
          id="attachment"
          name="attachment"
          multiple
          className="hidden"
        />

        <label
          htmlFor="attachment"
          className="inline-block cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
        >
          첨부파일
        </label>

        <button
          type="submit"
          className="ml-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
        >
          저장
        </button>
      </div>
    </form>
  );
}
