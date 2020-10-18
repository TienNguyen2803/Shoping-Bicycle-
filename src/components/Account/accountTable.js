import React, { Component } from "react";
import AccountTableCell from "./accountTableCell";
import TablePagination from "@material-ui/core/TablePagination";

class AccountTable extends Component {
  state = {
    page: 0,
    setPage: 0,
    rowsPerPage: 5,
    setRowsPerPage: 5,
  };
  handleChangePage = async(event, newPage) => {
    await this.setState({
      page: newPage,
    });
  };

   handleChangeRowsPerPage = async(event) => {
    await this.setState({
      rowsPerPage: +event.target.value,
      page: 0,
    });

  };
  render() {
    const { listAccount, history , match } = this.props;
    const { page, rowsPerPage, } = this.state;
    return (
      <div className="table-responsive-material">
        <table className="default-table table-unbordered table table-sm table-hover">
          <thead className="th-border-b">
            <tr>
              <th>Tên Khách Hàng</th>
              <th>Địa chỉ</th>
              <th>Email</th>
              <th>Trạng thái</th>
              <th className="status-cell text-right">Role</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {listAccount
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                  return (
                    <AccountTableCell match={match} key={index} data={row} history={history} />
                  );
              })}
          </tbody>
        </table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
          colSpan={3}
          count={listAccount.length}
          rowsPerPage={this.state.rowsPerPage}
          page={this.state.page}
          SelectProps={{
            inputProps: { "aria-label": "rows per page" },
            native: true,
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </div>
    );
  }
}

export default AccountTable;
