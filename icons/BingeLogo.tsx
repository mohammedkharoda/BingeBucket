import Image from "next/image";

interface BingeLogoProps {
  width?: number;
  height?: number;
}

const BingeLogo = ({ width = 160, height = 50 }: BingeLogoProps) => {
  return (
    <Image
      src="/logo.png"
      width={95}
      height={80}
      alt="logo"
      // style={{ height: height, width: "auto", objectFit: "cover" }}
    />
  );
};

export default BingeLogo;
