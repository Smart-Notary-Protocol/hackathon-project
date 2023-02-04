// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import FormLayoutsIconsAcceptClient from 'src/views/form-layouts/FormLayoutsIconsAcceptClient'
import AlertComponent from 'src/@core/components/alert/alertComponent'
import { Web3Context } from 'src/@core/context/web3Context'
import { useContext } from 'react'

const FormLayouts = () => {
  const { transactionErrorAlert, transactionAlert } = useContext(Web3Context)

  return (
    <DatePickerWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6} lg={12}>
          <FormLayoutsIconsAcceptClient />
        </Grid>
      </Grid>
      {transactionErrorAlert && (
        <AlertComponent
          type='You need to be the Smart Notary contract owner in order to perform this action.'
          severity='warning'
        />
      )}
      {transactionAlert && (
        <AlertComponent type='Wait for the transaction till the client is accepted into protocol' severity='info' />
      )}
    </DatePickerWrapper>
  )
}

export default FormLayouts
