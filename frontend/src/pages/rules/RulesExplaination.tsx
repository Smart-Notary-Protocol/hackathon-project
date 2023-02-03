// ** MUI Imports
import Card from '@mui/material/Card'
import { styled } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Grid, { GridProps } from '@mui/material/Grid'
import { useContext, useEffect, useState } from 'react'
import Router from 'next/router'
import AllPurposeTable from 'src/views/tables/AllPurposeTable'
import { rulesColumns } from 'src/constants/consts'
import { Web3Context } from 'src/@core/context/web3Context'
import ruleModuleAbi from "../../contracts/RuleModule.json"
import iRuleInterfaceAbi from "../../contracts/IRuleInterface.json"
import ruleExampleAbi from "../../contracts/RuleExample.json"
import { ethers } from 'ethers'

const DemoGrid = styled(Grid)<GridProps>(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    paddingTop: `${theme.spacing(1)} !important`
  }
}))

const RulesExplaination = () => {
  const { smartNotaryContract, provider } = useContext(Web3Context)
  const [rules, setRules] = useState<any[]>()

  useEffect(() => {
    fetchRules()
  }, [smartNotaryContract])

  const fetchRules = async () => {
    try {
      if (smartNotaryContract) {
        const ruleModuleAddress = await smartNotaryContract.ruleModule()
        const ruleModuleContract = new ethers.Contract(ruleModuleAddress, ruleModuleAbi.abi, provider)
        const rulesAddresses = await ruleModuleContract.getAllRules()

        const rules = (await Promise.allSettled(
          rulesAddresses.map((address: any) => new Promise(async (resolve, reject) => {
            try {
              const contract = new ethers.Contract(address, ruleExampleAbi, provider)
              console.log("contract rule", contract)
              const explaination = await contract.getName()
              console.log("explaination Rule", explaination)
              resolve({ address, explaination, contract})
            } catch (error) {
              reject(error)
            }
          }))
        )).map((p: any) => p.value)
        console.log("rules", rules)
        setRules(rules)
      }
    } catch (error) {

    }
  }


  return (<Card>
    <CardHeader title='Check Community Rules To Get more DataCap' titleTypographyProps={{ variant: 'h6' }} />
    <CardContent>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={2} sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography>Rules</Typography>
        </Grid>
        <DemoGrid item xs={12} sm={10}>
          <Typography variant='subtitle1' sx={{ marginBottom: 2 }}>
            The following are the rules that a client have to be compliant with to get more datacap.<br></br>
            Those rules are voted and deployed on chain.
          </Typography>
          <Typography variant='body2' onClick={() => Router.push(`/rules`)}>
            Disclaimer: Those are just test rules, made for the MVP. rules will be defined by community.
          </Typography>
        </DemoGrid>
      </Grid>
      <Card sx={{ marginTop: "30px" }}>
        <CardHeader title='All Clients' titleTypographyProps={{ variant: 'h6' }} />
        <AllPurposeTable
          elements={rules ? rules : []} method={() => { }} columns={rulesColumns} />
      </Card>
    </CardContent >
  </Card >
  )

}

export default RulesExplaination
