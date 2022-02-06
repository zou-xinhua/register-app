import React from 'react';
import { render, screen, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import '../../mock.js';

import SuccessFeedback from './index.js';

let container = null;
beforeEach(() => {
  // 创建一个 DOM 元素作为渲染目标
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // 退出时进行清理
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('modal open after click', async () =>{
  act(() => {
    render(<SuccessFeedback visible={true} onOK={() => {}}></SuccessFeedback>, container);
  });
  const title = document.querySelector("[data-testid=title]");
  expect(title.innerHTML).toBe("All done!");
  const button = document.querySelector("[data-testid=button]");
  expect(button.innerHTML).toBe("<span>OK</span>");
  act(() => {
    button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  })
})