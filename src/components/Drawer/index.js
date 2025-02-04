import React from "react";
import { Drawer } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { HIDE_DRAWER } from "stores/Types/DrawerTypes";

export const Drawers = () => {
  const { title, visible, component } = useSelector(
    (state) => state.drawerReducer
  );
  const dispatch = useDispatch();

  return (
    <div>
      <Drawer
        title={title}
        placement="right"
        onClose={() => {
          dispatch({ type: HIDE_DRAWER });
        }}
        visible={visible}
        width={550}
        style={{ paddingTop: "0" }}
      >
        {component}
      </Drawer>
    </div>
  );
};
