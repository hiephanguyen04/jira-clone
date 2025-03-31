import classNames from "classnames/bind";
import { useFormik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "stores";
import { REGISTER_SAGA } from "stores/Sagas/types/UserTypeSaga";
import { SignupParams } from "stores/Types/UserTypes";
import {
  StyledExclamationCircleOutlined,
  StyledLoadingOutlined,
} from "utils/IconHelper";
import * as Yup from "yup";
import styles from "./Register.module.scss";

const cx = classNames.bind(styles);

interface RegisterFormValues extends SignupParams {
  confirm_password: string;
}

export const Register: React.FC = () => {
  const { isLoadingBtn } = useSelector(
    (state: RootState) => state.loadingReducer
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik<RegisterFormValues>({
    initialValues: {
      email: "",
      password: "",
      name: "",
      phoneNumber: "",
      confirm_password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(2, "Mininum 2 characters")
        .max(15, "Maximum 15 characters")
        .required("Please enter a valid name!"),
      phoneNumber: Yup.string()
        .matches(
          /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
          "Phone number is not valid"
        )
        .required("Please enter a valid phone number!"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Please enter a valid email!"),
      password: Yup.string()
        .min(6, "Minimum 6 characters")
        .required("Please enter a valid password!"),
      confirm_password: Yup.string()
        .oneOf([Yup.ref("password")], "Password's not match")
        .required("Please enter a valid confirm password!"),
    }),
    onSubmit: (values) => {
      const { confirm_password, ...dataForm } = values;
      dispatch({ type: REGISTER_SAGA, dataForm, navigate });
    },
  });

  return (
    <div className={cx("wrapper")}>
      <div className={cx("left")}>
        <img src="https://picsum.photos/200/300/?blur=2" alt="register" />
      </div>
      <div className={cx("right")}>
        <div className={cx("inner")}>
          <div className={cx("top")}>
            <h1>Register</h1>
            <Link to="/login">Already have an account?</Link>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className={cx("inputBox")}>
              <label>Full Name</label>
              <input
                type="text"
                className={cx({
                  errorInput: formik.errors.name && formik.touched.name,
                })}
                placeholder="Nguyen Ha Hiep"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.name && formik.touched.name && (
                <div className={cx("error")}>
                  <StyledExclamationCircleOutlined className={cx("icon")} />
                  <span className={cx("text")}>{formik.errors.name}</span>
                </div>
              )}
            </div>
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
              <label>Phone number</label>
              <input
                type="tel"
                className={cx({
                  errorInput:
                    formik.errors.phoneNumber && formik.touched.phoneNumber,
                })}
                placeholder="091777***"
                name="phoneNumber"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.phoneNumber && formik.touched.phoneNumber && (
                <div className={cx("error")}>
                  <StyledExclamationCircleOutlined className={cx("icon")} />
                  <span className={cx("text")}>
                    {formik.errors.phoneNumber}
                  </span>
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
            <div className={cx("inputBox")}>
              <label>Confirm Password</label>
              <input
                type="password"
                className={cx({
                  errorInput:
                    formik.errors.confirm_password &&
                    formik.touched.confirm_password,
                })}
                name="confirm_password"
                autoComplete="on"
                value={formik.values.confirm_password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.confirm_password &&
                formik.touched.confirm_password && (
                  <div className={cx("error")}>
                    <StyledExclamationCircleOutlined className={cx("icon")} />
                    <span className={cx("text")}>
                      {formik.errors.confirm_password}
                    </span>
                  </div>
                )}
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
                "Register"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
