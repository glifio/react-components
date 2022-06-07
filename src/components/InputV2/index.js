import { AddressInput } from './Address'
import { BigIntInput } from './BigInt'
import { ButtonInput } from './Button'
import { FilecoinInput } from './Filecoin'
import { Info } from './Info'
import { NumberInput } from './Number'
import { ParamsInput } from './Params'
import { TextInput, EmailInput, PasswordInput, SearchInput } from './Text'
import { Select } from './Select'
import { SelectNumber } from './SelectNumber'
import { SelectRange } from './SelectRange'
import { Toggle } from './Toggle'
import { SeedPhraseInput } from './SeedPhrase'
import { PrivateKeyInput } from './PrivateKey'

export const InputV2 = {
  Address: AddressInput,
  BigInt: BigIntInput,
  Button: ButtonInput,
  Filecoin: FilecoinInput,
  Number: NumberInput,
  Params: ParamsInput,
  Text: TextInput,
  Email: EmailInput,
  Password: PasswordInput,
  Search: SearchInput,
  SeedPhrase: SeedPhraseInput,
  PrivateKey: PrivateKeyInput,
  Info,
  Select,
  SelectNumber,
  SelectRange,
  Toggle
}
