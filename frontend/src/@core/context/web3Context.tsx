
import { createContext, useState, ReactNode, useMemo, useEffect } from 'react'
import { ethers } from "ethers";
import smartNotaryAbi from "../../contracts/SmartNotary.json"
import smartClientAbi from "../../contracts/SmartClient.json"
import { SMART_NOTARY_ADDRESS } from 'src/constants/consts';
import { hexToString } from '../utils/encoding-utils';







// ** Create Context
export const Web3Context = createContext<any>({
  account: '',
  smartNotaryContract: {},
  isNotaryAdded: false,
  provider: {},
  fetchClients: ()=> []
})




export const Web3Provider = ({ children }: { children: ReactNode }) => {
  const [account, setAccount] = useState<any>("")
  const [provider, setProvider] = useState<any>("")
  const [signer, setSigner] = useState<any>("")
  const [smartNotaryContract, setSmartNotaryContract] = useState<any>()
  const [isNotaryAdded, setIsNotaryAdded] = useState<any>()


  useEffect(() => {
    let acc = localStorage.getItem('account') ? localStorage.getItem('account') : ""
    setAccount(acc)

    if (window.ethereum) {
      accChangedEvent()
    }


    if (typeof window !== "undefined") {
      initProvider()
      isNotaryInProtocol()
    }

  }, [account])

  const initProvider = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    setProvider(provider)
    setSigner(signer)
    getSmartNotary(provider, signer)
  }

  const connectAccount = async () => {
    try {
      if (account) setAccount(account)
      const accs = await provider.send("eth_requestAccounts", [])
      setAccount(accs[0])

    } catch (error) {
      console.log(error)
    }
  }

  const getSmartNotary = async (provider: any, signer: any) => {
    const address = SMART_NOTARY_ADDRESS
    const providerOrSigner = signer ? signer : provider
    const contract = new ethers.Contract(address, smartNotaryAbi.abi, providerOrSigner)
    // console.log("contract", contract)
    setSmartNotaryContract(contract);

  }

  const accChangedEvent = () => {
    return window.ethereum.on('accountsChanged', (accounts: Array<string>) => {
      const acc: string = accounts[0]
      setAccount(acc)
      localStorage.setItem('account', acc);
    })
  }

  const isNotaryInProtocol = async () => {
    try {
      if (smartNotaryContract) {
        const isIt = await smartNotaryContract.simpleNotaries(account)
        setIsNotaryAdded(isIt)
      }

    } catch (error) {
      console.log("Notary not in the protocol")
    }
  }


  const fetchClients = async () => {
    if (smartNotaryContract) {
      const clientAddresses = await smartNotaryContract.getSmartClients()
      // console.log("clientAddresses", clientAddresses)
      const abi = smartClientAbi.abi
      const clients = (await Promise.allSettled(
        clientAddresses.map((client: any) => new Promise(async (resolve, reject) => {
          try {
            const cl = new ethers.Contract(client, abi, provider)
            const hexName = await cl.name()
            const name = hexToString(hexName)
            const address = cl.address
            const hexDataCap = (await cl.getTotalAllowanceRequested()).val
            const dataCap = `${hexToString(hexDataCap)}TiB`

            console.log("dataCap", hexDataCap)

            resolve({ name, address, dataCap, stake: "1 TFIL" })
          } catch (error) {
            reject(error)
          }
        }))
      )).map((p: any) => p.value)
      console.log(clients)
      return clients
      // setClients(clients)
    }
  }




  return <Web3Context.Provider value={{ connectAccount, account, smartNotaryContract, isNotaryAdded, provider, fetchClients }}>{children}</Web3Context.Provider>
}

export const Web3Consumer = Web3Context.Consumer
