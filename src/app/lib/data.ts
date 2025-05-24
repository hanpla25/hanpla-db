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
    .eq("id", userId)
    .single();

  if (error || !user) return null;

  return user;
}
