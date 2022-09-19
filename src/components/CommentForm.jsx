import { useState } from "react";
import { isEmpty } from "lodash";
import CommentService from "../services/CommentService";

const CommentForm = (props) => {
  const user = props.user;
  const replyTo = props.replyTo;
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEmpty(comment)) {
      return;
    }

		try {
			await CommentService.post(
				{
					comment: comment,
					reply_to: replyTo,
				},
				user.id
			);
		} catch (err) {
			//
		} 
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center justify-between space-x-5">
        <img
          src={user.avatar}
          className="flex-none w-11 h-11 rounded-full"
          alt=""
        />
        <input
          type="text"
          className="grow-1 w-full border border-gray-200 rounded-md px-4 py-3"
          placeholder="What are your thoughts?"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          type="submit"
          className="flex-none bg-violet-500 rounded-md py-3 px-3 text-white font-semibold"
        >
          Comment
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
