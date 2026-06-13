import Image from "next/image";

interface BingeLogoProps {
  className?: string;
  /** Render only the icon mark, without the wordmark text. */
  iconOnly?: boolean;
}

const BingeLogo = ({ className = "", iconOnly = false }: BingeLogoProps) => {
  return (
    <span
      className={`inline-flex items-center gap-2 font-display font-extrabold tracking-tight ${className}`}
    >
      <span className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl bg-surface-2 ring-1 ring-border">
        <Image
          priority
          alt="BingeBucket"
          className="object-contain"
          height={36}
          src="/logo.png"
          width={36}
        />
      </span>
      {!iconOnly && (
        <span className="text-lg leading-none text-text">
          Binge<span className="text-gradient">Bucket</span>
        </span>
      )}
    </span>
  );
};

export default BingeLogo;
