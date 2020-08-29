const delay = (timeMs: number = 1000) =>
  new Promise((resolve) => setTimeout(resolve, timeMs))

export default delay
