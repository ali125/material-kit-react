// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
    stage: true,
  },
  {
    title: 'user',
    path: '/dashboard/user',
    icon: icon('ic_user'),
    stage: false,
  },
  {
    title: 'product',
    path: '/dashboard/products',
    icon: icon('ic_cart'),
    stage: false,
  },
  {
    title: 'blog',
    path: '/dashboard/blog',
    icon: icon('ic_blog'),
    stage: false,
  },
  {
    title: 'login',
    path: '/login',
    icon: icon('ic_lock'),
    stage: false,
  },
  {
    title: 'Not found',
    path: '/404',
    icon: icon('ic_disabled'),
    stage: false,
  },
];

export default navConfig;
