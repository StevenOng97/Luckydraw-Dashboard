import classnames from "classnames";
import React, { FC, useState, useEffect } from "react";
import { Theme, useTheme } from "../../theme/ThemeContext";

interface IToastProps {
  text?: string;
  time?: number;
  isAutoClosed?: boolean;
  isOpen?: boolean;
}

const Toast: FC<IToastProps> = ({
  text = "Error",
  time = 3000,
  isAutoClosed = true,
  isOpen,
}) => {
  const [open, setOpen] = useState(isOpen);

  const { theme } = useTheme();

  useEffect(() => {
    if (isAutoClosed) {
      setTimeout(() => {
        setOpen(false);
      }, time);
    }
  }, []);

  const toastWrapperClassname = classnames(
    "flex justify-center fixed bottom-5 left-1/2 items-center p-4  w-full max-w-xs text-gray-500 bg-red-500 rounded-lg shadow duration-300",
    {
      ["-translate-x-1/2"]: theme === Theme.NotToggled,
      ["opacity-0"]: !open,
    }
  );

  return (
    <div id="toast-danger" className={toastWrapperClassname} role="alert">
      <div className="text-white text-sm font-bold">{text}</div>
    </div>
  );
};

export default Toast;
