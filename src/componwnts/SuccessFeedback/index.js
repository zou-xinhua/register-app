import React, { useState, useEffect } from "react";
import './index.css';
import { Button, Modal } from 'antd';

const SuccessFeedback = (props) => {
  const [visible, setVisible] = useState(props.visible);
  useEffect(() => {
    setVisible(props.visible)
  }, [props.visible]);
  return(
    <Modal visible={ visible } footer={null}>
      <div className="succ-main">
        <div className="succ-title" data-testid="title">All done!</div>
        <div className="succ-content">You will be one of the first to experience Broccoli & Co. when we launch.</div>
        <Button type="primary" block htmlType="submit" data-testid="button" onClick={props.onOK}>
          OK
        </Button>
      </div>
    </Modal>
  )
}

export default SuccessFeedback;