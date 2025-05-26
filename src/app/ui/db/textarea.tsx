import { useRef } from "react";

export default function Textarea() {
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
    <textarea
      name="text"
      id="text"
      className="flex-1 scrollbar-hide p-2 border rounded-md resize-none"
      rows={1}
      placeholder="내용을 입력하세요"
      ref={textareaRef}
      onInput={handleResize}
      required
    ></textarea>
  );
}
