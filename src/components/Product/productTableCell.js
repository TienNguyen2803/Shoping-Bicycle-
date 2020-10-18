import React from "react";
import Avatar from "@material-ui/core/Avatar";
import { PlaylistPlay, Lock, LockOpen } from "@material-ui/icons";
import Tooltip from "@material-ui/core/Tooltip";
import { IconButton, CardMedia, withStyles, Card } from "@material-ui/core";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as ProductActions from "../../actions/product";
import { Link } from "react-router-dom";
import MuiLink from "@material-ui/core/Link";
import Swal from "sweetalert2";
import { compose } from "redux";
import styles from "./styles";
class ProductTableCell extends React.Component {
  onOptionMenuSelect = (event) => {
    this.setState({ menuState: true, anchorEl: event.currentTarget });
  };
  handleRequestClose = () => {
    this.setState({ menuState: false });
  };

  constructor() {
    super();
    this.state = {
      anchorEl: undefined,
      menuState: false,
      url: "",
    };
  }
  onDetails = () => {
    const { productID } = this.props.data;
    console.log(productID);
    // history.push(`${url}/product-details/${productID}`);
  };
  onDisable = () => {
    const { onProductActions, data } = this.props;
    const { disableProductRequest } = onProductActions;
    Swal.fire({
      title: data.isDisable === 1 ? "Xoá sản phẩm" : "Mở sản phẩm",
      text:
        data.isDisable === 1
          ? "Bạn muốn xoá sản phẩm này ?"
          : "Bạn muốn mở sản phẩm này ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Không",
    }).then((result) => {
      if (result.isConfirmed) {
        disableProductRequest(data.productID);
        Swal.fire({
          icon: "success",
          title: "Khoá thành công !",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  componentDidUpdate = (prevStates) => {
    if (prevStates.product !== this.props.product) {
      this.props.onProductActions.getListProduct();
    }
  };

  render() {
    const { match, stt } = this.props;
    const {
      productID,
      brandID,
      categoryID,
      isDisable,
      thumbnailImg,
      productName,
      price,
    } = this.props.data;
    const { classes } = this.props;
    const statusStyle =
      isDisable === 1 ? "text-white bg-success" : "text-white bg-red";
    return (
      <React.Fragment>
        <tr tabIndex={-1} key={stt}>
          <td>{stt + 1}</td>
          <td>{productName}</td>
          <td>{price}</td>
          <td>{categoryID}</td>
          <td>{brandID}</td>
          <td>
            <Avatar
              variant="square"
              sizes={24}
              className={classes.large}
              src={
                thumbnailImg
                  ? thumbnailImg
                  : `https://via.placeholder.com/400x300`
              }
            />
          </td>
          <td className="status-cell">
            <p className={` badge text-uppercase ml ${statusStyle}`}>
              {isDisable === 1 ? "Hoạt động" : "Đã khoá"}
            </p>
          </td>
          <td className="text-right">
            <Tooltip title="Chi tiết">
              <IconButton>
                <MuiLink
                  component={Link}
                  to={`${match.url}/product-details/${productID}`}
                >
                  <PlaylistPlay />
                </MuiLink>
              </IconButton>
            </Tooltip>
            <Tooltip
              title={isDisable === 1 ? "Khoá sản phẩm khoản" : "Mở sản phẩm"}
            >
              <IconButton onClick={this.onDisable}>
                <MuiLink component={Link} to={"#"}>
                  {isDisable === 1 ? <LockOpen /> : <Lock />}
                </MuiLink>
              </IconButton>
            </Tooltip>
          </td>
        </tr>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    product: state.product.product,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onProductActions: bindActionCreators(ProductActions, dispatch),
  };
};
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect, withStyles(styles))(ProductTableCell);
