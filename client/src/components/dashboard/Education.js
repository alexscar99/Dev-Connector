import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { deleteEducation } from '../../actions/profileActions';

class Education extends Component {
  handleDeleteClick(id) {
    this.props.deleteEducation(id);
  }

  render() {
    console.log(this.props.education);
    const education = this.props.education.map(edu => (
      <tr key={edu._id}>
        <td>{edu.school}</td>
        <td>{edu.degree}</td>
        <td>
          {console.log('from', edu.from)}
          {console.log('to', edu.to)}
          <Moment add={{ days: 1 }} format="MM/DD/YYYY">
            {edu.from}
          </Moment>{' '}
          -{' '}
          {edu.to === null ? (
            'Now'
          ) : (
            <Moment add={{ days: 1 }} format="MM/DD/YYYY">
              {edu.to}
            </Moment>
          )}
        </td>
        <td>
          <button
            onClick={this.handleDeleteClick.bind(this, edu._id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    ));
    return (
      <div>
        <h4 className="mb-4">Education Credentials</h4>
        <table className="table">
          <thead>
            <tr>
              <th>School</th>
              <th>Degree</th>
              <th>Years</th>
              <th />
            </tr>
            {education}
          </thead>
        </table>
      </div>
    );
  }
}

Education.propTypes = {
  deleteEducation: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteEducation }
)(Education);
