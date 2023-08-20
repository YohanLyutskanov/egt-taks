import {toast, ToastOptions} from 'react-toastify';

const toastOptions: Partial<ToastOptions> = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
};

export const notify = (type: "success" | "error", message: string) => {
    if(type === "success") {
        toast.success(message, toastOptions);
    } else if(type === "error") {
        toast.error(message, toastOptions);
    } else {
        toast.error("Undefined Toast Type", toastOptions);
    }
};