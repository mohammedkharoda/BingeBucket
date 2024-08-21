import Image from "next/image";

interface BingeLogoProps {
  width?: number;
  height?: number;
}

const BingeLogo = ({ width = 180, height = 500 }: BingeLogoProps) => {
  return <Image src="/logo.png" width={width} height={height} alt="logo" />;
};

export default BingeLogo;
