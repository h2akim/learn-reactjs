import { TiArrowSortedUp } from "react-icons/ti";
import { IconContext } from "react-icons";
import { DateTime } from "luxon";
import CommentForm from "./CommentForm";
import { useState } from "react";
import UpvoteService from "../services/UpvoteService";

const Comment = (props) => {
  const comment = props.comment;
  const user = props.user;

  const [showReply, setShowReply] = useState(false);
  const [replyToComment, setReplyToComment] = useState(null);

  const upvote = async (comment) => {
    try {
      await UpvoteService.toggle({ id: comment.id, parent_id: comment.parent_id }, user.id)
    } catch (err) {
      throw err;
    }
  };

  const toggleReply = () => {
    setShowReply(!showReply);
  }

  const replyTo = async (commentId) => {
    if (comment.parent_id) {
      commentId = comment.parent_id;
    }
    setReplyToComment(commentId);
    toggleReply();
  }

  return (
    <li className="flex items-start space-x-4">
      <img
        src={comment.user.avatar}
        className="flex-none w-11 h-11 rounded-full z-10"
        alt=""
      />
      <div className="grow-1 w-full py-1">
        {/* Commenter */}
        <div>
          <div className="flex items-end">
            <div className="font-medium text-gray-800">{comment.user.name}</div>
            <div className="flex items-end text-sm text-gray-500">
              <div className="mx-3">&bull;</div>
              {DateTime.fromISO(comment.created_at).toRelative() ?? "-"}
            </div>
          </div>
        </div>
        {/* Comment */}
        <div className="mt-1 text-gray-600">{comment.comment}</div>

        {/* Footer */}
        <div className="mt-3 text-sm flex space-x-8 font-medium text-slate-700">
          <button onClick={() => upvote(comment)} className="flex items-center">
            <IconContext.Provider value={{ size: "1.3em" }}>
              <TiArrowSortedUp className="mr-2" />
            </IconContext.Provider>
            Upvote ({comment.upvote_count})
          </button>
          <button onClick={() => replyTo(comment.id)}>Reply</button>
        </div>

        {showReply && (
          <div className="mt-6">
            <CommentForm user={user} replyTo={replyToComment} />
          </div>
        )}
      </div>
    </li>
  );
};

export default Comment;
