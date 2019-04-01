import React, { PureComponent } from 'react';
import Loader from './Loader';
import IssueComponent from './Components/IssueComponent/IssueComponent';
import './issues.css';

require('dotenv').config({path: '.env'});

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

class Issues extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
      searches: [{}],
      language: '&',
      loading: true,
      page: 1
    };
    this.getIssues();
  };

  //Makes a GET request to the github issues api and updates states accordingly.
  getIssues = () => {
    const { searchValue, language, page } = this.state;
    fetch(`https://api.github.com/search/issues?q=${searchValue}+state:open${language}&page=${page}&per_page=30`)
      .then(res => res.json())
      .then(json => this.setState({
        total: json.total_count,
        searches: json.items,
        loading: false,
        total_pages: Math.floor(json.total_count/30)
      }));
  };

  //Changes the searchValue state to what the user inputs.
  handleChange = (e) => {
    this.setState({
      searchValue: e.target.value
    })
  };

  //Function to trigger the search.
  handleSubmit = (e) => {
    this.setState({
      loading: true,
      page: 1
    }, () => this.getIssues())
    e.preventDefault();
  };

  //Function to trigger the re-render when a new language is selected in the drop down menu.
  handleDrop = (e) => {
    this.setState({
      language: '+language:' + e.target.value + `&`,
      loading: true
    }, () => this.getIssues());
  };

  //Clean up the date string from json request.
  fixDate = (date) => {
    return(date.slice(0,10))
  };

  renderIssues = (searches) => {
    return searches.map((search) => {
      if (search.title) {
        let date = this.fixDate(search.created_at);
        return (<IssueComponent key={search.node_id} number={search.number} comments={search.comments} cUrl={search.comments_url} title={search.title} snippet={search.body} date={date} author={search.user} url={search.html_url} flag={search.state} labels={search.labels}/>)
      }
      else return null;
    });
  }

  render() {
    const { searches, total, loading } = this.state;
    return (
      <div>
        <h1 id="issues-header">GitHub Issues</h1>
        <div id="issues-page">
          <h2 id="issues-caption">Look up over millions of issues and pull requests across GitHub</h2>
          <form id="search-bar" onSubmit={this.handleSubmit}>
            <input type="tesearcht" onChange={this.handleChange} placeholder="Search for issues across millions of repos.."/>
          </form>
          <div id="issues-top">
            <p>{total} Issues</p>
            <select name="language" id="language-dropdown" onChange={this.handleDrop}>
              <option value="default" default hidden>Language</option>
              <option value="javascript">Javascript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="html">HTML</option>
              <option value="css">CSS</option>
              <option value="ruby">Ruby</option>
              <option value="csharp">C#</option>
              <option value="php">PHP</option>
              <option value="cpp">C++</option>
            </select>
          </div>
          {loading ? <Loader/> : this.renderIssues(searches)}
        </div>
      </div>
    );
  };
};

export default Issues;
