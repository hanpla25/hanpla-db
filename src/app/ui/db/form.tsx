"use client";

import { post } from "@/app/lib/actions";
import { PostFormState } from "@/app/lib/definitions";
import { useActionState, useRef, useState, useEffect } from "react";

export default function Form() {
  const initialState: PostFormState = { message: "" };

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [state, formAction, pending] = useActionState(post, initialState);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleResize = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 168)}px`;
    }
  };

  useEffect(() => {
    if (!pending && state.message === "저장 성공") {
      setShowSuccessModal(true);
    }
  }, [pending, state]);

  return (
    <>
      {/* 저장중 모달 */}
      {pending && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white px-20 py-10 rounded-lg shadow-lg text-center text-lg font-medium ">
            저장중...
          </div>
        </div>
      )}

      {/* 저장 완료 모달 */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white px-20 py-10 rounded-lg shadow-lg text-center">
            <p className="mb-4 text-lg font-medium">저장 완료</p>
            <button
              onClick={() => {
                setShowSuccessModal(false);
                window.location.reload();
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              닫기
            </button>
          </div>
        </div>
      )}

      {/* 입력 폼 */}
      <form
        action={formAction}
        className="fixed bottom-0 left-0 w-full bg-white p-2 shadow-md flex items-center gap-2"
      >
        <label htmlFor="text" className="sr-only">
          내용
        </label>

        <div className="flex relative flex-1">
          <textarea
            id="text"
            name="text"
            placeholder="내용"
            ref={textareaRef}
            onInput={handleResize}
            rows={1}
            required
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
          disabled={pending}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          저장
        </button>
      </form>
    </>
  );
}
