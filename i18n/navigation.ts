// IMPORTANT: Always import usePathname and useRouter from here, not from "next/navigation".
// These versions strip the locale prefix — usePathname() returns "/solutions" not "/en/solutions".
import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);
