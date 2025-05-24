"use server";
import { createClient } from "@/supabase/server";
import { cookies } from "next/headers";
import { UserCookie } from "./definitions";

export async function getUser(): Promise<UserCookie> {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userid")?.value;
  const userName = cookieStore.get("username")?.value;

  return { userId, userName };
}

export async function getText() {
  const supabase = await createClient();
  const cookieStore = await cookies();
  const userId = cookieStore.get("userid")?.value;

  const { data: texts, error } = await supabase
    .from("texts")
    .select("*")
    .eq("userid", userId);

  if (error || !texts) return null;

  return texts;
}
