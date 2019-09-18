export const isEmptyString = x => {
  return !x || x.length === 0;
};

export const randomSelection = (input, selectionSize) => {
  if (input.length <= selectionSize) {
    return input;
  }
  let remainingElements = input.slice();
  let pickedElements = [];
  while (selectionSize > 0) {
    const pickedElementIndex = Math.floor(Math.random() * remainingElements.length);
    pickedElements.push(remainingElements[pickedElementIndex]);
    remainingElements.splice(pickedElementIndex, 1);
    selectionSize--;
  }
  return pickedElements;
};