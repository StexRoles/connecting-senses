import Link from "next/link";

export default function Button({ children = "Comenzar", href = "/next-page" }) {
  return (
    <div>
      <Link href={href}>
        <button className="bg-non-photo-blue font-black rounded-full py-3 px-6 hover:scale-105 active:scale-105 shadow-xl transition-all">
          {children}
        </button>
      </Link>
    </div>
  );
}