import Link from "next/link";

export default function LoginLinks() {
  const links = [{ name: "회원가입", href: "/signup" }];
  return (
    <div className="flex gap-2 justify-end">
      {links.map((link, index) => (
        <Link key={index} href={link.href}>
          {link.name}
        </Link>
      ))}
    </div>
  );
}
