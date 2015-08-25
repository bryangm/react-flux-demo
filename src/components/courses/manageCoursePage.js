'use strict';

var React = require('react');
var Router = require('react-router');
var CourseForm = require('./courseForm');
var CourseActions = require('../../actions/courseActions');
var CourseStore = require('../../stores/courseStore');
var AuthorStore = require('../../stores/authorStore');
var toastr = require('toastr');

var _getCourseState = function(id) {
  return CourseStore.getCourseById(id);
};

var _getAuthorFormattedForDropdown = function(author) {
  return {
    id: author.id,
    name: author.firstName + ' ' + author.lastName
  };
};

var ManageCoursePage = React.createClass({
  mixins: [
    Router.Navigation
  ],

  statics: {
    willTransitionFrom: function(transition, component) {
      if (component.state.dirty && !confirm('Leave without saving?')) {
        transition.abort();
      }
    }
  },

  getInitialState: function() {
    return {
      course: { id: '', title: '', watchHref: '', length: '', category: '', author: '' },
      authors: [],
      errors: {},
      dirty: false
    };
  },

  componentWillMount: function() {
    CourseStore.addChangeListener(this._onChange);

    var courseId = this.props.params.id;

    if (courseId) {
      this.setState({course: CourseStore.getCourseById(courseId)});
    }

    this.setState({authors: AuthorStore.getAllAuthors().map(_getAuthorFormattedForDropdown) });
  },

  componentWillUnmount: function() {
    CourseStore.removeChangeListener(this._onChange);
  },

  setCourseState: function(event) {
    this.setState({dirty: true});
    var field = event.target.name;
    var value = event.target.value;

    if (field === 'author') {
      var author = AuthorStore.getAuthorById(value);
      value = _getAuthorFormattedForDropdown(author);
    }

    this.state.course[field] = value;
    return this.setState({course: this.state.course});
  },

  courseFormIsValid: function() {
    var formIsValid = true;
    this.state.errors = {};

    if (this.state.course.title.length < 5) {
      this.state.errors.title = 'Title must be at least 5 characters.';
      formIsValid = false;
    }

    if (!this.state.course.author.id) {
      this.state.errors.author = 'Author must be selected.';
      formIsValid = false;
    }

    this.setState({errors: this.state.errors});
    return formIsValid;
  },

  saveCourse: function(event) {
    event.preventDefault();
    if (!this.courseFormIsValid()) {
      return;
    }

    if (this.state.course.id) {
      CourseActions.updateCourse(this.state.course);
    } else {
      CourseActions.createCourse(this.state.course);
    }

    this.setState({dirty: false});
    toastr.success('Course saved.');
    this.transitionTo('courses');
  },

  _onChange: function() {
    this.setState(_getCourseState());
  },

  render: function() {
    return (
      <CourseForm
        course={this.state.course}
        authors={this.state.authors}
        onChange={this.setCourseState}
        onChangeAuthor={this.setCourseAuthorState}
        onSave={this.saveCourse}
        errors={this.state.errors} />
    );
  }
});

module.exports = ManageCoursePage;
