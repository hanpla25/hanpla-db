"use client";

import { post } from "@/app/lib/actions";
import { PostFormState } from "@/app/lib/definitions";
import { useActionState, useEffect, useState } from "react";
import Attachment from "./attachment";
import Button from "./button";
import Textarea from "./textarea";

const initialState: PostFormState = {
  message: "",
};

export default function TextForm() {
  const [, formAction, pending] = useActionState(post, initialState);
  const [modalText, setModalText] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (pending) {
      setModalText("저장 중...");
      setShowModal(true);
    } else if (showModal) {
      setModalText("저장 완료!");
      const timer = setTimeout(() => {
        setShowModal(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [pending, showModal]);

  return (
    <>
      {showModal && (
        <div className="fixed top-1/3 left-1/2 -translate-x-1/2 px-6 py-3 bg-white border rounded-lg shadow-lg z-50">
          <span className="text-sm text-gray-700">{modalText}</span>
        </div>
      )}

      <form
        action={formAction}
        className="fixed bottom-0 left-0 right-0 w-full mx-auto max-w-[1258px]"
      >
        <Attachment />
        <div className="flex justify-between">
          <Textarea />
          <Button />
        </div>
      </form>
    </>
  );
}
