"use server";

import { createClient } from "@/supabase/server";
import { LoginFormState, PostFormState } from "./definitions";
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

export async function post(_prevState: PostFormState, formData: FormData) {
  const text = formData.get("text");
  if (typeof text !== "string" || !text) {
    return { error: "텍스트가 없음" };
  }

  const cookieStore = await cookies();
  const supabase = await createClient();

  const files = formData.getAll("attachment");
  const userId = cookieStore.get("userid")?.value ?? null;
  const userName = cookieStore.get("username")?.value ?? null;

  const uploadedFiles: string[] = [];
  const timestamp = Date.now();

  for (const [index, file] of files.entries()) {
    if (!(file instanceof File) || file.size === 0) continue;

    const ext = file.name.includes(".") ? file.name.split(".").pop() : "bin";
    const filePath = `${userId}/${timestamp}-${index}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("attachments")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      console.error("파일 업로드 오류:", uploadError);
      continue;
    }

    const { data: publicUrlData } = supabase.storage
      .from("attachments")
      .getPublicUrl(filePath);

    if (publicUrlData?.publicUrl) {
      uploadedFiles.push(publicUrlData.publicUrl);
    }
  }

  const { error } = await supabase.from("texts").insert({
    userid: userId,
    username: userName,
    text,
    attachments: uploadedFiles,
  });

  if (error) {
    console.log(error);
    return { error: `에러메시지:${error.message}`, message: "에러" };
  }

  redirect("/db");
}
