import React, { Component } from 'react';
import { render } from 'react-dom';

let {
  form,
  input
} = React.DOM;

class CommentForm extends Component {
  render() {
    return form({className: "commentForm"},
      input({type: "text", placeholder: "Name"}),
      input({type: "text", placeholder: "Comment"}),
      input({type: "submit", placeholder: "Post"}),
    );
  }
}

export default CommentForm;
