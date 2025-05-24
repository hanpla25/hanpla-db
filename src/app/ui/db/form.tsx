"use client";
import { useRef } from "react";

export default function Form() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleResize = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 168)}px`;
    }
  };

  return (
    <form
      action=""
      className="fixed bottom-0 left-0 w-full bg-white p-2 shadow-md flex items-center gap-2"
    >
      <label htmlFor="text" className="sr-only">
        내용
      </label>

      <div className="flex relative flex-1 ">
        <textarea
          id="text"
          name="text"
          placeholder="내용"
          ref={textareaRef}
          onInput={handleResize}
          rows={1}
          className="w-full border border-gray-300 rounded-lg py-2 pl-2 pr-12 resize-none overflow-auto focus:outline-none focus:ring-2 focus:ring-blue-500 max-h-[168px] overflow-y-scroll scrollbar-hide"
        />
        <button
          type="button"
          className="absolute top-2 right-2 text-sm text-blue-500 hover:underline mr-3"
        >
          첨부
        </button>
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        저장
      </button>
    </form>
  );
}
