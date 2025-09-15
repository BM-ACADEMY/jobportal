import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const toastOptions = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

// Store the last toast message and type to prevent duplicates
let lastToast = { message: "", type: "" };

export const showToast = (type, message) => {
  // Prevent duplicate toasts
  if (lastToast.message === message && lastToast.type === type) {
    console.log(`Duplicate toast suppressed: ${type} - ${message}`); // Debug
    return;
  }

  // Clear all previous toasts
  toast.dismiss();

  // Show new toast
  switch (type) {
    case "success":
      toast.success(message, toastOptions);
      break;
    case "error":
      toast.error(message, toastOptions);
      break;
    case "info":
      toast.info(message, toastOptions);
      break;
    default:
      toast(message, toastOptions);
  }

  // Update last toast
  lastToast = { message, type };
};