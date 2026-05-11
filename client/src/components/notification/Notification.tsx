import { Alert, Snackbar } from "@mui/material"
import { useNotification } from "hooks/useNotification"
import ""

export const Notification = () => {
    const { clearNotification, notification, severity } = useNotification();

    const handleClose = () => {
        clearNotification();
    }

    return (
        <Snackbar open autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
            <Alert
                onClose={handleClose}
                severity={severity}
                variant="filled"
                sx={{ width: '100%' }}
            >
                {notification}
            </Alert>
        </Snackbar>
    )
}