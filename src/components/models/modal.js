import { Modal } from "antd";

import { useDispatch, useSelector } from "react-redux";
import { HIDE_MODAL } from "stores/Types/ModalTypes";

export const ModalDetail = () => {
  const dispatch = useDispatch();

  const { visible, title, Component } = useSelector(
    (state) => state.modalReducer
  );

  return (
    <Modal
      closable={false}
      footer={null}
      title={title}
      visible={visible}
      onCancel={() => {
        dispatch({ type: HIDE_MODAL });
      }}
      width={1100}
    >
      {Component}
    </Modal>
  );
};
