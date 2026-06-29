import Link from "next/link";
import { LogoMark } from "@/components/LogoMark";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-8 text-center px-6">
      <LogoMark size={40} />
      <p className="text-text-muted text-sm tracking-widest font-mono">404</p>
      <h1 className="text-xl font-semibold text-white leading-[1.2]">Page not found</h1>
      <p className="text-text-secondary text-base leading-[1.6]">The URL you followed doesn&apos;t exist or has moved.</p>
      <Link
        href="/"
        className="text-cyber-jade text-sm hover:text-jade-strong transition-colors duration-150 ease-out"
      >
        Back to home
      </Link>
    </div>
  );
}
