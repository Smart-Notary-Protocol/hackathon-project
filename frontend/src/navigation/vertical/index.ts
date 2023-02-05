// ** Icon imports
import {
  HomeOutline,
  AccountPlusOutline,
  HandPointingLeft,
  Connection,
  CheckCircle,
  Database,
  Ruler,
  BookAlert,
} from 'mdi-material-ui'
import SpheronIcon from "src/@core/components/icons/SpheronIcon"

// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      sectionTitle: 'Dashboard'
    },
    {
      title: 'Home',
      icon: HomeOutline,
      path: '/'
    },
    {
      title: 'Become a notary',
      icon: AccountPlusOutline,
      path: '/new-notary'
    },
    {
      title: 'Present New Client',
      icon: HandPointingLeft,
      path: '/new-client'
    },
    {
      title: 'Support Client',
      icon: Connection,
      path: '/support-client'
    },
    {
      title: 'Accept Client',
      icon: CheckCircle,
      path: '/accept-client'
    },
    {
      title: 'Request DataCap',
      icon: Database,
      path: '/request-dataCap'
    },
    {
      title: 'Community Rules',
      icon: Ruler,
      path: '/rules'
    },
    {
      sectionTitle: 'Space Warp Sponsors'
    },
    {
      title: 'Spheron',
      icon: SpheronIcon,
      path: '/spheron'
    },  
    {
      sectionTitle: 'Project Info'
    },
    {
      title: 'README',
      icon: BookAlert,
      path: 'https://github.com/fabriziogianni7/FVM-Smart-Notary#readme',
      externalLink: true,
      openInNewTab: true
    },
  ]
}

export default navigation
