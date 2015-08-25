'use strict';

var React = require('react');

var AuthorSelect = React.createClass({
  render: function() {
    var wrapperClass = 'form-group';
    if (this.props.error && this.props.error.length > 0) {
      wrapperClass += ' ' + 'has-error';
    }

    var createAuthorOption = function(author) {
      return (
        <option value={author.id} key={author.id}>{author.name}</option>
      );
    };

    return (
      <div className={wrapperClass}>
        <label htmlFor={this.props.name}>{this.props.label}</label>
        <div className="field">
          <select
            name={this.props.name}
            ref={this.props.name}
            className="form-control"
            value={this.props.value}
            onChange={this.props.onChange} >
            <option>{this.props.defaultOption}</option>
            {this.props.options.map(createAuthorOption, this)}
          </select>
          <div className="input">{this.props.error}</div>
        </div>
      </div>
    );
  }
});

module.exports = AuthorSelect;
