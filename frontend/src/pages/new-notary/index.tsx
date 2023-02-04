// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Demo Components Imports
import FormLayoutsIconsNotary from 'src/views/form-layouts/FormLayoutsIconsNotary'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import { Collapse, Alert, IconButton } from '@mui/material'
import AlertComponent from 'src/@core/components/alert/alertComponent'
import { useContext } from 'react'
import { Web3Context } from 'src/@core/context/web3Context'
const NewNotary = () => {
  const { transactionErrorAlert, transactionAlert } = useContext(Web3Context)

  return (
    <DatePickerWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6} lg={12}>
          <FormLayoutsIconsNotary />
        </Grid>
      </Grid>
      {
        transactionErrorAlert && <AlertComponent type="Looks Like the notary is already accepted into the protocol." severity="warning" />}
      {
        transactionAlert && <AlertComponent type="Wait for the transaction before notary is accepted" severity="info" />
      }
    </DatePickerWrapper>
  )
}

export default NewNotary
