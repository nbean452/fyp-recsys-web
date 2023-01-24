import React from "react";

import { notification, Spin } from "antd";

const MESSAGE_DURATION = 1;

interface TriggerNotification {
  type: "error" | "info" | "success" | "warning";
  description?: string;
  message: string;
  duration?: number;
  icon?: null | JSX.Element;
}

const triggerNotification = ({
  type,
  description = "[ no description ]",
  message = "Info",
  duration = MESSAGE_DURATION,
  icon,
}: TriggerNotification) =>
  notification[type]({
    description,
    duration,
    icon,
    message,
    placement: "bottom",
  });

const error = (title: string, content: string) =>
  triggerNotification({
    description: content,
    message: title,
    type: "error",
  });
const info = (title: string, content: string) =>
  triggerNotification({ description: content, message: title, type: "info" });
const success = (title: string, content: string) =>
  triggerNotification({
    description: content,
    message: title,
    type: "success",
  });
const warning = (title: string, content: string) =>
  triggerNotification({
    description: content,
    message: title,
    type: "warning",
  });
const loading = (title: string, content: string) =>
  triggerNotification({
    description: content,
    icon: <Spin />,
    message: title,
    type: "info",
  });

export { success, info, error, warning, loading };
