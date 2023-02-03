import { ethers } from "ethers"
import { ColumnType } from "./types"

export const SMART_NOTARY_ADDRESS = "0x2CF61da8c5358f5dc7BBC863b234cB5d9e99a3CA"
export const DATACAP_FEE = ethers.utils.parseEther("1.0")

export const boxArray = [
    {
        title: "Become A Notary",
        text: "You need to become a notary in order to present a new client to the protocol.",
        route: "new-notary",
        button: "Become Notary"
    },
    {
        title: "Present A New Client",
        text: "Once you're a notary, You can present a new client staking FIL as a warrantee.",
        route: "new-client",
        button: "Present Client"

    },
    {
        title: "Support An Existing Client",
        text: "Support presented clients by staking FIL as a warrantee. ",
        route: "support-client",
        button: "Support Client"
    },
    {
        title: "Accept Client Into Protocol",
        text: "Governance team will grant the first round of DataCap.",
        route: "accept-client",
        button: "Accept Client"
    },
    {
        title: "Request More Datacap",
        text: "If Clients are compliant with community rules, the datacap will be allocated immediately.",
        route: "request-dataCap",
        button: "Request DataCap"
    },
    {
        title: "Check Community Rules",
        text: "See what rules clients have to follow to get more DataCap",
        route: "rules",
        button: "Check Rules"
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
  { id: 'explaination', label: 'Explaination', minWidth: 170 },
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
  }
]
