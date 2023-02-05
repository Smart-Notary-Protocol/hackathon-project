// ** MUI Imports
import Card from '@mui/material/Card'
import Grid, { GridProps } from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import InputAdornment from '@mui/material/InputAdornment'

// ** Icons Imports
import SignatureFreehand from 'mdi-material-ui/SignatureFreehand'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import { useContext, useEffect, useState } from 'react'
import { Web3Context } from 'src/@core/context/web3Context'
import { FormControl, InputLabel, MenuItem, Select, StepLabel, styled } from '@mui/material'
import { ethers } from 'ethers'
import TextPanel from 'src/@core/components/text-panel/textPanel'
import { textsNewClient } from 'src/constants/consts'


const FormLayoutsIconsNewClient = () => {
  const { smartNotaryContract, setTransactionAlert, setTransactionErrorAlert } = useContext(Web3Context)
  const [address, setAddress] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [dataCap, setDataCap] = useState<string>('')

  // const createClient = async (): Promise<any> => {
  const createClient = async (): Promise<any> => {
    try {
      const d = encodeTuple(dataCap)
      const options = { value: ethers.utils.parseEther('1') }
      const transaction = await smartNotaryContract.createSmartClient(address, name, d, options)

      // const transaction = await smartNotaryContract.emitTestEvent()
      console.log('transaction:', transaction)
      setTransactionAlert(true)

      return transaction
    } catch (error) {
      setTransactionErrorAlert(true)
      console.log(error)
    }
  }

  const encodeTuple = (input: string) => {
    const repl = input.replace(/[aA-zZ]/g, '')
    const encoded = stringToBytes(repl)

    return [encoded, false]

    // console.log("encodeTuple", encoded)
  }

  const stringToBytes = (input: string) => {
    const encoder = new TextEncoder()

    return encoder.encode(input)
  }

  return (
    <Card>
      <CardHeader title='Present New Client' titleTypographyProps={{ variant: 'h6' }} />
      <CardContent>
        <TextPanel title='Info' texts={textsNewClient} />
      </CardContent>
      <CardContent>
        <form onSubmit={e => e.preventDefault()}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label='Company Name'
                placeholder='Lion.ltd'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <AccountOutline />
                    </InputAdornment>
                  )
                }}
                onChange={(e: any) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth

                // value={account && account !== "undefined" ? account : ""}
                label='Filecoin address of future client ownere (starting with 0x...)'
                placeholder='0xbidibibodibibu'
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
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>DataCap Requested</InputLabel>
                <Select label='DataCap Requesed' onChange={(e: any) => setDataCap(e.target.value)}>
                  <MenuItem value='100TiB'>100TiB</MenuItem>
                  <MenuItem value='250TiB'>250TiB</MenuItem>
                  <MenuItem value='500TiB'>500TiB</MenuItem>
                  <MenuItem value='750TiB'>750TiB</MenuItem>
                  <MenuItem value='1PiB'>1PiB</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button type='submit' variant='contained' size='large' onClick={createClient}>
                Present Client
              </Button>

              <StepLabel> You need to have TFIl in your wallet and Be a Notary</StepLabel>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default FormLayoutsIconsNewClient
