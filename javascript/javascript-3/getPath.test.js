import { getPath } from "./getPath";

test("getPath correct", () => {
  document.body.innerHTML =
    "<div>" +
    '  <span id="username" >Hi all</span>' +
    '  <button id="button" class="class-1 class-2" />' +
    "</div>";

  const val = document.querySelector("#button");
  const result = getPath(val);
  expect(result).toEqual("body div button.class-1.class-2:last-child");
  expect(document.querySelector(result)).toEqual(val);
});

test("getPath correct list search", () => {
  document.body.innerHTML =
    "<div>" +
    '  <button id="button" class="hi all" >Some button</button>' +
    "  <ul>" +
    '     <li class="some-class active" id="first">1</li>' +
    '     <li class="some-class " >2</li>' +
    '     <li class="some-class" id="result">3</li>' +
    '     <li class="some-class" id="last">4</li>' +
    "  </ul>" +
    "</div>";

  const el = document.querySelector("#result");
  const result = getPath(el);
  expect(result).toEqual("body div ul:last-child li.some-class:nth-child(3)");
  expect(document.querySelector(result)).toEqual(el);

  const firstEl = document.querySelector("#first");
  const newResult = getPath(firstEl);
  expect(newResult).toEqual(
    "body div ul:last-child li.some-class.active:first-child",
  );
  expect(document.querySelector(newResult)).toEqual(firstEl);

  const lastEl = document.querySelector("#last");
  const lastResult = getPath(lastEl);
  expect(lastResult).toEqual("body div ul:last-child li.some-class:last-child");
  expect(document.querySelector(lastResult)).toEqual(lastEl);
});

test("getPath correct super-complex", () => {
  document.body.innerHTML =
    "<div>" +
    "  <div>" +
    '     <p class="paragraph" id="first-p">some text</p>  ' +
    '     <div class="some-class" id="first-div" >1</div>' +
    '     <div class="some-class" id="second-div">2</div>' +
    '     <div class="some-class">3</div>' +
    '     <div class="some-class" id="last-div">4</div>' +
    '     <p id="last-p">some text 2</p>  ' +
    "  </div>" +
    "</div>";

  const firstP = document.querySelector("#first-p");
  const firstPResult = getPath(firstP);
  expect(firstPResult).toEqual("body div div p.paragraph:first-child");
  expect(document.querySelector(firstPResult)).toEqual(firstP);

  const lastP = document.querySelector("#last-p");
  const lastPResult = getPath(lastP);
  expect(lastPResult).toEqual("body div div p:last-child");
  expect(document.querySelector(lastPResult)).toEqual(lastP);

  const lastDiv = document.querySelector("#last-div");
  const lastDivResult = getPath(lastDiv);
  expect(lastDivResult).toEqual("body div div div.some-class:nth-child(5)");
  expect(document.querySelector(lastDivResult)).toEqual(lastDiv);

  const firstDiv = document.querySelector("#first-div");
  const firstDivResult = getPath(firstDiv);
  expect(firstDivResult).toEqual("body div div div.some-class:nth-child(2)");
  expect(document.querySelector(firstDivResult)).toEqual(firstDiv);

  const secondDiv = document.querySelector("#second-div");
  const secondDivResult = getPath(secondDiv);
  expect(secondDivResult).toEqual("body div div div.some-class:nth-child(3)");
  expect(document.querySelector(secondDivResult)).toEqual(secondDiv);
});
