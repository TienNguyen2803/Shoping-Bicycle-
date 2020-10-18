import React from "react";
import { PlaylistPlay, Lock, LockOpen } from "@material-ui/icons";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as BrandActions from "../../actions/brand";
import { Link } from "react-router-dom";
import MuiLink from "@material-ui/core/Link";
import Swal from 'sweetalert2';
class BrandTableCell extends React.Component {
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
    };
  }
  onDetails = async() => {
    const {  handleOpen , data } = this.props;
    const brand = data;
    await this.setState({
      brand : brand
    })
    await handleOpen(brand);
  };
  onDisable = async() => {
    const { onBrandActions, data } = this.props;
    const { disableBrandRequest ,getListBrand} = onBrandActions;
     
    Swal.fire({
      title: data.isDisable === 1 ? "Ngưng hoạt động" : "Kích hoạt",
      text:
        data.isDisable === 1
          ? "Bạn muốn ngưng hoạt động thương hiệu này ?"
          : "Bạn muốn kích hoạt thương hiệu này ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Không",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: "success",
          title: "Ngưng hoạt động thành công !",
          showConfirmButton: false,
          timer: 1500,
        });
        await disableBrandRequest(data.brandID);
        await getListBrand();
        
      }
    });
  };

  render() {
    const {  index } = this.props;
    const { brandName, isDisable } = this.props.data;

    const statusStyle =
      isDisable === 1 ? "text-white bg-success" : "text-white bg-red";
    return (
      <React.Fragment>
        <tr tabIndex={-1} key={index}>
          <td>{index + 1}</td>
          <td>{brandName}</td>
          <td className="status-cell">
            <p className={` badge text-uppercase ${statusStyle}`}>
              {isDisable === 1 ? "Hoạt động" : "Ngưng hoạt động"}
            </p>
          </td>
          <td className="text-right">
            <Tooltip title="Chi tiết">
              <IconButton onClick={this.onDetails}>
                <MuiLink component={Link} to={"#"}>
                  <PlaylistPlay />
                </MuiLink>
              </IconButton>
            </Tooltip>
            <Tooltip title={isDisable === 1 ? "Hoạt động" : "Ngưng hoạt động"}>
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
    brand: state.brand.brand,
    keyword: state.brand.keyword,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onBrandActions: bindActionCreators(BrandActions, dispatch),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(BrandTableCell);
