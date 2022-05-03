import React, { PureComponent } from 'react';
import Table from '@trendmicro/react-table';
//import { TablePagination } from '@trendmicro/react-paginations';
import '@trendmicro/react-table/dist/react-table.css';
import '@trendmicro/react-paginations/dist/react-paginations.css';
import './../assets/scss/grid.scss';

const sortBy = require('sort-by');

class Grid extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        tableData: this.props.data,
        displayData: this.props.data.slice(0, 1000),
        pageCount: Math.ceil(this.props.data.length / 1000),
        pagination: {
          page: 1,
          pageLength: 1000
        },
        sortColumnKey: this.props.sortColumnKey ?? '',
        sortOrder: this.props.sortOrder ?? 'desc',
      };
    }
  
    componentWillReceiveProps(nextProps) {
      if (this.props.data !== nextProps.data) {
        this.setState({
          tableData: nextProps.data,
          displayData: nextProps.data.slice(0, 999)
        });
      }
      if (this.props.replyMsg) {
        if (this.props.replyMsg !== nextProps.replyMsg) {
          this.setState({ showRepliedMsg: nextProps.replyMsg });
        }
      }
    }
  
    /**
     * toggle sort order
     * @param {object} column
     * @param {boolean} clientSidePagination
     */
    toggleSortOrder = (column, clientSidePagination) => event => {
      let data = this.state.tableData;
      this.state.sortOrder === 'asc'
        ? data.sort(sortBy(column.key))
        : data.sort(sortBy('-' + column.key));
      this.setState({
        tableData: data,
        sortColumnKey: column.key,
        sortOrder: this.state.sortOrder === 'asc' ? 'desc' : 'asc'
      });
  
      if (clientSidePagination) {
        this.fetchRecords(
          this.state.pagination.page,
          this.state.pagination.pageLength
        );
      }
    };
  
    /**
     * feed in the correct set of columns which are sortable
     * to the table library
     * @param {object} columns
     * @param {boolean} clientSidePagination
     */
    sortableColumns = (columns, clientSidePagination) => {
      let columnArray = null;
      const { sortColumnKey, sortOrder } = this.state;
      columnArray = columns.map((column, index) => {
        if (column.sortable) {
          return {
            ...column,
            sortOrder: column.key === sortColumnKey ? sortOrder : '',
            onClick: this.toggleSortOrder(column, clientSidePagination)
          };
        } else {
          return column;
        }
      });
      return columnArray;
    };
  
    /**
     * filter the records based on the pagination criteria
     * @param {number} page
     * @param {number} pageLength
     */
    fetchRecords = (page, pageLength) => {
      const displayDataLastIndex = page * pageLength,
        diplayDataStartIndex = displayDataLastIndex - pageLength,
        displayData = this.state.tableData.slice(
          diplayDataStartIndex,
          displayDataLastIndex
        );
      this.setState({
        displayData: displayData,
        pagination: {
          page: page,
          pageLength: pageLength
        }
      });
    };

    handlePageClick = data => {
      this.props.collapseOpenRecords();
      let selected = data.selected + 1;
      this.fetchRecords(selected, this.state.pagination.pageLength);
    };
  
    /**
     * render to html
     * @param
     * @return
     */
    render() {
      const columnData = this.sortableColumns(
        this.props.columns,
        this.props.clientSidePagination
      );
      // const { page, pageLength } = this.state.pagination;
      // const totalRecords = this.state.tableData.length;

      
  
      return (
        <Table
          columns={columnData}
          data={
            this.state.displayData
          }
          bordered={true}
          hoverable={this.props.hoverable ?? false}
          justified={this.props.justified}
          rowKey={this.props.rowKey}
          useFixedHeader={this.props.useFixedHeader}
          maxHeight={this.props.maxHeight ? this.props.maxHeight : null}
          rowClassName={ () =>  this.props.rowClassName ? this.props.rowClassName : 'table-row'}
          onRowClick={this.props.onRowClick ? this.props.onRowClick : () => {}}
          emptyText={() => 'No data found'}
        />
      );
    }
  }
  
  export default Grid;