import React from 'react'
import Box from '../../Box'
import Warning from '../../Warning'

export default function BurnerWalletWarning({
  back,
  next
}: {
  back: () => void
  next: () => void
}) {
  return (
    <Box display='flex' flexDirection='column' justifyContent='center'>
      <Warning
        title='Warning'
        description='We do not recommend you use this burner wallet to hold or transact significant sums of Filecoin. For significant sums, Glif Sender should be used with a non-burner wallet.'
        linkDisplay="Why isn't it secure?"
        linkhref='https://coinsutra.com/security-risks-bitcoin-wallets/'
        onBack={back}
        onAccept={next}
      />
    </Box>
  )
}
