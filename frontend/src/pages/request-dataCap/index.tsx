// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Demo Components Imports

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import { Card, CardHeader, CardContent, Typography } from '@mui/material'
import RequestDatacapExplaination from './RequestDatacapExplaination'
const RequestDataCap = () => {
  return (
    <DatePickerWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6} lg={12}>
         <RequestDatacapExplaination />
        </Grid>
      </Grid>
    </DatePickerWrapper>
  )
}

export default RequestDataCap
