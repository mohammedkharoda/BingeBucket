import React from "react";
import { Button } from "@nextui-org/button";
interface GlobalButtonProps {
  className: string;
  children: React.ReactNode;
}
const GlobalButton = ({ className, children }: GlobalButtonProps) => {
  return <button className={className}>{children}</button>;
};
export default GlobalButton;
