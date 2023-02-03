// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Demo Components Imports

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import { Card, CardHeader, CardContent, Typography } from '@mui/material'
import RulesExplaination from './RulesExplaination'
const Rules = () => {
  return (
    <DatePickerWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6} lg={12}>
         <RulesExplaination />
        </Grid>
      </Grid>
    </DatePickerWrapper>
  )
}

export default Rules
