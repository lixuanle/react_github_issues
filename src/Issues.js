require('dotenv').config({path: '.env'});
import React from 'react';
import './issues.css';
import Loader from './Loader';
import IssueComponent from './IssueComponent';
const fetch = require('node-fetch');
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

class Issues extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputV: '',
      total: 0,
      searches: [{}],
      language: '&',
      loading: 0,
      total_pages: 0,
      page: 1
    };
  };

  //Fires off the initial search to populate the page with the most recent issues.
  componentWillMount() {
    this.getIssues();
  };

  //Makes a GET request to the github issues api and updates states accordingly.
  getIssues = () => {
    let searchTerm = this.state.inputV;
    let languageSearch = this.state.language;
    let pageNum = this.state.page;
    console.log(pageNum);
    fetch(`https://api.github.com/search/issues?q=${searchTerm}+state:open${languageSearch}client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&page=${pageNum}&per_page=30`)
      .then(res => res.json())
      .then(json => this.setState({
        total: json.total_count,
        searches: json.items,
        loading: 0,
        total_pages: Math.floor(json.total_count/30)
      }));
  };

  //Changes the inputV state to what the user inputs.
  handleChange = (e) => {
    this.setState({
      inputV: e.target.value
    })
  };

  //Function to trigger the search.
  handleSubmit = (e) => {
    this.setState({
      loading: 1,
      page: 1
    }, () => this.getIssues())
    e.preventDefault();
  };

  //Function to trigger the re-render when a new language is selected in the drop down menu.
  handleDrop = (e) => {
    this.setState({
      language: '+language:' + e.target.value + `&`,
      loading: 1
    }, () => this.getIssues());
  };

  //Clean up the date string from json request.
  fixDate = (date) => {
    return(date.slice(0,10))
  };

  render() {
    const issues_list = this.state.searches.map((x) => {
      if (x.title) {
        let date = this.fixDate(x.created_at);
        return (<IssueComponent key={x.node_id} title={x.title} snippet={x.body} date={date} author={x.user} url={x.html_url} flag={x.state}/>)
      };
    });
    return (
      <div>
        <h1 id="issues-header">GitHub Issues</h1>
        <div id="issues-page">
          <h2 id="issues-caption">Look up over millions of issues and pull requests across GitHub</h2>
          <form id="search-bar" onSubmit={this.handleSubmit}>
            <input type="text" onChange={this.handleChange} placeholder="Search for issues across millions of repos.."/>
          </form>
          <div id="issues-top">
            <p>{this.state.total} Issues</p>
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
          {this.state.loading === 1 ? <Loader/> : issues_list}
        </div>
      </div>
    );
  };
};

export default Issues;
