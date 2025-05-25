"use server";
import { createClient } from "@/supabase/server";
import { User } from "./definitions";

export async function getUser(userId: string | null): Promise<User | null> {
  if (!userId) return null;

  const supabase = await createClient();

  const { data: user, error } = await supabase
    .from("users")
    .select("userId, userName, password")
    .eq("userId", userId)
    .single();

  if (error || !user) return null;

  return {
    userId: user.userId,
    userName: user.userName,
    password: user.password,
  };
}

export async function getText(userId: string | null) {
  if (!userId) return null;

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("texts")
    .select("*")
    .eq("userid", userId);

  if (error || !data) return null;

  return data;
}
