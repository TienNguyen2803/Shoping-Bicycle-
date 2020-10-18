import React, { Component } from "react";
import {
  Container,
  Paper,
  Box,
  Button,
  Fab,
  Avatar,
  Typography,
} from "@material-ui/core";
import { storage } from "../../../firebase/firebase";
import { TextField, withStyles, Tooltip } from "@material-ui/core";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Swal from "sweetalert2";
import * as ProductActions from "../../../actions/product";
import * as BrandActions from "../../../actions/brand";
import * as CategoryActions from "../../../actions/category";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import AddIcon from "@material-ui/icons/Add";
import Select from "@material-ui/core/Select";
import { compose } from "redux";
import styles from "./styles";
class productDetails extends Component {
  constructor(props) {
    super(props);

    const {
      productID,
      productName,
      price,
      quantity,
      thumbnailImg,
      brandID,
      categoryID,
    } = this.props.product;
    this.state = {
      productID,
      thumbnailImg,
      productName,
      price,
      quantity,
      brandID,
      categoryID,
    };
  }

  async componentDidMount() {
    const {
      onProductActions,
      onCategoryActions,
      onBrandActions,
      match,
    } = this.props;
    const { getProductRequest } = onProductActions;
    const { getListCategory } = onCategoryActions;
    const { getListBrand } = onBrandActions;
    const productID = match.params.id;
    await getListCategory();
    await getListBrand();
    await getProductRequest(productID);
  }
  componentDidUpdate = async (prevStates) => {
    if (prevStates.product !== this.props.product) {
      const {
        productID,
        thumbnailImg,
        categoryID,
        productName,
        price,
        quantity,
        brandID,
      } = this.props.product;
      await this.setState({
        ...this.state,
        productID,
        categoryID,
        thumbnailImg,
        productName,
        price,
        quantity,
        brandID,
      });
    }
  };
  onSubmit = (e) => {
    e.preventDefault();
    const { onProductActions } = this.props;
    const { updateProductRequest } = onProductActions;
    const {
      productID,
      thumbnailImg,
      productName,
      price,
      categoryID,
      quantity,
      brandID,
    } = this.state;
    if (typeof thumbnailImg === "object") {
      const uploadImg = storage
        .ref(`Images/${thumbnailImg.name}`)
        .put(thumbnailImg);
      let timerInterval;
      Swal.fire({
        title: "Đang cập nhật sản phẩm",
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
                productID,
              };

              updateProductRequest(product);
              await Swal.fire({
                icon: "success",
                title: "Cập nhật phẩm thành công !",
                showConfirmButton: false,
                timer: 1500,
              });
              Swal.close();
            });
        }
      );
    } else {
      let product = {
        thumbnailImg,
        categoryID,
        productName,
        price,
        quantity,
        brandID,
        productID,
      };

      updateProductRequest(product);
      Swal.fire({
        icon: "success",
        title: "Cập nhật phẩm thành công !",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  render() {
    const {
      productName,
      price,
      thumbnailImg,
      quantity,
      brandID,
      categoryID,
    } = this.state;
    const { classes, listCategory, listBrand } = this.props;
    return (
      <React.Fragment>
        <Box mt={3}>
          <Container maxWidth="lg">
            <Paper elevation={3}>
              <form onSubmit={this.onSubmit} className="contact-form jr-card">
                <div className="row">
                  <div className="col-md-6 col-12">
                    <TextField
                      required
                      type="text"
                      value={productName}
                      onChange={(event) =>
                        this.setState({ productName: event.target.value })
                      }
                      variant="outlined"
                      label="Tên sản phẩm"
                      fullWidth
                      margin="normal"
                      className="mt-0 mb-2"
                    />
                  </div>
                  <div className="col-md-6 col-12">
                    <TextField
                      required
                      type="number"
                      value={price}
                      onChange={(event) =>
                        this.setState({ price: event.target.value })
                      }
                      variant="outlined"
                      label="Giá"
                      fullWidth
                      margin="normal"
                      className="mt-0 mb-2"
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-6">
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
                  </div>

                  <div className="col-6">
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
                  </div>
                </div>
                <Box mt={2}></Box>

                <div className="row">
                  <div className="col-md-6 col-12">
                    <TextField
                      required
                      type="number"
                      onChange={(event) =>
                        this.setState({ quantity: event.target.value })
                      }
                      value={quantity}
                      variant="outlined"
                      label="Số luợng"
                      fullWidth
                      margin="normal"
                      className="mt-0 mb-2"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className={`col-md-6 col-12 ${classes.containerImg}`}>
                    <Typography variant="h6" component="h4">
                      Hình ảnh
                    </Typography>
                    <Avatar
                      variant="square"
                      sizes={24}
                      className={classes.img}
                      src={
                        typeof thumbnailImg === "object"
                          ? URL.createObjectURL(thumbnailImg)
                          : thumbnailImg
                      }
                    ></Avatar>

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
                      <Box mt={2}></Box>
                      <Tooltip title="Cập nhật hình ảnh">
                        <Fab
                          color="primary"
                          size="small"
                          component="span"
                          arial-label="add"
                          variant="extended"
                        >
                          <AddIcon />
                        </Fab>
                      </Tooltip>
                    </label>
                  </div>
                </div>
                <Box mt={2}></Box>
                <div className="row">
                  <div className="col-11"></div>
                  <div className="col-1">
                    <Button variant="contained" color="primary" type="submit">
                      Lưu
                    </Button>
                  </div>
                </div>
              </form>
            </Paper>
          </Container>
        </Box>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    product: state.product.product,
    listCategory: state.category.listCategory,
    listBrand: state.brand.listBrand,
    listProduct: state.product.listProduct,
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
export default compose(withStyles(styles), withConnect)(productDetails);
