// ** MUI Imports
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import { Theme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import FVMIcon from 'src/@core/components/icons/FVMIcon'

const FooterContent = () => {
  // ** Var
  const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
      <Typography sx={{ mr: 2 }}>
        {`© ${new Date().getFullYear()}, Made for Space Warp Hackathon`}
        {` by `}
        <Link target='_blank' href='https://github.com/fabriziogianni7'>
          Fabriziogianni7
        </Link>
      </Typography>
      {hidden ? null : (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', '& :not(:last-child)': { mr: 4 } }}>
          <Link
            target='_blank'
            href='https://github.com/fabriziogianni7/FVM-Smart-Notary'
          >
            Github Repo
          </Link>
          <FVMIcon />
        </Box>
      )}
    </Box>
  )
}

export default FooterContent
