import classNames from "classnames/bind";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { USER_LOGIN } from "utils/contants";
import { Sidebar } from "../Sidebar";
import styles from "./DefaultLayout.module.scss";
import { Header } from "./Header";

const cx = classNames.bind(styles);

export const DefaultLayout = ({ children }) => {
  const navigate = useNavigate(false);
  useEffect(() => {
    if (!localStorage.getItem(USER_LOGIN)) {
      navigate("/login");
    }
  });

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
