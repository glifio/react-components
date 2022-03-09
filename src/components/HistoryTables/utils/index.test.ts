import { removeMessageDups } from './index'

describe('utils', () => {
  describe('removeMessageDups', () => {
    test('it removes duplicates in an array', () => {
      const incoming = [
        {
          __ref:
            'MessageConfirmed:{"cid":"bafy2bzacecc7m43kn6qpc24lalpkp3cb7uywqm53ko2r3wwjc6rtyb5qj5bkm"}'
        },
        {
          __ref:
            'MessageConfirmed:{"cid":"bafy2bzacecc7m43kn6qpc24lalpkp3cb7uywqm53ko2r3wwjc6rtyb5qj5bkm"}'
        },
        {
          __ref:
            'MessageConfirmed:{"cid":"bafy2bzacea3kmxlbz7qxajhtxvh6olhx2serhcc2o26zfj4y7gikc2luw7fbk"}'
        },
        {
          __ref:
            'MessageConfirmed:{"cid":"bafy2bzacealhhig6up2b324l7sutqcxetssgzp23u7om2nl5ijhcjdguonw4k"}'
        }
      ]

      const existing = [
        {
          __ref:
            'MessageConfirmed:{"cid":"bafy2bzacecfc5uhuoamjap5sulqzblmswjm54qvh3rrvovt6buvma53s2fki4"}'
        },
        {
          __ref:
            'MessageConfirmed:{"cid":"bafy2bzacebr5eal4iad7e6in6snsicq2q5lxlth4nkcu2mly2xqakqkjxpuxg"}'
        },
        {
          __ref:
            'MessageConfirmed:{"cid":"bafy2bzacecbyk3etpe5qkbqocqojv2hjxkpmfopqraq7plzhedqwglh3rkxc2"}'
        },
        {
          __ref:
            'MessageConfirmed:{"cid":"bafy2bzaced7vyswx2mlj4thtdg7bqzkfhwczoonxevaestsf65hqwukhplbyi"}'
        },
        {
          __ref:
            'MessageConfirmed:{"cid":"bafy2bzaceal3k7nygn4g6ripbkclv6q3fbhhlslwh7gsyegrxgryyd4a3pjdm"}'
        },
        {
          __ref:
            'MessageConfirmed:{"cid":"bafy2bzacebxkslpu74ccxxhduphdxc2y54nd42gjdfwmwiiroqbuja6ditxre"}'
        }
      ]

      expect(
        removeMessageDups(existing, incoming, { offset: 0, limit: 10 }).length
      ).toBe(9)
    })

    test('when offset is 0, it puts incoming in front of existing', () => {
      const incoming = [
        {
          __ref: '0"}'
        },
        {
          __ref: '0"}'
        },
        {
          __ref: '1"}'
        },
        {
          __ref: '2"}'
        }
      ]

      const existing = [
        {
          __ref: '3'
        },
        {
          __ref: '4'
        },
        {
          __ref: '5'
        },
        {
          __ref: '6'
        },
        {
          __ref: '7'
        },
        {
          __ref: '8'
        }
      ]
      const merged = removeMessageDups(existing, incoming, {
        offset: 0,
        limit: 10
      })
      expect(merged.length).toBe(9)
      expect(merged[0]).toBe(incoming[0])
      expect(merged[1]).toBe(incoming[2])
      expect(merged[2]).toBe(incoming[3])
      expect(merged[3]).toBe(existing[0])
      expect(merged[merged.length - 1]).toBe(existing[existing.length - 1])
    })

    test('when offset is > 0, it properly paginates', () => {
      const incoming = [
        {
          __ref: '0"}'
        },
        {
          __ref: '0"}'
        },
        {
          __ref: '1"}'
        },
        {
          __ref: '2"}'
        }
      ]

      const existing = [
        {
          __ref: '3'
        },
        {
          __ref: '4'
        },
        {
          __ref: '5'
        },
        {
          __ref: '6'
        },
        {
          __ref: '7'
        },
        {
          __ref: '8'
        }
      ]
      const merged = removeMessageDups(existing, incoming, {
        offset: 1,
        limit: 10
      })
      expect(merged.length).toBe(9)
      expect(merged[0]).toBe(existing[0])
      expect(merged[1]).toBe(existing[1])
      expect(merged[2]).toBe(existing[2])

      expect(merged[merged.length - 1]).toBe(incoming[incoming.length - 1])
    })
  })
})
