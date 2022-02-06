import React from 'react';
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import '../../mock.js';

import Container from './index.js';

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

it('modal open after click', () =>{
  act(() => {
    render(<Container></Container>, container);
  })
  const button = document.querySelector("[data-testid=button]");
  expect(button.innerHTML).toBe("<span>Request an invite</span>");
  act(() => {
    button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  })
  expect(document.documentElement.outerHTML).toContain('Request an Invite');
})