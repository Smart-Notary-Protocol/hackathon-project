// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Demo Components Imports

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import FormLayoutsIconsSupportClient from 'src/views/form-layouts/FormLayoutsIconsSupportClient'
import { Web3Context } from 'src/@core/context/web3Context'
import { useContext } from 'react'
import AlertComponent from 'src/@core/components/alert/alertComponent'

const SupportClient = () => {
  const { transactionErrorAlert, transactionAlert } = useContext(Web3Context)

  return (
    <DatePickerWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6} lg={12}>
          <FormLayoutsIconsSupportClient />
        </Grid>
      </Grid>
      {transactionErrorAlert && (
        <AlertComponent
          type='An error occurred: make sure your address is registered as a notary and the client is not accepted.'
          severity='error'
        />
      )}
      {transactionAlert && <AlertComponent type='please, Wait for the transaction to be mined' severity='info' />}
    </DatePickerWrapper>
  )
}

export default SupportClient
