'use strict';

var Dispatcher = require('../dispatcher/appDispatcher');
var CourseApi = require('../api/courseApi');
var AuthorApi = require('../api/authorApi');
var ActionTypes = require('../constants/actionTypes');

var CourseActions = {
  createCourse: function(course) {
    course = CourseApi.saveCourse(course);

    Dispatcher.dispatch({
      actionType: ActionTypes.CREATE_COURSE,
      course: course
    });
  },

  updateCourse: function(course) {
    course = CourseApi.saveCourse(course);

    Dispatcher.dispatch({
      actionType: ActionTypes.UPDATE_COURSE,
      course: course
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
