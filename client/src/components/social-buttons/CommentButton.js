import { HiPencilAlt } from 'react-icons/hi';
import { FormIconButton } from '../form-elements';

const CommentButton = () => {
  return (
    <FormIconButton
      tooltip='Add comment'
      type='submit'
      className='comment-btn'
      Icon={<HiPencilAlt size={20} />}
    />
  );
};

export default CommentButton;
