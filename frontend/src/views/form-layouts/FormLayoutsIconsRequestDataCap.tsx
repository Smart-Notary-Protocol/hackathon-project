// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import InputAdornment from '@mui/material/InputAdornment'
import smartClientAbi from "../../contracts/SmartClient.json"

// ** Icons Imports
import SignatureFreehand from 'mdi-material-ui/SignatureFreehand'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import { useContext, useEffect, useState } from 'react'
import { Web3Context } from 'src/@core/context/web3Context'
import { FormControl, FormLabel, InputLabel, MenuItem, Select, StepLabel } from '@mui/material'
import { ethers } from 'ethers'

const FormLayoutsIconsRequestDataCap = () => {
  const { account, smartNotaryContract, isNotaryAdded, provider } = useContext(Web3Context)
  const [clients, setClients] = useState<any[]>()
  const [address, setAddress] = useState<string>("")

  useEffect(() => {
  }, [smartNotaryContract])

  const hexToString = (hex: any) => {
    const bytes = [];
    for (let i = 0; i < hex.length; i += 2) {
      bytes.push(parseInt(hex.substr(i, 2), 16));
    }
    const decoder = new TextDecoder();
    return decoder.decode(new Uint8Array(bytes));
  };


  const selectClient = (address: string) => {
    console.log("the address from tab", address)
    setAddress(address)
  }

  // const createClient = async (): Promise<any> => {
  const requestMoreDatacap = async (): Promise<any> => {
    try {
      // smart client address 0x5aa4552021cC724A6A620921137894680A2F268E
      const abi = smartClientAbi.abi
      const options = { value: ethers.utils.parseEther("1.0") }
      const signer = provider.getSigner()
      console.log("signer", signer)
      const smartClientContract = new ethers.Contract(address, abi, signer)
      const transaction = await smartClientContract.claimDataCap(options)
      return transaction
    } catch (error) {
      console.log(error)
    }

  }


  return (

    <Card>
      <CardHeader title='Select Client' titleTypographyProps={{ variant: 'h6' }} />
      <CardContent>
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
                onClick={requestMoreDatacap}
              >
                Request More DataCap
              </Button>

              <StepLabel>You need to be the client Owner.</StepLabel>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default FormLayoutsIconsRequestDataCap
