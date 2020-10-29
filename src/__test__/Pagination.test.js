import React from "react";
import { render, screen } from "@testing-library/react";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Pagination from "../Pagination";

configure({ adapter: new Adapter() });

test("Adds three pages", () => {
  const onChangePage = () => {};
  let items = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
    { id: 7 },
    { id: 8 },
    { id: 9 },
    { id: 10 },
    { id: 11 },
    { id: 12 },
    { id: 13 },
    { id: 14 },
    { id: 15 },
  ];
  render(<Pagination items={items} pageSize={5} onChangePage={onChangePage} />);

  const toFirstBtnElement = screen.getByTestId("toFirstPageBtn");
  const toPrevBtnElement = screen.getByTestId("toPrevPageBtn");
  const firstBtnElement = screen.getByTestId("button1");
  const secondBtnElement = screen.getByTestId("button2");
  const thirdBtnElement = screen.getByTestId("button3");
  const fourthBtnElement = screen.queryByTestId("button4");
  const toNextBtnElement = screen.getByTestId("toNextPageBtn");
  const toLastBtnElement = screen.getByTestId("toLastPageBtn");
  expect(toFirstBtnElement.innerHTML).toContain("Första");
  expect(toPrevBtnElement.innerHTML).toContain("&lt;&lt;");
  expect(firstBtnElement.innerHTML).toContain("1");
  expect(secondBtnElement.innerHTML).toContain("2");
  expect(thirdBtnElement.innerHTML).toContain("3");
  expect(fourthBtnElement).toBeNull();
  expect(toNextBtnElement.innerHTML).toContain("&gt;&gt;");
  expect(toLastBtnElement.innerHTML).toContain("Sista");
});

test("Adds one page", () => {
  const onChangePage = () => {};
  let items = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
    { id: 7 },
    { id: 8 },
    { id: 9 },
    { id: 10 },
    { id: 11 },
    { id: 12 },
    { id: 13 },
    { id: 14 },
    { id: 15 },
  ];
  render(
    <Pagination items={items} pageSize={15} onChangePage={onChangePage} />
  );

  const toFirstBtnElement = screen.queryByTestId("toFirstPageBtn");
  const toPrevBtnElement = screen.queryByTestId("toPrevPageBtn");
  const firstBtnElement = screen.queryByTestId("button1");
  const toNextBtnElement = screen.queryByTestId("toNextPageBtn");
  const toLastBtnElement = screen.queryByTestId("toLastPageBtn");
  expect(toFirstBtnElement).toBeNull();
  expect(toPrevBtnElement).toBeNull();
  expect(firstBtnElement).toBeNull();
  expect(toNextBtnElement).toBeNull();
  expect(toLastBtnElement).toBeNull();
});

test("Adds one page without buttons", () => {
  const onChangePage = () => {};
  let items = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
    { id: 7 },
    { id: 8 },
    { id: 9 },
    { id: 10 },
    { id: 11 },
    { id: 12 },
    { id: 13 },
    { id: 14 },
    { id: 15 },
  ];
  render(
    <Pagination items={items} pageSize={15} onChangePage={onChangePage} />
  );

  const toFirstBtnElement = screen.queryByTestId("toFirstPageBtn");
  const toPrevBtnElement = screen.queryByTestId("toPrevPageBtn");
  const firstBtnElement = screen.queryByTestId("button1");
  const toNextBtnElement = screen.queryByTestId("toNextPageBtn");
  const toLastBtnElement = screen.queryByTestId("toLastPageBtn");
  expect(toFirstBtnElement).toBeNull();
  expect(toPrevBtnElement).toBeNull();
  expect(firstBtnElement).toBeNull();
  expect(toNextBtnElement).toBeNull();
  expect(toLastBtnElement).toBeNull();
});

test("verify state change", () => {
  let onChangePage = jest.fn();
  let items = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
    { id: 7 },
    { id: 8 },
    { id: 9 },
    { id: 10 },
    { id: 11 },
    { id: 12 },
    { id: 13 },
    { id: 14 },
    { id: 15 },
  ];

  let wrapper = shallow(
    <Pagination items={items} pageSize={5} onChangePage={onChangePage} />
  );

  const setPageSpy = jest.spyOn(wrapper.instance(), "setPage");
  //  const changePageSpy = jest.spyOn(wrapper.props(), "onChangePage");
  const page1State = {
    pager: {
      currentPage: 1,
      endIndex: 4,
      endPage: 3,
      pageSize: 5,
      pages: [1, 2, 3],
      startIndex: 0,
      startPage: 1,
      totalItems: 15,
      totalPages: 3,
    },
  };
  const page2State = {
    pager: {
      currentPage: 2,
      endIndex: 9,
      endPage: 3,
      pageSize: 5,
      pages: [1, 2, 3],
      startIndex: 5,
      startPage: 1,
      totalItems: 15,
      totalPages: 3,
    },
  };
  const page3State = {
    pager: {
      currentPage: 3,
      endIndex: 14,
      endPage: 3,
      pageSize: 5,
      pages: [1, 2, 3],
      startIndex: 10,
      startPage: 1,
      totalItems: 15,
      totalPages: 3,
    },
  };
  const expectedPageOfItems1 = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
  ];
  const expectedPageOfItems2 = [
    { id: 6 },
    { id: 7 },
    { id: 8 },
    { id: 9 },
    { id: 10 },
  ];
  const expectedPageOfItems3 = [
    { id: 11 },
    { id: 12 },
    { id: 13 },
    { id: 14 },
    { id: 15 },
  ];
  
  expect(wrapper.state()).toEqual(page1State);
  expect(onChangePage).toHaveBeenCalledWith(expectedPageOfItems1);

  wrapper.find("#button2").simulate("click");
  expect(setPageSpy).toHaveBeenCalledWith(2);
  expect(wrapper.state()).toEqual(page2State);
  expect(onChangePage).toHaveBeenCalledWith(expectedPageOfItems2);

  wrapper.find("#button3").simulate("click");
  expect(setPageSpy).toHaveBeenCalledWith(3);
  expect(wrapper.state()).toEqual(page3State);
  expect(onChangePage).toHaveBeenCalledWith(expectedPageOfItems3);

  wrapper.find("#button1").simulate("click");
  expect(setPageSpy).toHaveBeenCalledWith(1);
  expect(wrapper.state()).toEqual(page1State);
  expect(onChangePage).toHaveBeenCalledWith(expectedPageOfItems1);

  wrapper.find("#toNextPageBtn").simulate("click");
  expect(setPageSpy).toHaveBeenCalledWith(2);
  expect(wrapper.state()).toEqual(page2State);
  expect(onChangePage).toHaveBeenCalledWith(expectedPageOfItems2);

  wrapper.find("#toLastPageBtn").simulate("click");
  expect(setPageSpy).toHaveBeenCalledWith(3);
  expect(wrapper.state()).toEqual(page3State);
  expect(onChangePage).toHaveBeenCalledWith(expectedPageOfItems3);

  wrapper.find("#toPrevPageBtn").simulate("click");
  expect(setPageSpy).toHaveBeenCalledWith(2);
  expect(wrapper.state()).toEqual(page2State);
  expect(onChangePage).toHaveBeenCalledWith(expectedPageOfItems2);

  wrapper.find("#toFirstPageBtn").simulate("click");
  expect(setPageSpy).toHaveBeenCalledWith(1);
  expect(wrapper.state()).toEqual(page1State);
  expect(onChangePage).toHaveBeenCalledWith(expectedPageOfItems1);
});
