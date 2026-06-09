interface LogoMarkProps {
  size?: number;
  className?: string;
}

export function LogoMark({ size = 32, className }: LogoMarkProps) {
  return (
    <svg
      viewBox="0 0 36 36"
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      {/* Cyber Jade leaf — bottom-right, renders behind */}
      <ellipse
        cx="24"
        cy="24"
        rx="6"
        ry="10"
        fill="#008684"
        transform="rotate(35, 24, 24)"
      />
      {/* Volt Green leaf — top-left, renders on top */}
      <ellipse
        cx="12"
        cy="12"
        rx="6"
        ry="10"
        fill="#96D02C"
        transform="rotate(35, 12, 12)"
      />
    </svg>
  );
}
