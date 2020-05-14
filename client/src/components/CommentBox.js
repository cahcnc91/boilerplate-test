import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { saveComment, fetchComments } from "actions";

export default () => {
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const createComment = useCallback(
    (comment) => dispatch(saveComment(comment)),
    [dispatch, comment]
  );

  const fetchNewComments = useCallback(() => dispatch(fetchComments()), [
    dispatch,
  ]);

  const handleChangeComment = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createComment(comment);
    setComment("");
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h4>Add a comment</h4>
        <textarea value={comment} onChange={handleChangeComment} />
        <div>
          <button>Submit</button>
        </div>
      </form>
      <button id="fetch-comments" onClick={fetchNewComments}>
        Fetch comments
      </button>
    </div>
  );
};
