import React from "react";
import Avatar from "@material-ui/core/Avatar";
import { PlaylistPlay, Lock, LockOpen } from "@material-ui/icons";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as AccountActions from "../../actions/account";
import { Link } from "react-router-dom";
import MuiLink from "@material-ui/core/Link";
import Swal from "sweetalert2";
class AccountTableCell extends React.Component {
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
  onDetails = () => {
    const { history } = this.props;
    const { userID } = this.props.data;
    const url = history.location.pathname;
    history.push(`${url}/account-details/${userID}`);
  };
  onDisable = () => {
    const { onAccountActions, data } = this.props;
    const { disableAccountRequest } = onAccountActions;
    Swal.fire({
      title: data.isDisable === 1 ? "Khoá tài khoản" : "Mở tài khoản",
      text:
        data.isDisable === 1
          ? "Bạn muốn khoá tài khoản này ?"
          : "Bạn muốn mở tài khoản này ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Không",
    }).then((result) => {
      if (result.isConfirmed) {
        disableAccountRequest(data.userID);
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
    if (prevStates.account !== this.props.account) {
      this.props.onAccountActions.getListAccount();
    }
  };

  render() {
    const { match } = this.props;
    const {
      firstname,
      lastname,
      email,
      address,
      roleID,
      userID,
      isDisable,
      key,
    } = this.props.data;
    const rolesStyle =
      roleID === 1
        ? "text-white bg-success"
        : roleID === 2
        ? "bg-amber"
        : roleID === 3
        ? "text-white bg-danger"
        : "text-white bg-grey";
    const statusStyle =
      isDisable === 1 ? "text-white bg-success" : "text-white bg-red";
    return (
      <React.Fragment>
        <tr tabIndex={-1} key={key}>
          <td>
            {firstname} {lastname}
          </td>
          <td>{address}</td>
          <td>
            <div className="user-profile d-flex flex-row align-items-center">
              <Avatar className="user-avatar" />
              <div className="user-detail">
                <h5 className="user-name">{email} </h5>
              </div>
            </div>
          </td>
          <td className="status-cell">
            <p className={` badge text-uppercase ${statusStyle}`}>
              {isDisable === 1 ? "Hoạt động" : "Đã khoá"}
            </p>
          </td>
          <td className="status-cell text-right">
            <div className={` badge text-uppercase ${rolesStyle}`}>
              {roleID === 1 ? "Admin" : "User"}
            </div>
          </td>
          <td className="text-right">
            <Tooltip title="Chi tiết">
              <IconButton>
                <MuiLink
                  component={Link}
                  to={`${match.url}/account-details/${userID}`}
                >
                  <PlaylistPlay />
                </MuiLink>
              </IconButton>
            </Tooltip>
            <Tooltip
              title={isDisable === 1 ? "Khoá tài khoản" : "Mở khoá tài khoản"}
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
    account: state.account.account,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onAccountActions: bindActionCreators(AccountActions, dispatch),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AccountTableCell);
