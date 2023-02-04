// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Demo Components Imports

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import { Card, CardHeader, CardContent, Typography } from '@mui/material'
import RequestDatacapExplaination from './RequestDatacapExplaination'
import { useContext, useEffect, useState } from 'react'
import { Web3Context } from 'src/@core/context/web3Context'
import AlertComponent from 'src/@core/components/alert/alertComponent'
import AllPurposeTable from 'src/views/tables/AllPurposeTable'
import { clientColumns } from 'src/constants/consts'

const RequestDataCap = () => {
  const { smartNotaryContract, transactionErrorAlert, transactionAlert, fetchClients } = useContext(Web3Context)
  const [clients, setClients] = useState<any[]>()
  const [address, setAddress] = useState<string>("")


  useEffect(() => {
    getClients()
  }, [smartNotaryContract])

  const getClients = async () => {
    const cls = (await fetchClients())?.filter((c: any) => c.status === 'accepted')
    setClients(cls)
  }
  const selectClient = (address: string) => {
    setAddress(address)
  }
  return (
    <DatePickerWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6} lg={12}>
          <CardContent>
            <Card>
              <RequestDatacapExplaination />
            </Card>
          </CardContent>
          <CardContent>
            <Card>
              <AllPurposeTable elements={clients ? clients : []} method={selectClient} columns={clientColumns} />
            </Card>
          </CardContent>
        </Grid>
      </Grid>
      {
        transactionErrorAlert && <AlertComponent type="Seems that you aren't the owner of the Smart Client." severity="warning" />}
      {
        transactionAlert && <AlertComponent type="Wait for the transaction till DataCap is refilled." severity="info" />
      }
    </DatePickerWrapper>
  )
}

export default RequestDataCap

