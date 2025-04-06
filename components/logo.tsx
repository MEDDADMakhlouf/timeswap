import Link from "next/link"

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <div className="relative h-8 w-8">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
          <rect width="32" height="32" rx="4" fill="#0047AB" />
          <path d="M8 8H16V16H8V8Z" fill="white" />
          <path d="M16 16H24V24H16V16Z" fill="white" />
        </svg>
      </div>
      <span className="text-xl font-bold">TimeSwap</span>
    </Link>
  )
}

