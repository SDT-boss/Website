import Link from "next/link";
import { siteConfig } from "@/config/site";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center px-6">
      <p className="text-text-muted text-sm tracking-widest font-mono">404</p>
      <p className="text-text-secondary text-base">This page does not exist.</p>
      <Link
        href="/"
        className="text-cyber-jade text-sm hover:text-jade-strong transition-colors duration-150 ease-out"
      >
        Return to {siteConfig.name} tech
      </Link>
    </div>
  );
}
