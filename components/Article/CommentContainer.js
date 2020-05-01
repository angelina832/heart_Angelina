import CommentInput from './CommentInput';
import CommentList from './CommentList';
import { Link } from 'react-router';
import React from 'react';

const CommentContainer = props => {
  if (props.currentUser) {
    return (
      <div className="col-xs-12 col-md-8 offset-md-2">

      </div>
    );
  } else {
    return (
      <div className="col-xs-12 col-md-8 offset-md-2">

      </div>
    );
  }
};

export default CommentContainer;
