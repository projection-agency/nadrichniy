import s from "./Container.module.css";
import { CSSProperties, ReactNode } from "react";

const Container = ({
  className,
  children,
  style,
}: {
  className?: string;
  children: ReactNode;
  style?: CSSProperties;
}) => {
  return (
    <div
      className={`${s.container} ${className ? className : ""}`}
      style={style}
    >
      {children}
    </div>
  );
};

export default Container;
