// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Demo Components Imports
import FormLayoutsIconsNotary from 'src/views/form-layouts/FormLayoutsIconsNotary'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
const NewNotary = () => {
  return (
    <DatePickerWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6} lg={12}>
          <FormLayoutsIconsNotary />
        </Grid>
      </Grid>
    </DatePickerWrapper>
  )
}

export default NewNotary
