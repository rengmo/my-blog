const Home = React.lazy(() => import('@/pages/Home/Home'));
const Novel = React.lazy(() => import('@/pages/Novel/Novel'));
const Author = React.lazy(() => import('@/pages/Author/Author'));

const routes = [
  {
    path: '/',
    exact: true,
    component: Home,
  },
  {
    path: '/novels',
    exact: true,
    component: Novel,
  },
  {
    path: '/authors',
    exact: true,
    component: Author,
  }
];

export default routes;