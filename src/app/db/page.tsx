import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Header from "../ui/db/header";

export default async function DBPage() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userid")?.value;

  if (!userId) {
    redirect("/");
  }

  return (
    <div>
      <Header />
    </div>
  );
}
