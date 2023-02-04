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
  const { setTransactionAlert, setTransactionErrorAlert, provider } = useContext(Web3Context)
  const [address, setAddress] = useState<string>("")


  // const createClient = async (): Promise<any> => {
  const requestMoreDatacap = async (): Promise<any> => {
    try {
      // smart client address 0x5aa4552021cC724A6A620921137894680A2F268E
      const abi = smartClientAbi.abi
      const options = { value: ethers.utils.parseEther("1.0") }
      const signer = provider.getSigner()
      const smartClientContract = new ethers.Contract(address, abi, signer)
      const transaction = await smartClientContract.claimDataCap(options)
      setTransactionAlert(true)
      return transaction
    } catch (error) {
      setTransactionErrorAlert(true)
      console.log(error)
    }
  }


  return (

    <Card>
      <CardHeader title='Smart Client' titleTypographyProps={{ variant: 'h6' }} />
      <CardContent>
        <form onSubmit={e => e.preventDefault()}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                // value={account && account !== "undefined" ? account : ""}
                value={address}
                label='Filecoin address (starting with 0x...)'
                placeholder='Address of the Smart Client contract'
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
