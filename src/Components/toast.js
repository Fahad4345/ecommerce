import { toast } from "react-hot-toast";

/**
 * Show a toast
 * @param {string} message - Body of the toast
 * @param {"success"|"error"|"loading"} type - Type of toast
 * @param {number} duration - Duration in ms
 */
export const showToast = (message, type = "success", duration = 3000) => {
  if (type === "success") toast.success(message, { duration });
  else if (type === "error") toast.error(message, { duration });
  else if (type === "loading") toast.loading(message, { duration });
  else toast(message, { duration });
};
