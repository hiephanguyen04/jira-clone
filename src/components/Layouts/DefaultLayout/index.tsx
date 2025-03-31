import classNames from "classnames/bind";
import React, { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { USER_LOGIN } from "utils/contants";
import { Sidebar } from "../Sidebar";
import styles from "./DefaultLayout.module.scss";
import { Header } from "./Header";

const cx = classNames.bind(styles);

interface DefaultLayoutProps {
  children: ReactNode;
}

export const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem(USER_LOGIN)) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className={cx("wrapper")}>
      <Sidebar />
      <div className={cx("container")}>
        <Header />
        <div className={cx("content")}>{children}</div>
      </div>
    </div>
  );
};
