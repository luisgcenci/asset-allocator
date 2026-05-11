import { NotificationContext } from "providers/notification/NotificationProvider";
import { useContext } from "react";

export const useNotification = () => {
    return useContext(NotificationContext);
}