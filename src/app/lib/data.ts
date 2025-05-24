"use server";
import { createClient } from "@/supabase/server";
import { cookies } from "next/headers";

export async function getUser() {
  const supabase = await createClient();
  const cookieStore = await cookies();
  const userId = cookieStore.get("userid")?.value;

  if (!userId) return null;

  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("userid", userId)
    .single();

  if (error || !user) return null;

  return user;
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
