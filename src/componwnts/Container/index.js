import React, { useState } from "react";
import './index.css';
import { Button } from 'antd';
import FormModal from '../FormModal';

const Container = () => {
  const [visible, setVisible1] = useState(false);
  return(<div id="container">
      <div id="main">
        <div className="title">A better way to enjoy every day.</div>
        <div className="sub">Be the first to known when we launch.</div>
        <Button type="primary" onClick={() => setVisible1(true)} data-testid="button">Request an invite</Button>
        <FormModal title="Basic Modal" visible={ visible } onCancel={() => setVisible1(false)}></FormModal>
      </div>
    </div>)
}

export default Container;