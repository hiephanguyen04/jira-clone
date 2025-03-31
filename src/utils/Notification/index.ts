import { notification } from "antd";
import { NotificationPlacement } from "antd/lib/notification";

type NotificationType = "success" | "info" | "warning" | "error";

export const openNotification = (
  type: NotificationType,
  message: string,
  description: string | null = null,
  placement: NotificationPlacement = "topRight"
): void => {
  notification[type]({
    message,
    description,
    placement,
  });
};
