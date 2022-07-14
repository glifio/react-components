const unix = jest.fn().mockImplementation(() => {
  return {
    format: fmt => {
      if (fmt === 'YYYY-MM-DD') return '2020-01-12'
      if (fmt === 'MMM DD, YYYY') return 'Jan 12, 2020'
      if (fmt === 'HH:mm:ss') return '2:30:30'
      if (fmt === 'MMM DD, YYYY - HH:mm:ss') return 'Jan 12, 2020 - 2:30:30'
    }
  }
})

const fromNow = jest
  .fn()
  .mockImplementation(hidePrefix => (hidePrefix ? '10 days' : 'in 10 days'))

const extend = jest.fn()

const add = jest.fn().mockImplementation(() => dayjs())

const dayjs = () => {
  return {
    add,
    unix,
    extend,
    fromNow
  }
}

dayjs.unix = unix
dayjs.extend = extend
dayjs.add = add

module.exports = dayjs
