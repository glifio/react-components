import { decodeActorCID } from '.'

describe('decodeActorCID', () => {
  test('it reads from the built-in actor registry for testnet', async () => {
    expect(
      decodeActorCID({
        '/': 'bafk2bzaceaqrkllksxv2jsfgjvmuewx5vbzrammw5mdscod6gkdr3ijih2q64'
      })
    ).toBe('system')
    expect(
      decodeActorCID({
        '/': 'bafk2bzaceadyfilb22bcvzvnpzbg2lyg6npmperyq6es2brvzjdh5rmywc4ry'
      })
    ).toBe('init')
    expect(
      decodeActorCID({
        '/': 'bafk2bzaceaxlezmclw5ugldhhtfgvn7yztux45scqik3ez4yhwiqhg5ssib44'
      })
    ).toBe('cron')
    expect(
      decodeActorCID({
        '/': 'bafk2bzacecruossn66xqbeutqx5r4k2kjzgd43frmwd4qkw6haez44ubvvpxo'
      })
    ).toBe('account')
    expect(
      decodeActorCID({
        '/': 'bafk2bzacecpwr4mynn55bg5hrlns3osvg7sty3rca6zlai3vl52vbbjk7ulfa'
      })
    ).toBe('storagepower')
    expect(
      decodeActorCID({
        '/': 'bafk2bzacea6rabflc7kpwr6y4lzcqsnuahr4zblyq3rhzrrsfceeiw2lufrb4'
      })
    ).toBe('storageminer')
    expect(
      decodeActorCID({
        '/': 'bafk2bzacebotg5coqnglzsdrqxtkqk2eq4krxt6zvds3i3vb2yejgxhexl2n6'
      })
    ).toBe('storagemarket')
    expect(
      decodeActorCID({
        '/': 'bafk2bzaceblot4pemhfgwb3lceellwrpgxaqkpselzbpqu32maffpopdunlha'
      })
    ).toBe('paymentchannel')
    expect(
      decodeActorCID({
        '/': 'bafk2bzacec66wmb4kohuzvuxsulhcgiwju7sqkldwfpmmgw7dbbwgm5l2574q'
      })
    ).toBe('multisig')
    expect(
      decodeActorCID({
        '/': 'bafk2bzaceayah37uvj7brl5no4gmvmqbmtndh5raywuts7h6tqbgbq2ge7dhu'
      })
    ).toBe('reward')
    expect(
      decodeActorCID({
        '/': 'bafk2bzaceaihibfu625lbtzdp3tcftscshrmbgghgrc7kzqhxn4455pycpdkm'
      })
    ).toBe('verifiedregistry')

    expect(true).toBe(true)
  })
})
