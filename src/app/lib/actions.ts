"use server";

import { createClient } from "@/supabase/server";
import { LoginFormState } from "./definitions";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(_prevState: LoginFormState, formData: FormData) {
  const supabase = await createClient();
  const name = formData.get("name");
  const password = formData.get("password");

  if (typeof name !== "string" || typeof password !== "string") {
    return {
      error: "타입 에러",
      message: "이름과 비밀번호를 제대로 입력해주세요.",
    };
  }

  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("username", name)
    .single();

  if (error) {
    return {
      error: "아이디 불일치",
      message: "아이디가 일치하지 않습니다.",
    };
  }

  if (user.password !== password) {
    return {
      error: "비밀번호 불일치",
      message: "비밀번호가 일치하지 않습니다.",
      input: name,
    };
  }

  const cookieStore = await cookies();
  cookieStore.set("userid", String(user.userid), {
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
  });
  cookieStore.set("username", String(user.username), {
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
  });

  redirect("/db");
}

export async function signup(
  _prevState: LoginFormState,
  formData: FormData
): Promise<LoginFormState> {
  const supabase = await createClient();
  const name = formData.get("name");
  const password = formData.get("password");

  if (typeof name !== "string" || typeof password !== "string") {
    return {
      error: "타입 에러",
      message: "이름과 비밀번호를 확인하세요",
    };
  }

  const { error } = await supabase
    .from("users")
    .insert([{ username: name, password }]);

  if (error) {
    return {
      error: error.message,
      message: "이미 존재하는 이름입니다.",
    };
  }

  return {
    error: undefined,
    message: "회원가입이 완료되었습니다.",
  };
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("userid");
  cookieStore.delete("username");

  redirect("/");
}

export async function post(_prevState: any, formData: FormData) {
  const text = formData.get("text")?.toString();

  if (!text || text.trim() === "") {
    return {
      error: "내용이 비어 있습니다.",
      message: "",
    };
  }

  const supabase = await createClient();
  const cookieStore = await cookies();
  const userId = cookieStore.get("userid")?.value;
  const userName = cookieStore.get("username")?.value;

  if (!userId) {
    return {
      error: "로그인이 필요합니다.",
      message: "",
    };
  }

  const { error } = await supabase.from("texts").insert([
    {
      text,
      userid: userId,
      username: userName,
    },
  ]);

  if (error) {
    return {
      error: "저장 중 오류가 발생했습니다.",
      message: "",
    };
  }

  return {
    error: undefined,
    message: "저장 성공",
  };
}
