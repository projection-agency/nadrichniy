import s from "./Container.module.css";
import { ReactNode } from "react";

const Container = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return (
    <div className={`${s.container} ${className ? className : ""}`}>
      {children}
    </div>
  );
};

export default Container;
