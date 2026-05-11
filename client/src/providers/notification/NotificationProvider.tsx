import { Alert, AlertColor, AlertPropsColorOverrides, Snackbar } from "@mui/material"
import { OverridableStringUnion } from "@mui/types";
import React from "react";

interface NotificationContextValue {
    showNotification: (message: string, severity: "error" | "warning" | "info" | "success") => void;
    clearNotification: () => void;
    notification: string | null;
    severity: OverridableStringUnion<AlertColor, AlertPropsColorOverrides> | undefined;
}

export const NotificationContext = React.createContext<NotificationContextValue>({
    showNotification: () => {
        console.log("showing error");
    },
    clearNotification: () => {
        console.log("clearing error");
    },
    notification: null,
    severity: undefined,
});

interface NotificationProviderProps {
    children: React.ReactNode;
}

export const NotificationProvider = (props: NotificationProviderProps) => {

    const [notification, setNotification] = React.useState<string | null>(null);
    const [severity, setSeverity] = React.useState<OverridableStringUnion<AlertColor, AlertPropsColorOverrides> | undefined>(undefined);

    const showNotification = (message: string, severity: OverridableStringUnion<AlertColor, AlertPropsColorOverrides> | undefined) => {
        setNotification(message);
        setSeverity(severity);
    }

    const clearNotification = () => {
        setNotification(null);
        setSeverity(undefined);
    }

    return (
        <NotificationContext.Provider value={{ showNotification, notification, clearNotification, severity }}>
            {props.children}
        </NotificationContext.Provider>
    );
}