import { ethers } from 'ethers'
import { ColumnType } from './types'

export const SMART_NOTARY_ADDRESS = '0x9FF86B6A10000EF132d4316466F32A2374d43343'
export const DATACAP_FEE = ethers.utils.parseEther('1.0')

export const boxArray = [
  {
    title: 'Become A Notary',
    text: 'You need to become a notary in order to present a new client to the protocol.',
    route: 'new-notary',
    button: 'Become Notary'
  },
  {
    title: 'Present A New Client',
    text: "Once you're a notary, You can present a new client staking FIL as a warrantee.",
    route: 'new-client',
    button: 'Present Client'
  },
  {
    title: 'Support An Existing Client',
    text: 'Support presented clients by staking FIL as a warrantee. ',
    route: 'support-client',
    button: 'Support Client'
  },
  {
    title: 'Accept Client Into Protocol',
    text: 'Governance team will grant the first round of DataCap.',
    route: 'accept-client',
    button: 'Accept Client'
  },
  {
    title: 'Request More Datacap',
    text: 'If Clients are compliant with community rules, the datacap will be allocated immediately.',
    route: 'request-dataCap',
    button: 'Request DataCap'
  },
  {
    title: 'Check Community Rules',
    text: 'See what rules clients have to follow to get more DataCap',
    route: 'rules',
    button: 'Check Rules'
  }
]

export const rulesColumns: readonly ColumnType[] = [
  {
    id: 'address',
    label: 'Address',
    minWidth: 170,
    align: 'left',
    format: (value: number) => value.toLocaleString('en-US')
  },
  { id: 'explaination', label: 'Explaination', minWidth: 170 }
]

export const clientColumns: readonly ColumnType[] = [
  { id: 'name', label: 'Name', minWidth: 170 },
  {
    id: 'address',
    label: 'Address',
    minWidth: 170,
    align: 'left',
    format: (value: number) => value.toLocaleString('en-US')
  },
  {
    id: 'dataCap',
    label: 'DataCap',
    minWidth: 170,
    align: 'left',
    format: (value: number) => value.toLocaleString('en-US')
  },
  {
    id: 'stake',
    label: 'Stake Necessary',
    minWidth: 170,
    align: 'left',
    format: (value: number) => value.toFixed(2)
  },
  {
    id: 'status',
    label: 'Status',
    minWidth: 170,
    align: 'left',
    format: (value: number) => value.toFixed(2)
  }
]

export const textsRules = [
  'The following are the rules that a client have to be compliant with to get more datacap. \n Those rules are voted and deployed on chain.',
  'Disclaimer: Those are just test rules, made for the MVP. rules will be defined by community.'
]

export const textsNewNotary = [
  'Fill in the form to get accepted as a notary.\n After a notary get accepted into the protocol, he will be able to propose or support new clients. '
]

export const textsSupportClient = [
  'Supporting a client means that the notary want to stake TFIL in order to partecipate to client onboarding in Filecoin',
  'Choose the client you want to support and click on "support client" button.'
]

export const textsAcceptClient = [
  'Once a client has at least 2 notaries staking (supoorting) him, the protocol can make its final due diligence and accept the client. Once the client is accepted, he will get DataCap immediatly.',
  'Following this step, the client can request DataCap and the protocol will be responsible for allocating new allowance.'
]
export const textsRequestDataCap = [
  'If you are the owner of an accepted Smart Client and you got the first round of DataCap, you can claim other tokens pressing this button.',
  'In order to do so, you need to pay a standard fee of 1TFIL. 95% of it is splitted between the notaries staking on this client and the rest will go to the protocol.',
  'Click here to have a look to the community rules to get more datacap'
]
export const textsNewClient = [
  'In order to get accepted to the protocol, a client should be presented by a Notary.',
  'The Notary need to stake 0.1 TFIL as a warrantee to present the client to the protocol.',
  'Once the client is created, the Smart Notary will create an actor called Smart Client, which behave on behalf of the owner, get DataCap and will be used to make deals.'
]
