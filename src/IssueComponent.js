import React from 'react';

class IssueComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const open = <i className="fas fa-exclamation-circle issue-logo-green"></i>;
    const close = <i className="fas fa-exclamation-circle issue-logo-red"></i>
    return (
      <div className="issue-container">
        {this.props.flag === 'open' ? open : close}
        <a href={this.props.url} target="_blank" className="issue-text title" rel="noopener noreferrer">{this.props.title}</a>
        <p className="issue-text issues-snippet">{this.props.snippet}</p>
        <p className="issue-text">Created on {this.props.date} by <a href={this.props.author.html_url} className="author-link" target="_blank" rel="noopener noreferrer">{this.props.author.login}</a> <img src={this.props.author.avatar_url} className="avatar-pic" alt="avatar-pic"/></p>
      </div>
    )
  }
}

export default IssueComponent;
