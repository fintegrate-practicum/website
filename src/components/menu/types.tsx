import * as iconsMaterial from '@mui/icons-material';

interface MenuItem {
  name: string;
  nameToView: string;
  icon: iconsMaterial.SvgIconComponent;
  route: string;
  component: string; 
}

export default MenuItem;


