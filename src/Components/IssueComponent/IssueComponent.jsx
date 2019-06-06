import React from 'react';

class IssueComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const open = <i className="fas fa-exclamation-circle issue-logo-green"></i>;
    const close = <i className="fas fa-exclamation-circle issue-logo-red"></i>;
    const labels = this.props.labels.map((x) => {
      let colorCode = '#' + x.color;
      return (<span key={x.id} style={{color: "white", backgroundColor: colorCode, fontWeight: "bold", fontSize: 11, padding: 2, marginRight: 2}}>{x.name.toLowerCase()}</span>)
    })
    return (
      <div className="issue-container">
        {this.props.flag === 'open' ? open : close}
        <div className="title-container issue-text">
          <a href={this.props.url} target="_blank" className="title" rel="noopener noreferrer">{this.props.title}</a>
          {labels}
        </div>
        <p className="issue-text issues-snippet">{this.props.snippet}</p>
        <p className="issue-text">#{this.props.number} opened on {this.props.date} by <a href={this.props.author.html_url} className="author-link" target="_blank" rel="noopener noreferrer">{this.props.author.login}</a> <img src={this.props.author.avatar_url} className="avatar-pic" alt="avatar-pic"/> <a className="comments-link"href={this.props.cUrl} target="_blank" rel="noopener noreferrer"><i className="far fa-comments"></i> {this.props.comments} comments</a></p>
      </div>
    )
  }
}

export default IssueComponent;
