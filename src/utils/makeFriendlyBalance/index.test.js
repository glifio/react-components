import { FilecoinNumber } from '@glif/filecoin-number'
import { makeFriendlyBalance } from '.'

describe('makeFriendlyBalance', () => {
  test('it throws an error if no value is passed', () => {
    expect(() => makeFriendlyBalance()).toThrow()
  })

  test('it throws an error if it receives a NaN value', () => {
    expect(() => makeFriendlyBalance(new FilecoinNumber(NaN, 'fil'))).toThrow()
  })

  test('it returns "< number" when the decimal is smaller than the num of dps passed', () => {
    expect(
      makeFriendlyBalance(new FilecoinNumber('0.00001', 'fil'), 2)
    ).toEqual('< 0.01')

    expect(
      makeFriendlyBalance(
        new FilecoinNumber('0.01104953007959368107188269908', 'fil'),
        2
      )
    ).toEqual('0.01')

    expect(
      makeFriendlyBalance(new FilecoinNumber('0.0000000001230500054', 'fil'), 6)
    ).toEqual('< 0.000001')

    expect(
      makeFriendlyBalance(new FilecoinNumber('0.00001', 'fil'), 5)
    ).toEqual('0.00001')

    expect(
      makeFriendlyBalance(
        new FilecoinNumber('0.0000000001230500054', 'fil'),
        16
      )
    ).toEqual('0.00000000012305')
  })

  test('it prettifies numbers between 1-1000', () => {
    expect(makeFriendlyBalance(new FilecoinNumber('1', 'fil'), 3)).toEqual('1')
    expect(makeFriendlyBalance(new FilecoinNumber('1.2', 'fil'), 3)).toEqual(
      '1.2'
    )
    expect(makeFriendlyBalance(new FilecoinNumber('1.23', 'fil'), 3)).toEqual(
      '1.23'
    )
    expect(makeFriendlyBalance(new FilecoinNumber('10', 'fil'), 3)).toEqual(
      '10'
    )
    expect(makeFriendlyBalance(new FilecoinNumber('10.2', 'fil'), 3)).toEqual(
      '10.2'
    )
    expect(makeFriendlyBalance(new FilecoinNumber('10.234', 'fil'), 3)).toEqual(
      '10.234'
    )
    expect(makeFriendlyBalance(new FilecoinNumber('100', 'fil'), 16)).toEqual(
      '100'
    )
    expect(
      makeFriendlyBalance(new FilecoinNumber('100.000124', 'fil'), 4)
    ).toEqual('100.0001')
    expect(
      makeFriendlyBalance(new FilecoinNumber('100.000124', 'fil'), 5)
    ).toEqual('100.00012')
    expect(
      makeFriendlyBalance(new FilecoinNumber('100.000124', 'fil'), 7)
    ).toEqual('100.000124')

    expect(makeFriendlyBalance(new FilecoinNumber('1000', 'fil'), 7)).toEqual(
      '1K'
    )
    expect(
      makeFriendlyBalance(new FilecoinNumber('1000.23', 'fil'), 3)
    ).toEqual('1K')
  })

  test('it adds max 3 approximation points and "K" to the end of numbers between 1000 and 999999.9999.....', () => {
    expect(makeFriendlyBalance(new FilecoinNumber('100002', 'fil'), 7)).toEqual(
      '100.002K'
    )
    expect(
      makeFriendlyBalance(new FilecoinNumber('100202.02343267', 'fil'), 7)
    ).toEqual('100.202K')
    expect(
      makeFriendlyBalance(new FilecoinNumber('10002.02343267', 'fil'), 7)
    ).toEqual('10.002K')
    expect(
      makeFriendlyBalance(new FilecoinNumber('100102.23', 'fil'), 7)
    ).toEqual('100.102K')
    expect(
      makeFriendlyBalance(new FilecoinNumber('100999.3', 'fil'), 7)
    ).toEqual('100.999K')
    expect(
      makeFriendlyBalance(new FilecoinNumber('100999.3', 'fil'), 7)
    ).toEqual('100.999K')
    expect(
      makeFriendlyBalance(new FilecoinNumber('1002.02343267', 'fil'), 7)
    ).toEqual('1.002K')
  })

  test('it adds max 3 approximation points and "M" to the end of numbers between 1000000 and 999999999.9999.....', () => {
    expect(
      makeFriendlyBalance(new FilecoinNumber('1202000', 'fil'), 7)
    ).toEqual('1.202M')
    expect(
      makeFriendlyBalance(new FilecoinNumber('12020002.2345', 'fil'), 7)
    ).toEqual('12.02M')
    expect(
      makeFriendlyBalance(new FilecoinNumber('100002000', 'fil'), 7)
    ).toEqual('100.002M')
    expect(
      makeFriendlyBalance(new FilecoinNumber('100002000.02343267', 'fil'), 7)
    ).toEqual('100.002M')
    expect(
      makeFriendlyBalance(new FilecoinNumber('100102000', 'fil'), 7)
    ).toEqual('100.102M')
    expect(
      makeFriendlyBalance(new FilecoinNumber('100999000', 'fil'), 7)
    ).toEqual('100.999M')
  })

  test('it adds max 3 approximation points and "B" to the end of numbers between 1000000000 and 999999999999.9999.....', () => {
    expect(
      makeFriendlyBalance(new FilecoinNumber('100002000234', 'fil'), 7)
    ).toEqual('100.002B')
    expect(
      makeFriendlyBalance(new FilecoinNumber('100002001230.02343267', 'fil'), 7)
    ).toEqual('100.002B')
    expect(
      makeFriendlyBalance(new FilecoinNumber('100102000432', 'fil'), 7)
    ).toEqual('100.102B')
  })

  test('it handles positive values', () => {
    // Zero
    expect(makeFriendlyBalance(new FilecoinNumber('0', 'fil'))).toEqual('0')

    // Decimals
    expect(
      makeFriendlyBalance(new FilecoinNumber('0.123456789', 'fil'), 0)
    ).toEqual('> 0')
    expect(
      makeFriendlyBalance(new FilecoinNumber('0.0123456789', 'fil'), 1)
    ).toEqual('< 0.1')
    expect(
      makeFriendlyBalance(new FilecoinNumber('0.123456789', 'fil'), 1)
    ).toEqual('0.1')
    expect(
      makeFriendlyBalance(new FilecoinNumber('0.123456789', 'fil'), 2)
    ).toEqual('0.12')
    expect(
      makeFriendlyBalance(new FilecoinNumber('0.123456789', 'fil'), 3)
    ).toEqual('0.123')
    expect(
      makeFriendlyBalance(new FilecoinNumber('1.23456789', 'fil'), 0)
    ).toEqual('1')
    expect(
      makeFriendlyBalance(new FilecoinNumber('1.23456789', 'fil'), 1)
    ).toEqual('1.2')
    expect(
      makeFriendlyBalance(new FilecoinNumber('1.23456789', 'fil'), 2)
    ).toEqual('1.23')
    expect(
      makeFriendlyBalance(new FilecoinNumber('1.23456789', 'fil'), 3)
    ).toEqual('1.234')

    // Less then 1000
    expect(
      makeFriendlyBalance(new FilecoinNumber('1.23456789', 'fil'))
    ).toEqual('1.2345')
    expect(
      makeFriendlyBalance(new FilecoinNumber('12.3456789', 'fil'))
    ).toEqual('12.3456')
    expect(
      makeFriendlyBalance(new FilecoinNumber('123.456789', 'fil'))
    ).toEqual('123.4567')

    // Thousands
    expect(
      makeFriendlyBalance(new FilecoinNumber('1234.56789', 'fil'))
    ).toEqual('1.234K')
    expect(
      makeFriendlyBalance(new FilecoinNumber('12345.6789', 'fil'))
    ).toEqual('12.345K')
    expect(
      makeFriendlyBalance(new FilecoinNumber('123456.789', 'fil'))
    ).toEqual('123.456K')

    // Millions
    expect(
      makeFriendlyBalance(new FilecoinNumber('1234567.89', 'fil'))
    ).toEqual('1.234M')
    expect(
      makeFriendlyBalance(new FilecoinNumber('12345678.9', 'fil'))
    ).toEqual('12.345M')
    expect(makeFriendlyBalance(new FilecoinNumber('123456789', 'fil'))).toEqual(
      '123.456M'
    )

    // Billions
    expect(
      makeFriendlyBalance(new FilecoinNumber('1234567890', 'fil'))
    ).toEqual('1.234B')
    expect(
      makeFriendlyBalance(new FilecoinNumber('12345678900', 'fil'))
    ).toEqual('12.345B')
    expect(
      makeFriendlyBalance(new FilecoinNumber('123456789000', 'fil'))
    ).toEqual('123.456B')

    // Trillions
    expect(
      makeFriendlyBalance(new FilecoinNumber('1234567890000', 'fil'))
    ).toEqual('> 999.9B')
  })

  test('it handles negative values', () => {
    // Zero
    expect(makeFriendlyBalance(new FilecoinNumber('-0', 'fil'))).toEqual('0')

    // Decimals
    expect(
      makeFriendlyBalance(new FilecoinNumber('-0.123456789', 'fil'), 0)
    ).toEqual('< 0')
    expect(
      makeFriendlyBalance(new FilecoinNumber('-0.0123456789', 'fil'), 1)
    ).toEqual('> -0.1')
    expect(
      makeFriendlyBalance(new FilecoinNumber('-0.123456789', 'fil'), 1)
    ).toEqual('-0.1')
    expect(
      makeFriendlyBalance(new FilecoinNumber('-0.123456789', 'fil'), 2)
    ).toEqual('-0.12')
    expect(
      makeFriendlyBalance(new FilecoinNumber('-0.123456789', 'fil'), 3)
    ).toEqual('-0.123')
    expect(
      makeFriendlyBalance(new FilecoinNumber('-1.23456789', 'fil'), 0)
    ).toEqual('-1')
    expect(
      makeFriendlyBalance(new FilecoinNumber('-1.23456789', 'fil'), 1)
    ).toEqual('-1.2')
    expect(
      makeFriendlyBalance(new FilecoinNumber('-1.23456789', 'fil'), 2)
    ).toEqual('-1.23')
    expect(
      makeFriendlyBalance(new FilecoinNumber('-1.23456789', 'fil'), 3)
    ).toEqual('-1.234')

    // Less then 1000
    expect(
      makeFriendlyBalance(new FilecoinNumber('-1.23456789', 'fil'))
    ).toEqual('-1.2345')
    expect(
      makeFriendlyBalance(new FilecoinNumber('-12.3456789', 'fil'))
    ).toEqual('-12.3456')
    expect(
      makeFriendlyBalance(new FilecoinNumber('-123.456789', 'fil'))
    ).toEqual('-123.4567')

    // Thousands
    expect(
      makeFriendlyBalance(new FilecoinNumber('-1234.56789', 'fil'))
    ).toEqual('-1.234K')
    expect(
      makeFriendlyBalance(new FilecoinNumber('-12345.6789', 'fil'))
    ).toEqual('-12.345K')
    expect(
      makeFriendlyBalance(new FilecoinNumber('-123456.789', 'fil'))
    ).toEqual('-123.456K')

    // Millions
    expect(
      makeFriendlyBalance(new FilecoinNumber('-1234567.89', 'fil'))
    ).toEqual('-1.234M')
    expect(
      makeFriendlyBalance(new FilecoinNumber('-12345678.9', 'fil'))
    ).toEqual('-12.345M')
    expect(
      makeFriendlyBalance(new FilecoinNumber('-123456789', 'fil'))
    ).toEqual('-123.456M')

    // Billions
    expect(
      makeFriendlyBalance(new FilecoinNumber('-1234567890', 'fil'))
    ).toEqual('-1.234B')
    expect(
      makeFriendlyBalance(new FilecoinNumber('-12345678900', 'fil'))
    ).toEqual('-12.345B')
    expect(
      makeFriendlyBalance(new FilecoinNumber('-123456789000', 'fil'))
    ).toEqual('-123.456B')

    // Trillions
    expect(
      makeFriendlyBalance(new FilecoinNumber('-1234567890000', 'fil'))
    ).toEqual('< -999.9B')
  })
})
