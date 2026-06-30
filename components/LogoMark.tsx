import Image from "next/image";

interface LogoMarkProps {
  size?: number;
  className?: string;
}

// SDT tech leaf mark. Served from /public/mark.png (transparent, works on any
// background). The full logo lockup lives in the nav/footer via /logo-light.png.
export function LogoMark({ size = 32, className }: LogoMarkProps) {
  return (
    <Image
      src="/mark.png"
      alt="SDT tech"
      width={size}
      height={size}
      draggable={false}
      className={className}
      style={{ width: size, height: size, userSelect: "none" }}
    />
  );
}
