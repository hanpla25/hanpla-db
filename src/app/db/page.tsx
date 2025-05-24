import Header from "../ui/db/header";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Texts from "../ui/db/texts";
import Form from "../ui/db/form";

export default async function DBPage() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userid")?.value;

  if (!userId) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-[#fbfbfd] pb-24">
      <Header />
      <Texts />
      <Form />
    </div>
  );
}
