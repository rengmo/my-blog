// import Header from '@/components/Header/Header';
import routes from '@/router/index';
import './app.scss';
import '@/practice/learnTypeScript';

// aLib.m3(1); // Property 'm3' does not exist on type 'typeof aLib'.
// aLibM2([]);
// aLibM3(null);
// aLibM4(false);

// function a (x: aLib.ALibC) {
//   console.log('a');
// }

// function b (x: ALib.TypeA.C) {
//   console.log(x);
// }

// const c = new ALibC(1);
// c.m1;

// aLibD1 = 1;
// aLibD2 = 2;
// aLibD3 = 3; // 报错：Cannot assign to 'aLibD3' because it is a constant.

// aLibE(1); // 报错：Expected 0 arguments, but got 1.

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export default function Home(): JSX.Element {
  return (
    <div>
      {/* <Header /> */}
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

function RouteWithSubRoutes(route: RouteType): JSX.Element {
  return (
    <Route
      path={route.path}
      render={(props): object => {
        return (
          <React.Suspense fallback={<div>加载中...</div>}>
            <route.component {...props} routes={route.routes}/>
          </React.Suspense>
        );
      }}
    />
  );
}