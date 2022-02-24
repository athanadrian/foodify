import { useAppContext } from 'context/appContext';
import { useState } from 'react';
import { HiPencilAlt } from 'react-icons/hi';
import { IoTrashOutline } from 'react-icons/io5';
import { relativeDate } from 'utils/functions';
import Wrapper from '../wrappers/SocialModal';
import Alert from './Alert';
import { CommentFormInput, FormIconButton } from './form-elements';

const CommentsModal = ({ foodyId, comments }) => {
  const {
    addComment,
    showAlert,
    displayAlert,
    clearValues,
    commentText,
    handleChange,
  } = useAppContext();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange({ name, value });
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!commentText) {
      return displayAlert();
    }
    addComment({ text: commentText, foodyId });
    clearValues();
  };

  return (
    <Wrapper>
      {showAlert && <Alert />}
      <div className='socials-container'>
        <div className='socials-container-center'>
          {comments.length > 0 &&
            comments.map((comment) => (
              <ListItem key={comment._id} comment={comment} foodyId={foodyId} />
            ))}
          <form className='center comment-form' onSubmit={handleAddComment}>
            <CommentFormInput
              name='commentText'
              value={commentText}
              handleChange={handleInputChange}
              placeholder='Add comment'
            />
            <FormIconButton
              tooltip='Add comment'
              type='submit'
              className='comment-btn'
              Icon={<HiPencilAlt size={20} />}
            />
          </form>
        </div>
      </div>
    </Wrapper>
  );
};

export default CommentsModal;

const ListItem = ({ foodyId, comment }) => {
  const { user: loggedUser, removeComment } = useAppContext();

  const {
    _id: commentId,
    user: { name, _id },
    date,
    text,
  } = comment;
  const showDelete = loggedUser._id === _id;

  const handleDeleteComment = () => {
    removeComment({ foodyId, commentId });
  };

  return (
    <div className='social-container'>
      <div className='profile-icon'>{name.charAt(0)}</div>
      <div className='profile-info'>
        <div className='info-container'>
          <h5>
            {name}
            <span className='comment-text'>Added: </span>
            <span className='comment-date'>{relativeDate(date)}</span>
          </h5>
          <p className='comment'>{text}</p>
        </div>
        <span
          title='Delete comment'
          className='comment-delete-btn'
          onClick={handleDeleteComment}
        >
          {showDelete && <IoTrashOutline size={20} />}
        </span>
      </div>
    </div>
  );
};
