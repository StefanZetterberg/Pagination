import React, { Component } from "react";
import PropTypes from "prop-types";

const propTypes = {
  items: PropTypes.array.isRequired,
  onChangePage: PropTypes.func.isRequired,
  initialPage: PropTypes.number,
  pageSize: PropTypes.number,
};

const defaultProps = {
  initialPage: 1,
  pageSize: 10,
};

class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pager: {},
    };
    this.setPage = this.setPage.bind(this);
  }

  componentDidMount() {
    if (this.props.items && this.props.items.length) {
      this.setPage(this.props.initialPage);
    }
  }

  setPage(page) {
    var { items, pageSize } = this.props;

    if (page < 1 || page > this.state.pager.totalPages) {
      return;
    }

    var newPager = this.getPager(items.length, page, pageSize);
    var pageOfItems = items.slice(newPager.startIndex, newPager.endIndex + 1);

    this.setState({ pager: newPager });

    this.props.onChangePage(pageOfItems);
  }

  getPager(totalItems, currentPage, pageSize) {
    currentPage = currentPage || 1; // default to first page if not set
    pageSize = pageSize || 10; // default to 10 items per page if not set
    var totalPages = Math.ceil(totalItems / pageSize);
    var startPage, endPage;
    if (totalPages <= pageSize) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }

    var startIndex = (currentPage - 1) * pageSize;
    var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    var pages = [...Array(endPage + 1 - startPage).keys()].map(
      (i) => startPage + i
    );

    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages,
    };
  }

  getButtonTestName(buttonNo) {
    return "button"+buttonNo;
  }

  render() {
    return (
      <div>
        {!this.state.pager.pages ||
        this.state.pager.pages.length <= 1 ? null : (
          <div>
            <button
              onClick={() => this.setPage(1)}
              disabled={this.state.pager.currentPage === 1}
              data-testid="toFirstPageBtn"
              id="toFirstPageBtn"
            >
              Första
            </button>
            <button
              onClick={() => this.setPage(this.state.pager.currentPage - 1)}
              disabled={this.state.pager.currentPage === 1}
              data-testid="toPrevPageBtn"
              id="toPrevPageBtn"
            >
              &lt;&lt;
            </button>
            {this.state.pager.pages.map((page, index) => (
              <button
                id={this.getButtonTestName(page)}
                data-testid={this.getButtonTestName(page)}
                key={index}
                onClick={() => this.setPage(page)}
                disabled={this.state.pager.currentPage === page}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => this.setPage(this.state.pager.currentPage + 1)}
              disabled={
                this.state.pager.currentPage === this.state.pager.totalPages
              }
              data-testid="toNextPageBtn"
              id="toNextPageBtn"
            >
              &gt;&gt;
            </button>
            <button
              onClick={() => this.setPage(this.state.pager.totalPages)}
              disabled={
                this.state.pager.currentPage === this.state.pager.totalPages
              }
              data-testid="toLastPageBtn"
              id="toLastPageBtn"
            >
              Sista
            </button>
          </div>
        )}
      </div>
    );
  }
}

Pagination.propTypes = propTypes;
Pagination.defaultProps = defaultProps;
export default Pagination;
