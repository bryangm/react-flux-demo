'use strict';

var Dispatcher = require('../dispatcher/appDispatcher');
var CourseApi = require('../api/courseApi');
var AuthorApi = require('../api/authorApi');
var ActionTypes = require('../constants/actionTypes');

var CourseActions = {
  createCourse: function(course) {
    var author = AuthorApi.getAuthorById(course.author.id);
    course.author.name = author.firstName + " " + author.lastName;

    var newCourse = CourseApi.saveCourse(course);

    Dispatcher.dispatch({
      actionType: ActionTypes.CREATE_COURSE,
      course: newCourse
    });
  },

  updateCourse: function(course) {
    var author = AuthorApi.getAuthorById(course.author.id);
    course.author.name = author.firstName + " " + author.lastName;

    var updatedCourse = CourseApi.saveCourse(course);

    Dispatcher.dispatch({
      actionType: ActionTypes.UPDATE_COURSE,
      course: updatedCourse
    });
  },

  deleteCourse: function(id) {
    CourseApi.deleteCourse(id);
    Dispatcher.dispatch({
      actionType: ActionTypes.DELETE_COURSE,
      id: id
    });
  }
};

module.exports = CourseActions;
