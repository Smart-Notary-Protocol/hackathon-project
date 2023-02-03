// ** MUI Imports
import Card from '@mui/material/Card'
import { styled } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Grid, { GridProps } from '@mui/material/Grid'
import { useEffect, useState } from 'react'
import Router from 'next/router'
import FormLayoutsIconsRequestDataCap from 'src/views/form-layouts/FormLayoutsIconsRequestDataCap'

const DemoGrid = styled(Grid)<GridProps>(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    paddingTop: `${theme.spacing(1)} !important`
  }
}))

const RequestDatacapExplaination = () => {
  return (<Card>
    <CardHeader title='Request New DataCap' titleTypographyProps={{ variant: 'h6' }} />
    <CardContent>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={2} sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography>Policy</Typography>
        </Grid>
        <DemoGrid item xs={12} sm={10}>
          <Typography variant='subtitle1' sx={{ marginBottom: 2 }}>
            If you are the owner of an accepted Smart Client and you got the first round of dataCap, you can claim other tokens pressing this button.<br></br>
            In order to do so, you need to pay a standard fee of 1TFIL. 95% of it is splitted between the notaries staking on this client and the rest will go to the protocol.
          </Typography>
          <Typography variant='body2' onClick={() => Router.push(`/rules`)}>
            Click here to have a look to the community rules to get more datacap
          </Typography>
        </DemoGrid>
        <FormLayoutsIconsRequestDataCap/>
      </Grid>
    </CardContent >
  </Card >
  )

}

export default RequestDatacapExplaination
