import { decodeActorCID } from '.'
import { Network } from '../../services/EnvironmentProvider'

describe('decodeActorCID', () => {
  test('it reads from the built-in actor registry for testnet', async () => {
    expect(
      decodeActorCID(
        {
          '/': 'bafk2bzaceaqrkllksxv2jsfgjvmuewx5vbzrammw5mdscod6gkdr3ijih2q64'
        },
        Network.CALIBRATION
      )
    ).toBe('system')
    expect(
      decodeActorCID(
        {
          '/': 'bafk2bzaceadyfilb22bcvzvnpzbg2lyg6npmperyq6es2brvzjdh5rmywc4ry'
        },
        Network.CALIBRATION
      )
    ).toBe('init')
    expect(
      decodeActorCID(
        {
          '/': 'bafk2bzaceaxlezmclw5ugldhhtfgvn7yztux45scqik3ez4yhwiqhg5ssib44'
        },
        Network.CALIBRATION
      )
    ).toBe('cron')
    expect(
      decodeActorCID(
        {
          '/': 'bafk2bzacecruossn66xqbeutqx5r4k2kjzgd43frmwd4qkw6haez44ubvvpxo'
        },
        Network.CALIBRATION
      )
    ).toBe('account')
    expect(
      decodeActorCID(
        {
          '/': 'bafk2bzacecpwr4mynn55bg5hrlns3osvg7sty3rca6zlai3vl52vbbjk7ulfa'
        },
        Network.CALIBRATION
      )
    ).toBe('storagepower')
    expect(
      decodeActorCID(
        {
          '/': 'bafk2bzacea6rabflc7kpwr6y4lzcqsnuahr4zblyq3rhzrrsfceeiw2lufrb4'
        },
        Network.CALIBRATION
      )
    ).toBe('storageminer')
    expect(
      decodeActorCID(
        {
          '/': 'bafk2bzacebotg5coqnglzsdrqxtkqk2eq4krxt6zvds3i3vb2yejgxhexl2n6'
        },
        Network.CALIBRATION
      )
    ).toBe('storagemarket')
    expect(
      decodeActorCID(
        {
          '/': 'bafk2bzaceblot4pemhfgwb3lceellwrpgxaqkpselzbpqu32maffpopdunlha'
        },
        Network.CALIBRATION
      )
    ).toBe('paymentchannel')
    expect(
      decodeActorCID(
        {
          '/': 'bafk2bzacec66wmb4kohuzvuxsulhcgiwju7sqkldwfpmmgw7dbbwgm5l2574q'
        },
        Network.CALIBRATION
      )
    ).toBe('multisig')
    expect(
      decodeActorCID(
        {
          '/': 'bafk2bzaceayah37uvj7brl5no4gmvmqbmtndh5raywuts7h6tqbgbq2ge7dhu'
        },
        Network.CALIBRATION
      )
    ).toBe('reward')
    expect(
      decodeActorCID(
        {
          '/': 'bafk2bzaceaihibfu625lbtzdp3tcftscshrmbgghgrc7kzqhxn4455pycpdkm'
        },
        Network.CALIBRATION
      )
    ).toBe('verifiedregistry')
  })

  test('it decodes v7 actors', () => {
    const decoded = decodeActorCID(
      'bafkqadtgnfwc6njpnv2wy5djonuwo',
      Network.CALIBRATION
    )
    expect(decoded).toBe('multisig')
  })
})
