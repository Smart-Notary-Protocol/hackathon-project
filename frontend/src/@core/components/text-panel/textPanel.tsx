// ** MUI Imports
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Grid, { GridProps } from '@mui/material/Grid'
import Router from 'next/router'
import { TextPanelProps } from 'src/constants/types'

const DemoGrid = styled(Grid)<GridProps>(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    paddingTop: `${theme.spacing(1)} !important`
  }
}))

const TextPanel = (props: TextPanelProps) => {
  const { title, texts, indexRoute }: TextPanelProps = props

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} sm={2} sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography>{title}</Typography>
      </Grid>
      <DemoGrid item xs={12} sm={10}>
        {texts.map((text, i) => {
          return (
            <Typography
              key={i}
              variant='subtitle1'
              sx={{ marginBottom: 2 }}
              onClick={() => (i == indexRoute ? Router.push(`/rules`) : {})}
            >
              {text}
            </Typography>
          )
        })}
      </DemoGrid>
    </Grid>
  )
}

export default TextPanel
