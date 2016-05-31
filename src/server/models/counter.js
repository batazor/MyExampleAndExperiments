let counter = 1

export const increase = () => {
  return ({
    number: ++counter
  })
}

export const dicrease = () => {
  return ({
    number: --counter
  })
}

export const getCounter = () => {
  return ({
    number: counter
  })
}
