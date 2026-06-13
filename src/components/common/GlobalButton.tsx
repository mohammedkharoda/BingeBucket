import React from "react";
interface GlobalButtonProps {
  className: string;
  children: React.ReactNode;
}
const GlobalButton = ({ className, children }: GlobalButtonProps) => {
  return <button className={className}>{children}</button>;
};

export default GlobalButton;
