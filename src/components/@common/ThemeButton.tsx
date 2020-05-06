import React from "react";
interface Props {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  styles?: {};
}

const ThemeButton = ({ onClick, styles = {} }: Props) => {
  return <button onClick={onClick} className="btn themeBtn"></button>;
};

export default ThemeButton;
