import React, { Component } from "react";
import {
  TextField,
  withStyles,
  Fab,
  Grid,
  Box,
  Avatar,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as ProductActions from "../../../actions/product";
import * as BrandActions from "../../../actions/brand";
import * as CategoryActions from "../../../actions/category";
import Swal from "sweetalert2";
import InputLabel from "@material-ui/core/InputLabel";
import AddIcon from "@material-ui/icons/Add";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { compose } from "redux";
import styles from "./styles";
import { storage } from "../../../firebase/firebase";
class createProduct extends Component {
  state = {
    productName: "",
    price: "",
    quantity: "",
    categoryID: "",
    brandID: "",
    thumbnailImg: null,
    progress: 0,
    url: "",
  };

  componentDidMount() {
    const { onCategoryActions, onBrandActions } = this.props;
    const { getListCategory } = onCategoryActions;
    const { getListBrand } = onBrandActions;
    getListCategory();
    getListBrand();
  }
  onSubmit = async (event) => {
    event.preventDefault();
    const { onProductActions, history, listCategory, listBrand } = this.props;
    const { createProductRequest } = onProductActions;
    const {
      thumbnailImg,
      productName,
      price,
      quantity,
      categoryID,
      brandID,
    } = this.state;
    const uploadImg = storage
      .ref(`Images/${thumbnailImg.name}`)
      .put(thumbnailImg);
    let timerInterval;
    Swal.fire({
      title: "Đang tạo sản phẩm",
      html: "Vui lòng chờ đợi trong giây lát !",
      timerProgressBar: true,
      willOpen: () => {
        Swal.showLoading();
        timerInterval = setInterval(() => {
          const content = Swal.getContent();
          if (content) {
            const b = content.querySelector("b");
            if (b) {
              b.textContent = Swal.getTimerLeft();
            }
          }
        }, 100);
      },
      onClose: () => {
        clearInterval(timerInterval);
      },
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log("I was closed by the timer");
      }
    });
    uploadImg.on(
      "state_changed",
      (snapshot) => {
        console.log(snapshot);
        // progress function ...
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        this.setState({ progress });
      },
      (error) => {
        // Error function ...
        console.log(error);
      },
      () => {
        storage
          .ref("Images")
          .child(thumbnailImg.name)
          .getDownloadURL()
          .then(async (url) => {
            // complete function ...
            let product = {
              thumbnailImg: url,
              categoryID,
              productName,
              price,
              quantity,
              brandID,
            };
            if (product.categoryID === "") {
              product = await {
                ...product,
                categoryID: listCategory[0].categoryID,
              };
            }
            if (product.brandID === "") {
              product = await {
                ...product,
                brandID: listBrand[0].brandID,
              };
            }
            createProductRequest(product);

            await Swal.fire({
              icon: "success",
              title: "Tạo sản phẩm thành công !",
              showConfirmButton: false,
              timer: 1500,
            });
            Swal.close();
            await history.goBack();
          });
      }
    );
  };
  render() {
    const { classes, listCategory, listBrand } = this.props;
    let { categoryID, brandID, thumbnailImg } = this.state;
    return (
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
            <h2>Tạo sản phẩm</h2>
          </div>
          <div className="login-form">
            <form onSubmit={this.onSubmit}>
              <Grid container>
                <Grid item xs={12}>
                  <TextField
                    required
                    type="text"
                    onChange={(event) =>
                      this.setState({ productName: event.target.value })
                    }
                    variant="outlined"
                    label="Tên sản phẩm"
                    fullWidth
                    margin="normal"
                    className="mt-0 mb-2"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    type="number"
                    onChange={(event) =>
                      this.setState({ price: event.target.value })
                    }
                    variant="outlined"
                    label="Giá"
                    fullWidth
                    margin="normal"
                    className="mt-0 mb-2"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    type="number"
                    onChange={(event) =>
                      this.setState({ quantity: event.target.value })
                    }
                    variant="outlined"
                    label="Số luợng"
                    fullWidth
                    margin="normal"
                    className="mt-0 mb-2"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <InputLabel htmlFor="outlined-age-native-simple">
                      Danh mục
                    </InputLabel>
                    <Select
                      native
                      required
                      value={categoryID}
                      onChange={(event) =>
                        this.setState({ categoryID: event.target.value })
                      }
                      label="Danh mục"
                      inputProps={{
                        name: "age",
                        id: "outlined-age-native-simple",
                      }}
                    >
                      {listCategory.map((category, index) => (
                        <option key={index} value={category.categoryID}>
                          {category.categoryName}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} className={classes.mb}>
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <InputLabel htmlFor="outlined-age-native-simple">
                      Thương hiệu
                    </InputLabel>
                    <Select
                      native
                      required
                      value={brandID}
                      onChange={(event) =>
                        this.setState({ brandID: event.target.value })
                      }
                      label="Thương hiệu"
                      inputProps={{
                        name: "age",
                        id: "outlined-age-native-simple",
                      }}
                    >
                      {listBrand.map((brand, index) => (
                        <option key={index} value={brand.brandID}>
                          {brand.brandName}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} className={classes.display}>
                  <label htmlFor="upload-photo">
                    <input
                      onChange={(event) => {
                        if (event.target.files[0]) {
                          this.setState({
                            thumbnailImg: event.target.files[0],
                          });
                        }
                      }}
                      style={{ display: "none" }}
                      id="upload-photo"
                      name="upload-photo"
                      type="file"
                    />
                    <Fab
                      color="secondary"
                      size="small"
                      component="span"
                      arial-label="add"
                      variant="extended"
                    >
                      <AddIcon /> Thêm hình ảnh
                    </Fab>
                  </label>
                </Grid>

                <Grid item xs={12} className={classes.containerImg}>
                  <Avatar
                    variant="square"
                    sizes={24}
                    className={classes.large}
                    src={thumbnailImg ? URL.createObjectURL(thumbnailImg) : ""}
                  />
                </Grid>
              </Grid>

              <div className={classes.display}>
                <Button type="submit" variant="contained" color="secondary">
                  Tạo sản phẩm
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    product: state.product,
    listCategory: state.category.listCategory,
    listBrand: state.brand.listBrand,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onProductActions: bindActionCreators(ProductActions, dispatch),
    onCategoryActions: bindActionCreators(CategoryActions, dispatch),
    onBrandActions: bindActionCreators(BrandActions, dispatch),
  };
};
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withStyles(styles), withConnect)(createProduct);
