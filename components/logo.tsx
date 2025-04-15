import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <div className="relative">
        <img src="/smallogo.svg" alt="" />
      </div>
      {/* <span className="text-xl font-bold">TimeSwap</span> */}
    </Link>
  );
}
