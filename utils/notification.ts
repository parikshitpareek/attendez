import toast from 'react-hot-toast';

const createToast = (message: string) => {
  let newToast = toast.loading(message);
  return newToast;
};

const updateSuccessToast = (id: string, message: string) => {
  toast.success(message, {
    id: id,
  });
};

const updateErrorToast = (id: string, message: string) => {
  toast.error(message, {
    id: id,
  });
};

export { createToast, updateErrorToast, updateSuccessToast };
