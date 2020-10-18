import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as AccountActions from "../../../actions/account";
import Swal from "sweetalert2";

class createAccount extends Component {
  state = {
    firstname: "",
    lastname: "",
    email: "",
    address: "",
    password: "",
    repassword: "",
  };

  // componentDidUpdate() {
  //   const { account, history } = this.props;
  //   if (account.account) {
  //     history.goBack();
  //   }
  // }
  onSubmit = async (event) => {
    event.preventDefault();
    const { onAccountActions, history } = this.props;
    const { createAccountRequest } = onAccountActions;
    const account = this.state;
    createAccountRequest(account);
    await Swal.fire({
      icon: "success",
      title: "Tạo tài khoản thành công !",
      showConfirmButton: false,
      timer: 1500,
    });
    await history.goBack();
  };
  render() {
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
            <h2>Tạo tài khoản</h2>
          </div>

          <div className="login-form">
            <form onSubmit={this.onSubmit}>
              <TextField
                required
                type="text"
                onChange={(event) =>
                  this.setState({ firstname: event.target.value })
                }
                variant="outlined"
                label="Họ"
                fullWidth
                margin="normal"
                className="mt-0 mb-2"
              />
              <TextField
                required
                type="text"
                onChange={(event) =>
                  this.setState({ lastname: event.target.value })
                }
                variant="outlined"
                label="Tên"
                fullWidth
                margin="normal"
                className="mt-0 mb-2"
              />
              <TextField
                required
                type="text"
                onChange={(event) =>
                  this.setState({ address: event.target.value })
                }
                variant="outlined"
                label="Địa chỉ"
                fullWidth
                margin="normal"
                className="mt-0 mb-2"
              />
              <TextField
                required
                type="email"
                onChange={(event) =>
                  this.setState({ email: event.target.value })
                }
                variant="outlined"
                label="Email"
                fullWidth
                margin="normal"
                className="mt-0 mb-2"
              />
              <TextField
                required
                type="password"
                onChange={(event) =>
                  this.setState({ password: event.target.value })
                }
                variant="outlined"
                label="Mật khẩu"
                fullWidth
                margin="normal"
                className="mt-0 mb-4"
              />
              <TextField
                required
                type="password"
                onChange={(event) =>
                  this.setState({ repassword: event.target.value })
                }
                label="Nhập Lại Mật khẩu"
                variant="outlined"
                fullWidth
                margin="normal"
                className="mt-0 mb-4"
              />
              <div className="mt-4 mb-2">
                <Button type="submit" variant="contained" color="secondary">
                  Đăng ký
                </Button>
              </div>
              <p>
                Đã có tài khoản
                <Link to="/login" className="ml-1">
                  Đăng nhập
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    account: state.account,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onAccountActions: bindActionCreators(AccountActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(createAccount);
