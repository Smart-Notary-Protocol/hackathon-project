// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import ClickableBox from 'src/views/dashboard/ClickableBox'
import { boxArray } from 'src/constants/consts'
import AllPurposeTable from 'src/views/tables/AllPurposeTable'
import { Card, CardHeader } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { Web3Context } from 'src/@core/context/web3Context'

const Dashboard = () => {
  const { smartNotaryContract, fetchClients } = useContext(Web3Context)
  const [clients, setClients] = useState<any[]>()

  useEffect(() => {
    getClients()
  }, [smartNotaryContract])
  const getClients = async () => {
    const cls = await fetchClients()
    setClients(cls)
  }
  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        {boxArray.map((box: any, index: number) => {
          return <Grid key={index} item xs={12} md={3} lg={4}>
            <ClickableBox title={box.title} text={box.text} route={box.route} button={box.button} />
          </Grid>
        })}
      </Grid>
      <Card sx={{ marginTop: "30px" }}>

        <CardHeader title='All Clients' titleTypographyProps={{ variant: 'h6' }} />

        <AllPurposeTable
          elements={clients ? clients : []}  method={() => { }} />

      </Card>
    </ApexChartWrapper>
  )
}

export default Dashboard
