import classNames from "classnames/bind";
import { useFormik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "stores";
import { LOGIN_SAGA } from "stores/Sagas/types/UserTypeSaga";
import { LoginParams } from "stores/Types/UserTypes";
import {
  StyledExclamationCircleOutlined,
  StyledLoadingOutlined,
} from "utils/IconHelper";
import * as Yup from "yup";
import styles from "./Login.module.scss";

const cx = classNames.bind(styles);

export const Login: React.FC = () => {
  const { isLoadingBtn } = useSelector(
    (state: RootState) => state.loadingReducer
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik<LoginParams>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email format")
        .required("Please enter a valid email!"),
      password: Yup.string()
        .min(6, "Minimum 6 characters")
        .required("Please enter a valid password!"),
    }),
    onSubmit: (values) => {
      dispatch({ type: LOGIN_SAGA, userLogin: values, navigate });
    },
  });

  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        <div className={cx("top")}>
          <h1>Sign in</h1>
          <Link to="/register">Don't have an account?</Link>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className={cx("inputBox")}>
            <label>Work Email</label>
            <input
              type="text"
              className={cx({
                errorInput: formik.errors.email && formik.touched.email,
              })}
              placeholder="nicholas@gmail.com"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.email && formik.touched.email && (
              <div className={cx("error")}>
                <StyledExclamationCircleOutlined className={cx("icon")} />
                <span className={cx("text")}>{formik.errors.email}</span>
              </div>
            )}
          </div>
          <div className={cx("inputBox")}>
            <label>Password</label>
            <input
              type="password"
              className={cx({
                errorInput: formik.errors.password && formik.touched.password,
              })}
              name="password"
              autoComplete="on"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.password && formik.touched.password && (
              <div className={cx("error")}>
                <StyledExclamationCircleOutlined className={cx("icon")} />
                <span className={cx("text")}>{formik.errors.password}</span>
              </div>
            )}
          </div>
          <div className={cx("forgot")}>
            <span>Forgot your password?</span>
          </div>
          <button
            style={{
              display: "block",
              width: "100%",
              position: "relative",
              padding: "13px 0",
              height: "45px",
            }}
            type="submit"
            className="btn"
          >
            {isLoadingBtn ? (
              <StyledLoadingOutlined className={cx("loading")} />
            ) : (
              "sign in"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
