// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import InputAdornment from '@mui/material/InputAdornment'

// ** Icons Imports
import SignatureFreehand from 'mdi-material-ui/SignatureFreehand'
import EmailOutline from 'mdi-material-ui/EmailOutline'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import MessageOutline from 'mdi-material-ui/MessageOutline'
import { useContext } from 'react'
import { Web3Context } from 'src/@core/context/web3Context'
import { StepLabel } from '@mui/material'
import TextPanel from 'src/@core/components/text-panel/textPanel'
import { textsNewNotary } from 'src/constants/consts'

const FormLayoutsIconsNotary = () => {
  const { account, smartNotaryContract, isNotaryAdded, setTransactionAlert, setTransactionErrorAlert } =
    useContext(Web3Context)
  const addNotary = async (): Promise<any> => {
    try {
      const tx = await smartNotaryContract.addSimpleNotary()

      setTransactionAlert(true)
      console.log('transaction:', tx)

      return tx
    } catch (error) {
      setTransactionErrorAlert(true)
      console.log(error)
    }
  }

  return (
    <Card>
      <CardHeader title='Notary Info' titleTypographyProps={{ variant: 'h6' }} />
      <CardContent>
        <TextPanel texts={textsNewNotary} title={'Info'} />
      </CardContent>
      <CardContent>
        <form onSubmit={e => e.preventDefault()}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label='Full Name'
                placeholder='Leonard Carter'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <AccountOutline />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type='email'
                label='Email'
                placeholder='carterleonard@gmail.com'
                helperText='You can use letters, numbers & periods'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <EmailOutline />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                value={account && account !== 'undefined' ? account : ''}
                label='Filecoin address (starting with 0x...)'
                placeholder='Connect Wallet in order to fill this field'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <SignatureFreehand />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                minRows={3}
                label='Bio'
                placeholder='I want to be a notary because...'
                sx={{ '& .MuiOutlinedInput-root': { alignItems: 'baseline' } }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <MessageOutline />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12}>
              {/* {true ? */}
              {isNotaryAdded ? (
                <Button type='submit' variant='contained' size='large'>
                  You're a notary already!
                </Button>
              ) : (
                <Button type='submit' variant='contained' size='large' onClick={addNotary}>
                  Become a notary
                </Button>
              )}
              <StepLabel> You need to have TFIl in your wallet</StepLabel>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default FormLayoutsIconsNotary
