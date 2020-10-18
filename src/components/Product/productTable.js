import React, { Component } from "react";
import ProductTableCell from "./productTableCell";
import TablePagination from "@material-ui/core/TablePagination";

class ProductTable extends Component {
  state = {
    page: 0,
    setPage: 0,
    rowsPerPage: 5,
    setRowsPerPage: 5,
  };
  handleChangePage = async (event, newPage) => {
    await this.setState({
      page: newPage,
    });
  };

  handleChangeRowsPerPage = async (event) => {
    await this.setState({
      rowsPerPage: +event.target.value,
      page: 0,
    });
  };
  render() {
    const { listProduct, history, match } = this.props;
    const { page, rowsPerPage } = this.state;
    return (
      <div className="table-responsive-material">
        <table className="default-table table-unbordered table table-sm table-hover">
          <thead className="th-border-b">
            <tr>
              <th>Số Thứ Tự</th>
              <th>Tên Sản Phẩm</th>
              <th>Giá</th>
              <th>Loại</th>
              <th>Thương Hiệu</th>
              <th>Hình ảnh</th>
              <th className="status-cell text-right">Status</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {listProduct
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <ProductTableCell
                    match={match}
                    stt={index}
                    key={index}
                    data={row}
                    history={history}
                  />
                );
              })}
          </tbody>
        </table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
          colSpan={3}
          count={listProduct.length}
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

export default ProductTable;
