import { getIcon } from "@utils/icons";
import React from "react";
import styles from "./Toaster.module.css"; // Import the CSS Modules

type Props = {
  toastList: any;
  position: string;
  autoDelete?: boolean;
  autoDeleteTime?: number;
};
export type ToastList = {
  title: string;
  description?: string;
  backgroundColor?: string;
  icon?: string;
  type: string;
};

const chooseIcon = (type: string) => {
  const icons: { [index: string]: any } = {
    success: getIcon("success"),
    error: getIcon("error"),
    warning: getIcon("warning"),
    info: getIcon("info"),
  };
  return icons[type];
};

const chooseColor = (type: string) => {
  const colors: { [index: string]: any } = {
    success: "#5cb85c",
    error: "#d9534f",
    warning: "#f0ad4e",
    info: "#5bc0de",
  };
  return colors[type];
};

const Toast = ({ position = "top-center", toastList, autoDelete = true, autoDeleteTime = 5000 }: Props) => {
  const [list, setList] = React.useState(toastList);
  React.useEffect(() => {
    setList(toastList);
  }, [toastList, list]);

  const deleteToast = React.useCallback(
    (index: number): void => {
      const listItemIndex = list.findIndex((e: { id: number }) => e.id === index);
      const toastListItem = toastList.findIndex((e: { id: number }) => e.id === index);
      list.splice(listItemIndex, 1);
      toastList.splice(toastListItem, 1);
      setList([...list]);
    },
    [list, toastList]
  );

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (autoDelete && toastList.length && list.length) {
        deleteToast(toastList[0].id);
      }
    }, autoDeleteTime);
    return () => {
      clearInterval(interval);
    };
  }, [toastList, autoDelete, autoDeleteTime, list, deleteToast]);

  return (
    <React.Fragment>
      <div className={`${styles["toast-body"]} ${position}`}>
        {list?.map((toast: ToastList, index: number) => (
          <div
            key={index}
            className={`${position} flex flex-row justify-between items-center p-3 text-white shadow-xl rounded m-2 gap-6 cursor-pointer`}
            style={{
              backgroundColor: toast.backgroundColor ? toast.backgroundColor : chooseColor(toast.type),
            }}
          >
            <div className="text-2xl">{toast.icon ? toast.icon : chooseIcon(toast.type)}</div>
            <div className="">
              <p className="font-bold">{toast.title}</p>
              {toast.description && <p className="notification-message">{toast.description}</p>}
            </div>
            <div className="text-xs cursor-pointer text-slate-200" onClick={() => deleteToast(index)}>
              {getIcon("close")}
            </div>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
};

export default Toast;
