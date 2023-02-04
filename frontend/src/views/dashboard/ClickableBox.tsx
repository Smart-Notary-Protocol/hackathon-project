// ** MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { styled, useTheme } from '@mui/material/styles'
import { Web3Context } from 'src/@core/context/web3Context'
import { useContext, useEffect, useState } from 'react'
import {ClicableBoxProps} from 'src/constants/types'
import Router from 'next/router'
import Spacing from 'src/@core/theme/spacing'

//this component should give some generic stat and then have a button "details" to see more in details what' happening

// Styled component for the triangle shaped background image
const TriangleImg = styled('img')({
  right: 0,
  bottom: 0,
  height: 170,
  position: 'absolute'
})


const ClickableBox = (props: ClicableBoxProps) => {
  // ** Hook
  const theme = useTheme()



  const imageSrc = theme.palette.mode === 'light' ? 'triangle-light.png' : 'triangle-dark.png'
  // TODO get number from strategymanager
  return (
    <Card  sx={{ position: 'relative'}} onClick={() => Router.push(`/${props.route}`)}>
        <CardContent>
          <Typography variant='h6'>{props.title}</Typography>
          <Typography variant='body2' sx={{ letterSpacing: '0.25px' }}>
            {props.text}
          </Typography>
          
          <TriangleImg alt='triangle background' src={`/images/misc/${imageSrc}`} />
          <Button sx={{marginTop: "20px"}} size='small' variant='contained' >
            {props.button}
          </Button>
        </CardContent>
    </Card>
  )
}

export default ClickableBox
