import React from 'react';

class Pagination extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searches: [{}],
      page: 1
    }
  }

  changePage = (p) => {
    this.setState({
      page: p
    });
    this.props.nextPage(this.state.page);
  };

  render() {
    var pages = [];
    for (var i=1;i<=this.props.pages;i++) {
      let j = i;
      pages.push(<button key={i} num={i} onClick={() => this.changePage(j)}>{i}</button>)
    }
    return (
      <div>
        <button onClick={() => this.changePage(this.state.page-1)}>previous page</button>
        <button onClick={() => this.changePage(this.state.page+1)}>next page</button>
        {pages}
      </div>
    )
  }
}

export default Pagination;
