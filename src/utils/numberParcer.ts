export const numberParcer = (value?: number) =>
  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
