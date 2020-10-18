import React, { Component } from "react";
import { Container, Paper, Box, Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as AccountActions from "../../../actions/account";
import Swal from "sweetalert2";
class accountDetails extends Component {
  constructor(props) {
    super(props);
    const {
      firstname,
      lastname,
      email,
      address,
      password,
      roleID,
      userID,
    } = this.props.account;
    this.state = {
      firstname: "" || firstname,
      lastname: "" || lastname,
      email: "" || email,
      address: "" || address,
      password: "" || password,
      roleID: "" || roleID,
      userID: "" || userID,
    };
  }

  componentDidMount() {
    const { onAccountActions, match } = this.props;
    const { getAccountRequest } = onAccountActions;
    getAccountRequest(match.params.id);
  }

  componentDidUpdate = async (prevStates) => {
    if (prevStates.account !== this.props.account) {
      const {
        firstname,
        lastname,
        email,
        address,
        password,
        roleID,
        userID,
      } = this.props.account;
      await this.setState({
        ...this.state,
        firstname: firstname,
        lastname: lastname,
        email: email,
        address: address,
        password: password,
        roleID: roleID,
        userID: userID,
      });
    }
  };

  onUpdate = () => {
    const { onAccountActions } = this.props;
    const { updateAccountRequest } = onAccountActions;
    updateAccountRequest(this.state);
    Swal.fire({
      icon: "success",
      title: "Cập nhật thành công !",
      showConfirmButton: false,
      timer: 1500,
    });
  };
  render() {
    const {
      firstname,
      lastname,
      email,
      address,
      password,
      roleID,
    } = this.state;
    return (
      <React.Fragment>
        <Box mt={3}>
          <Container maxWidth="lg">
            <Paper elevation={3}>
              <form
                onSubmit={this.onUpdate}
                autoComplete="off"
                className="contact-form jr-card"
              >
                <div className="row">
                  <div className="col-md-6 col-12">
                    <TextField
                      type="text"
                      onChange={(event) =>
                        this.setState({ firstname: event.target.value })
                      }
                      required
                      value={firstname}
                      variant="outlined"
                      label="Họ"
                      fullWidth
                      margin="normal"
                      className="mt-0 mb-2"
                    />
                  </div>

                  <div className="col-md-6 col-12">
                    <TextField
                      required
                      type="text"
                      onChange={(event) =>
                        this.setState({ lastname: event.target.value })
                      }
                      value={lastname}
                      variant="outlined"
                      label="Tên"
                      fullWidth
                      margin="normal"
                      className="mt-0 mb-2"
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 col-12">
                    <TextField
                      required
                      type="text"
                      onChange={(event) =>
                        this.setState({ password: event.target.value })
                      }
                      value={password}
                      variant="outlined"
                      label="Mật khẩu"
                      fullWidth
                      margin="normal"
                      className="mt-0 mb-4"
                    />
                  </div>

                  <div className="col-md-6 col-12">
                    <TextField
                      type="text"
                      required
                      onChange={(event) =>
                        this.setState({ roleID: event.target.value })
                      }
                      InputProps={{
                        readOnly: true,
                      }}
                      disabled
                      defaultValue={roleID === 1 ? "Admin" : "User"}
                      value={roleID === 1 ? "Admin" : "User"}
                      variant="outlined"
                      label="Chức vụ"
                      fullWidth
                      margin="normal"
                      className="mt-0 mb-2"
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-12">
                    <TextField
                      type="email"
                      required
                      onChange={(event) =>
                        this.setState({ email: event.target.value })
                      }
                      value={email}
                      variant="outlined"
                      label="Email"
                      fullWidth
                      margin="normal"
                      className="mt-0 mb-2"
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-12">
                    <TextField
                      required
                      multiline
                      rows={4}
                      type="text"
                      onChange={(event) =>
                        this.setState({ address: event.target.value })
                      }
                      value={address}
                      variant="outlined"
                      label="Địa chỉ"
                      fullWidth
                      margin="normal"
                      className="mt-0 mb-2"
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-12">
                    <div className="form-group mb-0">
                      <Button variant="contained" color="primary" type="submit">
                        Lưu
                      </Button>
                    </div>
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
    account: state.account.account,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onAccountActions: bindActionCreators(AccountActions, dispatch),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(accountDetails);
