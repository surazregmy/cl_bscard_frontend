import React, { useState } from "react";
import { Modal, message } from "antd";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const DeleteCard = ({ id }) => {
  const axiosPrivate = useAxiosPrivate();

  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOk = async () => {
    setConfirmLoading(true);
    await onDelete();
    setOpen(false);
    setConfirmLoading(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const onDelete = async (values) => {
    axiosPrivate
      .delete(`/developers/${id}`)
      .then(async (response) => {
        setOpen(false);
        setfetAgain(fetAgain + 1);
        message.success("Developer Deleted Successfully");
      })
      .catch(() => {
        message.error("Error in Deleting");
      })
      .finally(() => {
        setOpen(false);
      });
  };
  return (
    <Modal
      title="Confirm"
      open={open}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
    >
      Do you want to Delete? {id}
    </Modal>
  );
};
export default DeleteCard;
