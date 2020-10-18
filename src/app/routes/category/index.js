import React, { Component } from "react";
import CategoryTable from "../../../components/Category/categoryTable";
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
import * as CategoryActions from "../../../actions/category";
import { Link } from "react-router-dom";
import MuiLink from "@material-ui/core/Link";
import SearchIcon from "@material-ui/icons/Search";
import { bindActionCreators } from "redux";
import Swal from 'sweetalert2';
class Category extends Component {
  state = {
    open: false,
    categoryName: "",
    category: {},
  };
  componentDidMount() {
    const { onCategoryActions } = this.props;
    const { getListCategory } = onCategoryActions;
    getListCategory();
  }
  handleOpen = async (category) => {
    this.setState({
      open: true,
      category: category,
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
      category: {},
    });
  };

  onSubmit = async (event) => {
    const { onCategoryActions } = this.props;
    const { category } = this.state;
    const {
      createCategoryRequest,
      getListCategory,
      updateCategoryRequest,
    } = onCategoryActions;
    let name = await category.categoryName;

    if (category.categoryID === undefined) {
      await createCategoryRequest(name);
      await getListCategory();
      Swal.fire({
        icon: "success",
        title: "Tạo thành công !",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      await updateCategoryRequest({
        categoryID: category.categoryID,
        categoryName: category.categoryName,
      });
      await getListCategory();
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
    const { onCategoryActions } = this.props;
    const { filterCategoryRequest } = onCategoryActions;
    filterCategoryRequest(value);
  };
  render() {
    const {
      listCategory,
      history,
      match,
      classes,
      listCategoryFilter,
      keyword,
    } = this.props;
    let { open, category } = this.state;
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
                          placeholder="Tìm kiếm Tên Danh Mục"
                          onChange={this.onSearch}
                          inputProps={{
                            "aria-label": "Tìm kiếm Tên Danh Mục",
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
                      <Tooltip title="Tạo Danh Mục">
                        <IconButton size="medium" onClick={this.onCreate}>
                          <MuiLink component={Link} to={"#"}>
                            <LibraryAdd />
                          </MuiLink>
                        </IconButton>
                      </Tooltip>
                    </Grid>
                  </Grid>
                </div>
                <CategoryTable
                  handleOpen={this.handleOpen}
                  match={match}
                  listCategory={
                    keyword === null ? listCategory : listCategoryFilter
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
                  <h2>Tạo Danh Mục</h2>
                </div>

                <div className="login-form">
                  <form>
                    <TextField
                      required
                      type="text"
                      onChange={(event) =>
                        this.setState({
                          category: {
                            ...category,
                            categoryName: event.target.value,
                          },
                        })
                      }
                      variant="outlined"
                      value={category.categoryName}
                      label="Tên danh mục"
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
                        {category.categoryID ? "Cập Nhật" : "Tạo"}
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
    category: state.category.category,
    listCategory: state.category.listCategory,
    listCategoryFilter: state.category.listCategoryFilter,
    keyword: state.category.keyword,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onCategoryActions: bindActionCreators(CategoryActions, dispatch),
  };
};
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withStyles(styles), withConnect)(Category);
