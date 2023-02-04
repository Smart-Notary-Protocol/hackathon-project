// ** MUI Imports
import { AlertProps} from 'src/constants/types'
import { useContext } from 'react'
import { Collapse, Alert, IconButton } from '@mui/material'
import { Web3Context } from 'src/@core/context/web3Context'
import { Icon } from '@iconify/react'

const AlertComponent = (props: AlertProps) => {
  const { transactionAlert, transactionErrorAlert, setTransactionErrorAlert, setTransactionAlert } =
    useContext(Web3Context)

  return (
    <Collapse in={transactionAlert || transactionErrorAlert}>
      <Alert
        severity={props.severity}
        onClick={() => {
          setTransactionErrorAlert(false)
          setTransactionAlert(false)
        }}
        sx={{ bottom: 100, right: 140, position: 'absolute' }}
        action={
          <IconButton size='small' color='inherit' aria-label='close'>
            <Icon icon='material-symbols:close-rounded' />
          </IconButton>
        }
      >
        {props.type}
      </Alert>
    </Collapse>
  )
}

export default AlertComponent
