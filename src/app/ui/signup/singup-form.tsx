"use client";

import { signup } from "@/app/lib/actions";
import { LoginFormState } from "@/app/lib/definitions";
import Link from "next/link";
import { useActionState } from "react";

const initialState: LoginFormState = { message: "" };

export default function SignupForm() {
  const [state, formAction, pending] = useActionState(signup, initialState);

  return (
    <form
      action={formAction}
      className="flex flex-col gap-4 bg-white p-6 rounded-xl shadow-md w-80"
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="text-sm font-medium">
          이름
        </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="이름을 입력해주세요"
          required
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="password" className="text-sm font-medium">
          비밀번호
        </label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="비밀번호를 입력해주세요"
          required
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {state?.error && (
          <p className="text-sm text-red-500 mt-1">{state.message}</p>
        )}
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        disabled={pending}
      >
        {pending ? "회원가입중..." : "회원가입"}
      </button>
      {state.message === "회원가입이 완료되었습니다." && (
        <>
          <p className="text-green-600">{state.message}</p>
          <Link
            href="/"
            className="text-center text-blue-600 underline mt-2 hover:text-blue-800"
          >
            로그인하러 가기 →
          </Link>
        </>
      )}
    </form>
  );
}
