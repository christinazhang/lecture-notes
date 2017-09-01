import React, {Component} from 'react';
import styled from 'styled-components';
import Remarkable from 'remarkable';
import {BrowserRouter as Router, Route, NavLink} from 'react-router-dom';

import './style.min.css'

// An array of Objects that organizes my notes by subject and lecture number
// {name: String, lecture: [Array of numbers]}
const notes = [
  {
    name: 'CS246',
    lectures: [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12
    ]
  }
];

const Content = styled.div `
  display: flex;
  flex-direction: column;
  /* Display vertically on mobile */
  @media only screen and (min-device-width: 768px) {
    flex-direction: row;
  }
`;

const Navbar = styled.ul `
  padding-left: 0;
  color: white;
  list-style: none;
  min-height: 100vh;
  flex: 1 0 1;
  background-color: #333;
`;

const NoteContainer = styled.div `
  width: 100%;
  flex: 5;
  padding: 32px;
`;

const Info = styled.div `
  display: none;
  @media only screen and (min-device-width: 768px){
    background-color: #673AB7;
    display: block;
    padding: 24px;
    text-align: center;
  }
`;

const LectureList = styled.ul `
  overflow: hidden;
  height: ${props => props.expanded
  ? props.height + 'px'
  : '0px'};
  width: 100%;
  padding-left: 0;
  background-color: #444;
  transition: all 0.2s;
`;

const LectureLink = styled(NavLink)`
  width: 100%;
  display: block;
  padding: 8px 32px;
`
const Lecture = styled.li `
  height: 40px;
  text-align: center;
  background-color: #444;
  list-style: none;
  a, a:visited, a:hover, a:focus {
    text-decoration: none;
    color: white;
  }
`;

const CourseName = styled.button `
  color: white;
  padding: 8px 16px;
  width: 100%;
  background-color: #222;
  border: none;
  &:active {
    outline: none;
  }
`;

class Note extends Component {
  constructor() {
    super()
    this.state = {
      markdown: '',
      md: new Remarkable()
    }
  }
  componentWillMount() {
    const path = require('./notes/' + this.props.course + '/lecture-' + this.props.lecture + '.md');
    fetch(path).then(response => {
      return response.text()
    }).then(text => {
      this.setState({markdown: text})
    })
  }
  render() {
    return (
      <NoteContainer className='container' dangerouslySetInnerHTML={{
        __html: this.state.md.render(this.state.markdown)
      }}></NoteContainer>
    )
  }
}

class Course extends Component {
  constructor() {
    super();
    this.state = {
      expanded: false
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.setState({
      expanded: !this.state.expanded
    })
  }
  render() {
    const {name, lectures} = this.props.data;
    return (
      <li>
        <CourseName onClick={this.handleClick}>
          {name}
        </CourseName>
        <LectureList expanded={this.state.expanded} height={lectures.length ? lectures.length * 40 : 40}>
          {lectures.length ?
            // If there are lectures, display them, otherwise display 'No notes yet!'
            lectures.map((lecture, index) => (
              <Lecture key={index}>
                <LectureLink activeStyle={{
                  backgroundColor: '#333'
                }} to={'/' + name + '/' + lecture}>
                  Lecture {lecture}
                </LectureLink>
              </Lecture>
            )) : 'No notes yet!'
        }
        </LectureList>
      </li>
    )
  }
}

class App extends Component {
  render() {
    return (
      <Router>
        <Content>
          <Navbar>
            <Info>
              <h3>Lecture Notes</h3>
              Christina Zhang
            </Info>
            {/*List the courses*/}
            {notes.map((course, index) => (<Course key={index} data={course}/>))}
          </Navbar>
          {notes.map((course, index) => (course.lectures.map((lecture, index) => (
            <Route path={'/' + course.name + '/' + lecture} render={() => (<Note lecture={lecture} course={course.name}/>)}/>
          ))))}
        </Content>
      </Router>
    )
  }
}

export default App;
