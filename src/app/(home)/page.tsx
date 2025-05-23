import { cookies } from "next/headers";
import LoginForm from "../ui/login-form";
import { redirect } from "next/navigation";

export default async function Home() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userid")?.value;

  if (userId) {
    redirect("/db");
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <LoginForm />
    </div>
  );
}
