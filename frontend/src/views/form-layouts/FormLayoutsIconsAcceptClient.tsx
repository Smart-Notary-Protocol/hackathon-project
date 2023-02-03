// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import InputAdornment from '@mui/material/InputAdornment'
import AllPurposeTable from '../tables/AllPurposeTable'
import smartClientAbi from "../../contracts/SmartClient.json"

// ** Icons Imports
import SignatureFreehand from 'mdi-material-ui/SignatureFreehand'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import { useContext, useEffect, useState } from 'react'
import { Web3Context } from 'src/@core/context/web3Context'
import { FormControl, FormLabel, InputLabel, MenuItem, Select, StepLabel } from '@mui/material'
import { ethers } from 'ethers'
import { clientColumns } from 'src/constants/consts'

const FormLayoutsIconsAcceptClient = () => {
  const { account, smartNotaryContract, isNotaryAdded, provider } = useContext(Web3Context)
  const [clients, setClients] = useState<any[]>()
  const [address, setAddress] = useState<string>("")

  useEffect(() => {
    fetchClients()
  }, [smartNotaryContract])

  const hexToString = (hex: any) => {
    const bytes = [];
    for (let i = 0; i < hex.length; i += 2) {
      bytes.push(parseInt(hex.substr(i, 2), 16));
    }
    const decoder = new TextDecoder();
    return decoder.decode(new Uint8Array(bytes));
  };

  const fetchClients = async () => {
    if (smartNotaryContract) {
      const clientAddresses = await smartNotaryContract.getSmartClients()
      console.log("clientAddresses", clientAddresses)
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
      setClients(clients)
    }

  }

  const selectClient = (address: string) => {
    console.log("the address from tab", address)
    setAddress(address)
  }

  // const createClient = async (): Promise<any> => {
  const supportClient = async (): Promise<any> => {
    try {
      const transaction = await smartNotaryContract.grantFirstRoundDataCap(address)
      return transaction
    } catch (error) {
      console.log(error)
    }

  }


  return (

    <Card>
      <CardHeader title='Accept Client' titleTypographyProps={{ variant: 'h6' }} />
      <CardContent>
        <Card>
          <CardHeader title='Available Clients' titleTypographyProps={{ variant: 'h6' }} />
          <AllPurposeTable elements={clients ? clients : []} method={selectClient} columns={clientColumns}/>
        </Card>
        <form onSubmit={e => e.preventDefault()}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                // value={account && account !== "undefined" ? account : ""}
                value={address}
                label='Filecoin address (starting with 0x...)'
                placeholder='Address of the client'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <SignatureFreehand />
                    </InputAdornment>
                  )
                }}
                onChange={(e: any) => setAddress(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type='submit' variant='contained' size='large'
                onClick={supportClient}
              >
                Accept Client in Protocol
              </Button>

              <StepLabel>You need to be a memeber of protocol gov-team. This step will trigger the 1st datacap allocation.</StepLabel>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default FormLayoutsIconsAcceptClient
