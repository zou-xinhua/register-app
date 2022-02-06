import React from 'react';
import { fireEvent, screen, act } from "@testing-library/react";
import { render, unmountComponentAtNode } from "react-dom";
import axios from 'axios';
import FormModal from './index.js';
import '../../mock.js';


const fakeResponse = { status: 200};
const fakeError = {satus: 400, response: {data: { errorMessage: 'Bad Request:error'}}}

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

it('register successfully', async() =>{
  jest.spyOn(axios, "post").mockImplementation(() =>
    Promise.resolve(fakeResponse)
  );

  act(() => {
    render(<FormModal visible={true} onCancel={() => {}} />, container);
  })
  act(() => {
    fireEvent.change(screen.getByTestId("name"), {
      target: {value: 'name1'}
    })
  })
  act(() => {
    fireEvent.change(screen.getByTestId("email"), {
      target: {value: 'email@163.com'}
    })
  })
  act(() => {
    fireEvent.change(screen.getByTestId("confirm-email"), {
      target: {value: 'email@163.com'}
    })
  })
  await act(async () => {
    fireEvent.click(screen.getByTestId('form-button'))
  })
  axios.post.mockRestore()
})

test('register error', async () => {
  jest.spyOn(axios, "post").mockImplementation(() =>
    Promise.reject(fakeError)
  );

  act(() => {
    render(<FormModal visible={true} onCancel={() => {}} />, container);
  })
  act(() => {
    fireEvent.change(screen.getByTestId("name"), {
      target: {value: 'name2'}
    })
  })
  act(() => {
    fireEvent.change(screen.getByTestId("email"), {
      target: {value: 'usedemail@airwallex.com'}
    })
  })
  act(() => {
    fireEvent.change(screen.getByTestId("confirm-email"), {
      target: {value: 'usedemail@airwallex.com'}
    })
  })
  await act(async () => {
    fireEvent.click(screen.getByTestId('form-button'))
  })

  const error = await screen.findByRole('error');
  expect(error).toHaveTextContent(/Bad Request/i);
  axios.post.mockRestore();
})
