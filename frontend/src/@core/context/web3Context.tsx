import { createContext, useState, ReactNode, useEffect } from 'react'
import { ethers } from 'ethers'
import smartNotaryAbi from '../../contracts/SmartNotaryAbi.json'
import smartClientAbi from '../../contracts/SmartClient.json'
import { SMART_NOTARY_ADDRESS } from 'src/constants/consts'
import { hexToString } from '../utils/encoding-utils'

// ** Create Context
export const Web3Context = createContext<any>({
  account: '',
  smartNotaryContract: {},
  isNotaryAdded: false,
  provider: {},
  fetchClients: () => []
})

export const Web3Provider = ({ children }: { children: ReactNode }) => {
  const [account, setAccount] = useState<any>('')
  const [provider, setProvider] = useState<any>('')
  const [signer, setSigner] = useState<any>('')
  const [smartNotaryContract, setSmartNotaryContract] = useState<any>()
  const [isNotaryAdded, setIsNotaryAdded] = useState<any>()
  const [transactionAlert, setTransactionAlert] = useState<boolean>(false)
  const [transactionErrorAlert, setTransactionErrorAlert] = useState<boolean>(false)

  useEffect(() => {
    const acc = localStorage.getItem('account') ? localStorage.getItem('account') : ''
    setAccount(acc)

    if (window.ethereum) {
      accChangedEvent()
    }

    if (typeof window !== 'undefined') {
      initProvider()
      isNotaryInProtocol()
    }
    smartNotaryEvents()
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
      const accs = await provider.send('eth_requestAccounts', [])
      setAccount(accs[0])
    } catch (error) {
      console.log(error)
    }
  }

  const getSmartNotary = async (provider: any, signer: any) => {
    const address = SMART_NOTARY_ADDRESS
    const providerOrSigner = signer ? signer : provider
    const contract = new ethers.Contract(address, smartNotaryAbi, providerOrSigner)

    // console.log("contract", contract)
    setSmartNotaryContract(contract)
  }

  const accChangedEvent = () => {
    return window.ethereum.on('accountsChanged', (accounts: Array<string>) => {
      const acc: string = accounts[0]
      setAccount(acc)
      localStorage.setItem('account', acc)
    })
  }

  const isNotaryInProtocol = async () => {
    try {
      if (smartNotaryContract) {
        const isIt = await smartNotaryContract.simpleNotaries(account)
        setIsNotaryAdded(isIt)
      }
    } catch (error) {
      //TODO bring this to life
      console.log('Notary not in the protocol')
    }
  }

  const isClientAccepted = async (address: string) => {
    const isIt = await smartNotaryContract.acceptedClients(address)

    return isIt
  }

  const fetchClients = async () => {
    if (smartNotaryContract) {
      const clientAddresses = await smartNotaryContract.getSmartClients()

      // console.log("clientAddresses", clientAddresses)
      const abi = smartClientAbi.abi
      const clients = (
        await Promise.allSettled(
          clientAddresses.map(
            (client: any) =>
              new Promise(async (resolve, reject) => {
                try {
                  const isAccepted = await isClientAccepted(client)
                  const cl = new ethers.Contract(client, abi, provider)
                  const hexName = await cl.name()
                  const name = hexToString(hexName)
                  const address = cl.address
                  const hexDataCap = (await cl.getTotalAllowanceRequested()).val
                  const dataCap = `${hexToString(hexDataCap)}TiB`

                  resolve({ name, address, dataCap, stake: '1 TFIL', status: isAccepted ? 'accepted' : 'pending' })
                } catch (error) {
                  reject(error)
                }
              })
          )
        )
      ).map((p: any) => p.value)
      console.log(clients)

      return clients
    }
  }

  const smartNotaryEvents = () => {
    if (smartNotaryContract) {
      console.log('should be initialized')
      smartNotaryContract.on('NotaryAdded', (eve: any) => {
        if (eve === account) {
          console.log('NotaryAdded event emitted', eve)
          setTransactionAlert(false)
        }
      })
    }
  }

  return (
    <Web3Context.Provider
      value={{
        connectAccount,
        account,
        smartNotaryContract,
        isNotaryAdded,
        provider,
        fetchClients,
        transactionAlert,
        setTransactionAlert,
        transactionErrorAlert,
        setTransactionErrorAlert
      }}
    >
      {children}
    </Web3Context.Provider>
  )
}

export const Web3Consumer = Web3Context.Consumer
