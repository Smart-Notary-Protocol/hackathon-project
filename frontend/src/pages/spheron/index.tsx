// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Third Party Styles Imports
import TextPanel from 'src/@core/components/text-panel/textPanel'
import { textsSpheron } from 'src/constants/consts'
import CardContent from '@mui/material/CardContent'
import Card from '@mui/material/Card'




const FormLayouts = () => {

  return (
    <DatePickerWrapper>
      <Card>
        <CardContent>




          <Grid container spacing={6}>
            <Grid item xs={12} md={6} lg={12}>
              <TextPanel texts={textsSpheron} title="smart-notary-protocol.com uses Spheron!" />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </DatePickerWrapper>
  )
}

export default FormLayouts
