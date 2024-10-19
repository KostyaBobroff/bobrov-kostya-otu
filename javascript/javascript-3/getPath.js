const getSelectorString = (el) => {
  const result = [el.tagName.toLowerCase()];
  el.classList.forEach((className) => {
    result.push(className);
  });

  return result.join(".");
};

const getChildPseudoSelector = (curElement) => {
  if (!curElement.parentElement) {
    return "";
  }

  if (curElement.parentElement.children.length < 2) {
    return "";
  }

  if (curElement.parentElement.firstElementChild === curElement) {
    return ":first-child";
  }

  if (curElement.parentElement.lastElementChild === curElement) {
    return ":last-child";
  }

  let counter = 0;

  for (let i = 0; i < curElement.parentElement.children.length; i++) {
    const childElement = curElement.parentElement.children[i];
    if (childElement === curElement) {
      counter = i + 1;
    }
  }

  return `:nth-child(${counter})`;
};

export const getPath = (element) => {
  let currentElement = element;
  const paths = [];

  while (currentElement && currentElement.tagName !== "BODY") {
    const selectorString = getSelectorString(currentElement);
    const parentElement = currentElement.parentNode;

    const pseudoSelector =
      parentElement && parentElement?.children.length > 1
        ? getChildPseudoSelector(currentElement)
        : "";

    paths.push(`${selectorString}${pseudoSelector}`);
    currentElement = parentElement;
  }

  paths.push("body");

  return paths.reverse().join(" ");
};
