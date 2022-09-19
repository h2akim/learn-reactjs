import { isEmpty } from "lodash";
import Comment from "./Comment";

const CommentGroup = (props) => {
  const comment = props.comment;
  const noReplies = isEmpty(comment.replies);

  const LevelLine = () => {
    if (!isEmpty(comment.replies)) {
      return (
        <div className="border-l-2 border-gray-300 absolute top-0 bottom-0 left-5"></div>
      );
    }
  };

  const Replies = () => {
    const replies = comment.replies;
    const allReplies = replies.map((reply) => (
      <Comment key={reply.id} comment={reply} user={props.user} />
    ));

    return allReplies;
  };

  return (
    <div className="relative">
      <LevelLine />
      <Comment comment={props.comment} user={props.user} />
      {!noReplies &&
        <ul className="ml-14 pl-1 flex flex-col space-y-6 mt-6">
          <Replies />
        </ul>
      }
    </div>
  );
};

export default CommentGroup;
