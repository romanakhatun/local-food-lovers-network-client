import { useState } from "react";

const useMessage = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const showError = (message, duration = 5000) => {
    setError(message);
    setTimeout(() => setError(""), duration);
  };

  const showSuccess = (message, duration = 5000) => {
    setSuccess(message);
    setTimeout(() => setSuccess(""), duration);
  };

  return { error, success, showError, showSuccess };
};

export default useMessage;
