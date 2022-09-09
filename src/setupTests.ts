import "@testing-library/jest-dom";

// We need to re-assign window.setImmediate as socket.io fails to use it
// @ts-ignore
window.setImmediate = () => {};
