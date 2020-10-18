import React, { Component } from "react";
import AccountTable from "../../../components/Account/accountTable";
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
import * as AccountActions from "../../../actions/account";
import { Link } from "react-router-dom";
import MuiLink from "@material-ui/core/Link";
import SearchIcon from "@material-ui/icons/Search";
import { bindActionCreators } from "redux";
class Account extends Component {
  componentDidMount() {
    const { onAccountActions } = this.props;
    const { getListAccount } = onAccountActions;
    getListAccount();
  }
  

  onCreate = () => {
    const { match, history } = this.props;
    history.push(`${match.url}/create-account`);
  };
  onSearch = (event) => {
    const value = event.target.value;
    const { onAccountActions } = this.props;
    const { filterAccountRequest } = onAccountActions;
    filterAccountRequest(value);
  };
  render() {
    const { listAccount, history, match, classes, listAccountFilter } = this.props;
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
                          placeholder="Tìm kiếm Tên Khách Hàng"
                          onChange={this.onSearch}
                          inputProps={{
                            "aria-label": "Tìm kiếm Tên Khách Hàng",
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
                      <Tooltip title="Tạo tài khoản">
                        <IconButton size="medium">
                          <MuiLink
                            component={Link}
                            to={`${match.url}/create-account`}
                          >
                            <LibraryAdd />
                          </MuiLink>
                        </IconButton>
                      </Tooltip>
                    </Grid>
                  </Grid>
                </div>
                <AccountTable
                  match={match}

                  listAccount={listAccountFilter.length === 0?listAccount:listAccountFilter}
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
    listAccount: state.account.listAccount,
    listAccountFilter : state.account.listAccountFilter
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onAccountActions: bindActionCreators(AccountActions, dispatch),
  };
};
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withStyles(styles), withConnect)(Account);
