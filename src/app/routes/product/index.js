import React, { Component } from "react";
import ProductTable from "../../../components/Product/productTable";
import { withStyles } from "@material-ui/core/styles";
import {
  Container,
  Box,
  Grid,
  InputBase,
  IconButton,
  Tooltip,
  Paper,
} from "@material-ui/core";
import styles from "./styles";
import { compose } from "redux";
import { LibraryAdd } from "@material-ui/icons";
import { connect } from "react-redux";
import * as ProductActions from "../../../actions/product";
import { Link } from "react-router-dom";
import MuiLink from "@material-ui/core/Link";
import SearchIcon from "@material-ui/icons/Search";
import { bindActionCreators } from "redux";
class Product extends Component {
  componentDidMount() {
    const { onProductActions } = this.props;
    const { getListProduct } = onProductActions;
    getListProduct();
  }

  onCreate = () => {
    const { match, history } = this.props;
    history.push(`${match.url}/create-account`);
  };
  onSearch = (event) => {
    const value = event.target.value;
    const { onProductActions } = this.props;
    const { filterProductRequest } = onProductActions;
    filterProductRequest(value);
  };
  render() {
    const {
      listProduct,
      history,
      match,
      flag,
      classes,
      listProductFilter,
    } = this.props;
    return (
      <React.Fragment>
        <Box mt={2}>
          <Container maxWidth="lg">
            <Paper elevation={3}>
              <div className="jr-card">
                <div className="jr-card-header d-flex align-items-center">
                  <Grid container>
                    <Grid item xs={11}>
                      <Paper component="form" className={classes.root}>
                        <InputBase
                          className={classes.input}
                          placeholder="Tìm kiếm Tên Sẩn Phẩm"
                          onChange={this.onSearch}
                          inputProps={{
                            "aria-label": "Tìm kiếm Tên Sản Phẩm",
                          }}
                        />
                        <IconButton
                          className={classes.iconButton}
                          aria-label="search"
                        >
                          <MuiLink>
                            <SearchIcon />
                          </MuiLink>
                        </IconButton>
                      </Paper>
                    </Grid>
                    <Grid item xs={1} className={classes.iconAdd}>
                      <Tooltip title="Tạo Sản Phẩm">
                        <IconButton size="medium">
                          <MuiLink
                            component={Link}
                            to={`${match.url}/create-product`}
                          >
                            <LibraryAdd />
                          </MuiLink>
                        </IconButton>
                      </Tooltip>
                    </Grid>
                  </Grid>
                </div>
                <ProductTable
                  match={match}
                  listProduct={
                    flag
                      ? []
                      : listProductFilter.length === 0
                      ? listProduct
                      : listProductFilter
                  }
                  history={history}
                />
              </div>
            </Paper>
          </Container>
        </Box>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    listProduct: state.product.listProduct,
    flag: state.product.flag,
    listProductFilter: state.product.listProductFilter,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onProductActions: bindActionCreators(ProductActions, dispatch),
  };
};
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withStyles(styles), withConnect)(Product);
