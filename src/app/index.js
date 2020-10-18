import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Header from "components/Header/index";
import Sidebar from "containers/SideNav/index";
import Footer from "components/Footer";
import Tour from "../components/Tour/index";
import Account from "./routes/account/index";
import AccountCreate from "./routes/account/createAccount";
import AccountDetails from "./routes/account/accountDetails";
import Category from "./routes/category/index";
import Brand from "./routes/brand/index";
import Product from "./routes/product/index";
import ProductCreate from "./routes/product/createProduct";
import ProductDetails from "./routes/product/productDetails";
import ContainerHeader from "../components/ContainerHeader/index";
import Home from "./routes/home/index";
import { Box } from "@material-ui/core";

import {
  ABOVE_THE_HEADER,
  BELOW_THE_HEADER,
  COLLAPSED_DRAWER,
  FIXED_DRAWER,
  HORIZONTAL_NAVIGATION,
} from "constants/ActionTypes";
import { isIOS, isMobile } from "react-device-detect";
import asyncComponent from "../util/asyncComponent";
import TopNav from "components/TopNav";

class App extends React.Component {
  render() {
    const {
      match,
      drawerType,
      navigationStyle,
      horizontalNavPosition,
    } = this.props;
    const drawerStyle = drawerType.includes(FIXED_DRAWER)
      ? "fixed-drawer"
      : drawerType.includes(COLLAPSED_DRAWER)
      ? "collapsible-drawer"
      : "mini-drawer";

    //set default height and overflow for iOS mobile Safari 10+ support.
    if (isIOS && isMobile) {
      document.body.classList.add("ios-mobile-view-height");
    } else if (document.body.classList.contains("ios-mobile-view-height")) {
      document.body.classList.remove("ios-mobile-view-height");
    }
    return (
      <div className={`app-container ${drawerStyle}`}>
        <Tour />

        <Sidebar />
        <div className="app-main-container">
          <div
            className={`app-header ${
              navigationStyle === HORIZONTAL_NAVIGATION
                ? "app-header-horizontal"
                : ""
            }`}
          >
            {navigationStyle === HORIZONTAL_NAVIGATION &&
              horizontalNavPosition === ABOVE_THE_HEADER && (
                <TopNav styleName="app-top-header" />
              )}
            <Header />
            {navigationStyle === HORIZONTAL_NAVIGATION &&
              horizontalNavPosition === BELOW_THE_HEADER && <TopNav />}
          </div>

          <main className="app-main-content-wrapper">
            <Box mt={3} ml={4} mr={4}>
              <ContainerHeader title="Shopping" match={match} />
            </Box>
            <div className="app-main-content">
              <Switch>
                <Route path={`${match.url}/home`} exact component={Home} />
                <Route
                  path={`${match.url}/account`}
                  exact
                  component={Account}
                />
                <Route
                  path={`${match.url}/account/account-details/:id`}
                  exact
                  component={AccountDetails}
                />
                <Route
                  exact
                  path={`${match.url}/account/create-account`}
                  component={AccountCreate}
                />
                <Route
                  path={`${match.url}/category`}
                  exact
                  component={Category}
                />
                <Route
                  path={`${match.url}/brand`}
                  exact
                  component={Brand}
                />
                 <Route
                  path={`${match.url}/product`}
                  exact
                  component={Product}
                />
                <Route
                  path={`${match.url}/product/product-details/:id`}
                  exact
                  component={ProductDetails}
                />
                <Route
                  exact
                  path={`${match.url}/product/create-product`}
                  component={ProductCreate}
                />
                <Route
                  component={asyncComponent(() =>
                    import("components/Error404")
                  )}
                />
              </Switch>
            </div>
            <Footer />
          </main>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ settings }) => {
  const { drawerType, navigationStyle, horizontalNavPosition } = settings;
  return { drawerType, navigationStyle, horizontalNavPosition };
};
export default withRouter(connect(mapStateToProps)(App));
