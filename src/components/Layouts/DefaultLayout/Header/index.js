import {
  LogoutOutlined,
  SearchOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Tippy from "@tippyjs/react/headless";
import classNames from "classnames/bind";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { TOKEN, USER_LOGIN } from "utils/contants";
import styles from "./Header.module.scss";

const cx = classNames.bind(styles);

export const Header = () => {
  const { userLogin } = useSelector((state) => state.userReducer);
  const navigate = useNavigate();
  return (
    <div className={cx("navbar")}>
      <div className={cx("wrapper")}>
        <div className={cx("search")}>
          <input type="text" placeholder="search..." />
          <SearchOutlined className={cx("icon")} />
        </div>
        <div className={cx("items")}>
          {/* <div className={cx("item")}>
            <GlobalOutlined className={cx("icon")} />
            <span>English</span>
          </div> */}
          {localStorage.getItem(USER_LOGIN) ? (
            <Tippy
              delay={[0, 700]}
              trigger="click"
              //delay 0:khi show co delay 700:khi hiden co delay
              offset={[12, 9]}
              interactive
              placement="bottom-end"
              render={(attrs) => (
                <div className={cx("menu-list")} tabIndex="-1" {...attrs}>
                  <div className={cx("wrapper-menu")}>
                    <Link className={cx("menu-item")} to="/profile">
                      <UserOutlined className={cx("icon")} />
                      <span> My profile</span>
                    </Link>
                    <p className={cx("menu-item")}>
                      <SettingOutlined className={cx("icon")} />
                      <span> Settings</span>
                    </p>
                    <p
                      onClick={() => {
                        localStorage.removeItem(USER_LOGIN);
                        localStorage.removeItem(TOKEN);
                        navigate("/login");
                      }}
                      className={cx("menu-item", "separate")}
                    >
                      <LogoutOutlined className={cx("icon")} />
                      <span> Log out</span>
                    </p>
                  </div>
                </div>
              )}
            >
              <div className={cx("item")}>
                <span style={{ marginRight: "6px", fontWeight: "600" }}>
                  Hi ! {userLogin.name}
                </span>
                <img
                  src={userLogin?.avatar}
                  alt={userLogin?.name}
                  className={cx("avatar")}
                />
              </div>
            </Tippy>
          ) : (
            <>
              <Link to={"/register"} className="btn outline">
                Register
              </Link>
              <Link to="/login" className="btn">
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
