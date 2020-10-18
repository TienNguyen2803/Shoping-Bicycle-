import React from "react";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import { Link, useRouteMatch } from "react-router-dom";
import MuiLink from "@material-ui/core/Link";

const ContainerHeader = ({ title, match }) => {
  const homeMatches = useRouteMatch("/app/home");
  const listAccoutMatches = useRouteMatch("/app/account");
  const listBrandMatches = useRouteMatch("/app/brand");
  const listCategoryMatches = useRouteMatch("/app/category");
  const detailAccountMatches = useRouteMatch(
    "/app/account/account-details/:userID"
  );
  const createAccountMatches = useRouteMatch("/app/account/create-account");

  const listProductMatches = useRouteMatch("/app/product");
  const detailProductMatches = useRouteMatch(
    "/app/product/product-details/:productID"
  );
  const createProductMatches = useRouteMatch("/app/product/create-product");
  return (
    <div className="page-heading d-sm-flex justify-content-sm-between align-items-sm-center">
      <h2 className="title mb-3 mb-sm-0">{title}</h2>

      <Breadcrumbs>
        {homeMatches && (
          <MuiLink component={Link} to="/">
            Trang chủ
          </MuiLink>
        )}
        {listBrandMatches && (
          <MuiLink component={Link} to="/app/brand">
            Danh sách thuơng hiệu
          </MuiLink>
        )}
         {listCategoryMatches && (
          <MuiLink component={Link} to="/app/category">
            Danh sách danh mục
          </MuiLink>
        )}
        {listAccoutMatches && (
          <MuiLink component={Link} to="/app/account">
            Danh sách tài khoản
          </MuiLink>
        )}
        {createAccountMatches && (
          <MuiLink component={Link} to="/app/account/create-account">
            Tạo tài khoản
          </MuiLink>
        )}
        {detailAccountMatches && (
          <MuiLink
            component={Link}
            to={`/app/account/account-details/${detailAccountMatches.params.userID}`}
          >
            Chi tiết tài khoản
          </MuiLink>
        )}
        {listProductMatches && (
          <MuiLink component={Link} to="/app/product">
            Danh sách sản phẩm
          </MuiLink>
        )}
        {createProductMatches && (
          <MuiLink component={Link} to="/app/product/create-product">
            Tạo sản phẩm
          </MuiLink>
        )}
        {detailProductMatches && (
          <MuiLink
            component={Link}
            to={`/app/product/product-details/${detailProductMatches.params.productID}`}
          >
            Chi tiết sản phẩm
          </MuiLink>
        )}
      </Breadcrumbs>
    </div>
  );
};

export default ContainerHeader;
