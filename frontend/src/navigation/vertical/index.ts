// ** Icon imports
import {
  HomeOutline,
  Bell,
  AccountPlusOutline,
  GoogleCirclesExtended,
  HandPointingLeft,
  Connection,
  CheckCircle,
  Database,
  Ruler,
  BookAlert
} from 'mdi-material-ui'

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
      title: 'Push Protocol',
      icon: Bell,
      path: '/push'
    },
    {
      title: 'Spheron',
      icon: GoogleCirclesExtended,
      path: '/spheron'
    },  
    {
      sectionTitle: 'Project Info'
    },
    {
      title: 'README',
      icon: BookAlert,
      path: '/readme'
    },
  ]
}

export default navigation
