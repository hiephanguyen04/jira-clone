import { Modal } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "stores";
import { HIDE_MODAL } from "stores/Types/ModalTypes";

export const ModalDetail: React.FC = () => {
  const dispatch = useDispatch();

  const { visible, title, Component } = useSelector(
    (state: RootState) => state.modalReducer
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
