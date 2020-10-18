import React, { Component } from "react";
import BrandTable from "../../../components/Brand/brandTable";
import { withStyles } from "@material-ui/core/styles";
import {
  Container,
  Box,
  Grid,
  InputBase,
  IconButton,
  Tooltip,
  Modal,
  Backdrop,
  Fade,
  TextField,
  Button,
  Paper,
} from "@material-ui/core";
import styles from "./styles";
import { compose } from "redux";
import { LibraryAdd } from "@material-ui/icons";
import { connect } from "react-redux";
import * as BrandActions from "../../../actions/brand";
import { Link } from "react-router-dom";
import MuiLink from "@material-ui/core/Link";
import SearchIcon from "@material-ui/icons/Search";
import { bindActionCreators } from "redux";
import Swal from 'sweetalert2';
class Brand extends Component {
  state = {
    open: false,
    brandName: "",
    brand: {},
  };
  componentDidMount() {
    const { onBrandActions } = this.props;
    const { getListBrand } = onBrandActions;
    getListBrand();
  }
  handleOpen = async (brand) => {
    this.setState({
      open: true,
      brand: brand,
    });
  };
  handleClose = () => {
    this.setState({
      open: false,
    });
  };
  onCreate = () => {
    this.setState({
      open: true,
      brand: {},
    });
  };

  onSubmit = async (event) => {
    const { onBrandActions } = this.props;
    const { brand } = this.state;
    const {
      createBrandRequest,
      getListBrand,
      updateBrandRequest,
    } = onBrandActions;
    let name = await brand.brandName;
    if (brand.brandID === undefined) {
      await createBrandRequest(name);
      await getListBrand();
      Swal.fire({
        icon: "success",
        title: "Tạo thành công !",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
     await updateBrandRequest({
        brandID: brand.brandID,
        brandName: brand.brandName,
      });
      await getListBrand();
      Swal.fire({
        icon: "success",
        title: "Cập nhật thành công !",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    this.handleClose();
  };
  onSearch = (event) => {
    const value = event.target.value;
    const { onBrandActions } = this.props;
    const { filterBrandRequest } = onBrandActions;
    filterBrandRequest(value);
  };
  render() {
    const {
      listBrand,
      history,
      match,
      classes,
      listBrandFilter,
      keyword,
    } = this.props;
    let { open, brand } = this.state;
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
                          placeholder="Tìm kiếm Tên Thương Hiệu"
                          onChange={this.onSearch}
                          inputProps={{
                            "aria-label": "Tìm kiếm Tên Thương Hiệu",
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
                      <Tooltip title="Tạo Thương Hiệu">
                        <IconButton size="medium" onClick={this.onCreate}>
                          <MuiLink component={Link} to={"#"}>
                            <LibraryAdd />
                          </MuiLink>
                        </IconButton>
                      </Tooltip>
                    </Grid>
                  </Grid>
                </div>
                <BrandTable
                  handleOpen={this.handleOpen}
                  match={match}
                  listBrand={
                    keyword === null ? listBrand : listBrandFilter
                  }
                  history={history}
                />
              </div>
            </Paper>
          </Container>
        </Box>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={this.handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className="login-container d-flex justify-content-center align-items-center animated slideInUpTiny animation-duration-3">
              <div className="login-content text-center">
                <div className="login-header">
                  <Link className="app-logo" to="/" title="Jambo">
                    <img
                      src={require("assets/images/logo-color.png")}
                      alt="jambo"
                      title="jambo"
                    />
                  </Link>
                </div>

                <div className="mb-4">
                  <h2>Tạo Thương Hiệu</h2>
                </div>

                <div className="login-form">
                  <form>
                    <TextField
                      required
                      type="text"
                      onChange={(event) =>
                        this.setState({
                          brand: {
                            ...brand,
                            brandName: event.target.value,
                          },
                        })
                      }
                      variant="outlined"
                      value={brand.brandName}
                      label="Tên thương hiệu"
                      fullWidth
                      margin="normal"
                      className="mt-0 mb-2"
                    />
                    <div className="mt-4 mb-2">
                      <Button
                        onClick={this.onSubmit}
                        variant="contained"
                        color="secondary"
                      >
                        {brand.brandID ?  "Cập Nhật":"Tạo"}
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </Fade>
        </Modal>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    brand: state.brand.brand,
    listBrand: state.brand.listBrand,
    listBrandFilter: state.brand.listBrandFilter,
    keyword: state.brand.keyword,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onBrandActions: bindActionCreators(BrandActions, dispatch),
  };
};
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withStyles(styles), withConnect)(Brand);
