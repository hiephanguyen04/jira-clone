import { LoadingOutlined } from "@ant-design/icons";
import { Editor } from "@tinymce/tinymce-react";
import { Select } from "antd";
import classNames from "classnames/bind";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET_ALL_CATEGORY_SAGA } from "stores/Sagas/types/ProjectCategoryTypeSaga";
import { UPDATE_PROJECT_SAGA } from "stores/Sagas/types/ProjectTypeSaga";
import * as Yup from "yup";
import styles from "./EditProjectForm.module.scss";

const { Option } = Select;
const cx = classNames.bind(styles);

export const EditProjectForm = () => {
  const { listCategory } = useSelector((state) => state.projectCategoryReducer);
  const { isLoadingBtn } = useSelector((state) => state.loadingReducer);
  const { editProject } = useSelector((state) => state.projectReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: GET_ALL_CATEGORY_SAGA });
  }, [dispatch]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: editProject.id,
      projectName: editProject.projectName,
      description: editProject.description,
      categoryId: editProject.categoryId,
    },
    validationSchema: Yup.object({
      projectName: Yup.string()
        .min(2, "Mininum 2 characters")
        .max(15, "Maximum 15 characters")
        .required("This field is required!"),
    }),
    onSubmit: (values) => {
      dispatch({ type: UPDATE_PROJECT_SAGA, project: values });
    },
  });
  const handleChangeSelect = (value) => {
    formik.setFieldValue("categoryId", value);
  };
  const handleChangeEditor = (content, editor) => {
    formik.setFieldValue("description", content);
  };

  return (
    <div className={cx("wrapper")}>
      <form className={cx("editForm")} onSubmit={formik.handleSubmit}>
        <div className={cx("inputForm")}>
          <label>Project ID</label>
          <input
            type="text"
            name="projectName"
            onChange={formik.handleChange}
            value={formik.values.id}
            onBlur={formik.handleBlur}
            disabled
          />
        </div>
        <div className={cx("inputForm")}>
          <label>Project Name</label>
          <input
            type="text"
            name="projectName"
            onChange={formik.handleChange}
            value={formik.values.projectName}
            onBlur={formik.handleBlur}
            className={cx({
              errorInput:
                formik.errors.projectName && formik.touched.projectName,
            })}
          />
          {formik.errors.projectName && formik.touched.projectName && (
            <div className={cx("error")}>
              <span className={cx("text")}>{formik.errors.projectName} </span>
            </div>
          )}
        </div>
        <div className={cx("inputForm")}>
          <label>Description</label>
          <Editor
            initialValue={formik.values.description}
            init={{
              height: 500,
              menubar: false,
              plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount",
              ],
              toolbar:
                "undo redo | formatselect | " +
                "bold italic backcolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
            onEditorChange={handleChangeEditor}
          />
        </div>
        <div className={cx("inputForm")}>
          <label>Project Category</label>
          <Select
            value={formik.values.categoryId}
            className={cx("select")}
            style={{ width: "100%" }}
            onChange={handleChangeSelect}
          >
            {listCategory.map((category, idx) => {
              return (
                <Option
                  key={category.id}
                  value={category.id}
                  label={category.projectCategoryName}
                >
                  {category.projectCategoryName}
                </Option>
              );
            })}
          </Select>
        </div>
        <button style={{ width: "70px" }} type="submit" className="btn">
          {isLoadingBtn ? (
            <LoadingOutlined className={cx("loading")} />
          ) : (
            "Save"
          )}
        </button>
      </form>
    </div>
  );
};
