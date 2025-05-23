import { cookies } from "next/headers";
import SignupForm from "../ui/signup/singup-form";
import { redirect } from "next/navigation";

export default async function Page() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userid")?.value;

  if (userId) {
    redirect("/db");
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <SignupForm />
    </div>
  );
}
