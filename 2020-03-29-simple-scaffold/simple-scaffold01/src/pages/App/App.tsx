import Header from '@/components/Header/Header';
import routes from '@/router/index';
import './app.scss';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export default function Home(): JSX.Element {
  return (
    <div>
      <Header />
      <Router>
        <nav>
          <Link to="/" className="nav-item">首页</Link>
          <Link to="/novels" className="nav-item">小说</Link>
          <Link to="/authors" className="nav-item">作者</Link>
        </nav>
        <Switch>
          {routes.map((route, index) => (
            <RouteWithSubRoutes key={index} {...route} />
          ))}
        </Switch>
      </Router>
    </div>
  );
}
interface RouteType {
  path: string;
  component: Function;
  routes?: object;
}

function RouteWithSubRoutes(route: RouteType) {
  return (
    <Route
      path={route.path}
      render={props => {
        return (
          <React.Suspense fallback={<div>加载中...</div>}>
            <route.component {...props} routes={route.routes}/>
          </React.Suspense>
        );
      }}
    />
  );
}