import Header from "../ui/db/header";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Texts from "../ui/db/texts";
import { getText } from "../lib/data";
import TextForm from "../ui/db/text-form";

export default async function DBPage() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userid")?.value ?? null;
  const userName = cookieStore.get("username")?.value ?? null;

  const texts = await getText(userId);

  if (!userId || !userName) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-[#fbfbfd] pb-24">
      <Header />
      <Texts texts={texts} />
      <TextForm />
    </div>
  );
}
