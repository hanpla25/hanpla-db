import { logout } from "@/app/lib/actions";
import { getUser } from "@/app/lib/data";

export default async function Header() {
  const { userName } = await getUser();

  return (
    <header className="bg-gray-100 shadow-md mb-4">
      <div className="max-w-screen-lg mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">{userName}의 DB</h1>
        <form action={logout}>
          <button
            type="submit"
            className="text-red-500 text-base font-medium hover:underline"
          >
            로그아웃
          </button>
        </form>
      </div>
    </header>
  );
}
