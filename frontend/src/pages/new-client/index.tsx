// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Demo Components Imports
import FormLayoutsIconsClient from 'src/views/form-layouts/FormLayoutsIconsNewClient'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import AlertComponent from 'src/@core/components/alert/alertComponent'
import { useContext } from 'react'
import { Web3Context } from 'src/@core/context/web3Context'

const NewClient = () => {
  const { transactionErrorAlert, transactionAlert } = useContext(Web3Context)

  return (
    <DatePickerWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6} lg={12}>
          <FormLayoutsIconsClient />
        </Grid>
      </Grid>
      {transactionErrorAlert && (
        <AlertComponent
          type='Address of client owner is already used for another Smart Client. use another one.'
          severity='error'
        />
      )}
      {transactionAlert && (
        <AlertComponent type='Wait for the transaction till the Smart Client is created' severity='info' />
      )}
    </DatePickerWrapper>
  )
}

export default NewClient
