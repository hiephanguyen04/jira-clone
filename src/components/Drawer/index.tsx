import { Drawer } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "stores";
import { HIDE_DRAWER } from "stores/Types/DrawerTypes";

export const Drawers: React.FC = () => {
  const { title, visible, component } = useSelector(
    (state: RootState) => state.drawerReducer
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
