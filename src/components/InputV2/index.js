import { AbiInput } from './Abi'
import { AddressInput } from './Address'
import { BigIntInput } from './BigInt'
import { ButtonInput } from './Button'
import { FileInput } from './File'
import { FilecoinInput } from './Filecoin'
import { Info } from './Info'
import { NumberInput } from './Number'
import { ParamsInput } from './Params'
import { PrivateKeyInput } from './PrivateKey'
import { SeedPhraseInput } from './SeedPhrase'
import { Select } from './Select'
import { SelectNumber } from './SelectNumber'
import { SelectRange } from './SelectRange'
import { TextInput, EmailInput, PasswordInput, SearchInput } from './Text'
import { Toggle } from './Toggle'

export const InputV2 = {
  Abi: AbiInput,
  Address: AddressInput,
  BigInt: BigIntInput,
  Button: ButtonInput,
  File: FileInput,
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
