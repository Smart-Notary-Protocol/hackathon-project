// ** Icon imports
import { HomeOutline,CubeOutline, AccountPlusOutline,GoogleCirclesExtended,HandPointingLeft , Connection, CheckCircle, Database, Ruler} from 'mdi-material-ui'

// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'
import themeConfig from 'src/configs/themeConfig'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      sectionTitle: 'Dashboard'
    },
    {
      title: 'Home',
      icon: HomeOutline,
      path: '/',
    },
    {
      title: 'Become a notary',
      icon: AccountPlusOutline,
      path: '/new-notary',
    },
    {
      title: 'Present New Client',
      icon: HandPointingLeft,
      path: '/new-client',
    },
    {
      title: 'Support Client',
      icon: Connection,
      path: '/support-client',
    },
    {
      title: 'Accept Client',
      icon: CheckCircle,
      path: '/accept-client',
    },
     {
      title: 'Request DataCap',
      icon: Database,
      path: '/request-dataCap',
    },
     {
      title: 'Community Rules',
      icon: Ruler,
      path: '/rules',
    },
    {
      sectionTitle: 'Space Warp Sponsors'
    },
    {
      title: 'Huddle01',
      icon: CubeOutline,
      path: '/huddle01',

    },
    {
      title: 'LightHouse',
      icon: GoogleCirclesExtended,
      path: '/lighthouse',
    },
    {
      title: 'Push Protocol',
      icon: GoogleCirclesExtended,
      path: '/push',
    },
     {
      title: 'Spheron',
      icon: GoogleCirclesExtended,
      path: '/spheron',
    }
  ]
}

export default navigation
