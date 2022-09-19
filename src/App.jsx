import { useEffect, useState } from 'react'
import CommentGroup from './components/CommentGroup'
import CommentForm from './components/CommentForm'
import CommentService from './services/CommentService'
import UserService from './services/UserService'
import { isEmpty } from 'lodash'

function App() {
  const [user, setUser] = useState({});
  const [comments, setComments] = useState([]);

  const loadEventSource = async () => {
    const eventSource = new EventSource('/api/events');
    eventSource.addEventListener("comment-update", ({ data }) => {
      const parsedData = JSON.parse(data);
      console.log(parsedData);
      if (!isEmpty(parsedData.parent_id)) {
        getComment(parsedData.parent_id);
      } else {
        listComment();
      } 
    })
  }

  const getComment = async (commentId) => {
    let comment = await CommentService.get(commentId)
    let cloneComments = comments
    for (i in cloneComments) {
      if (cloneComment[i].id == commentId) {
        cloneComment[i] = comment;
      }
    }
    setComments(cloneComments);
  }

  const listComment = async () => {
    let allComment = await CommentService.list();
    setComments(allComment.data);
  }

  const getUser = async () => {
    let currentUser = await UserService.get()
    setUser(currentUser.data)
  }

  const randomizeActiveUser = async () => {
    let currentUser = await UserService.randomize()
    setUser(currentUser.data)
  }

  useEffect(() => {
    try {
      getUser();
      listComment();
      loadEventSource();
    } catch (err) {
      //
    }
  }, []);

  const CommentList = () => {
    const allComment = comments.map((comment) => (
      <CommentGroup key={comment.id} comment={comment} user={user} />
    ))

    return (
      allComment
    )
  }

  return (
    <div className="bg-white mx-auto container max-w-screen-lg p-10 my-6 rounded-lg">
      <div>
        <div className="flex justify-between">
          <h3 className="text-2xl font-semibold">Discussion</h3>
          <button type="button" className="text-xs bg-slate-400 text-white rounded-md px-2 py-2" onClick={randomizeActiveUser}>Randomize Active User</button>
        </div>
        
        {/* Comment form */}
        <div className='py-14 mb-14 border-b'>
          <CommentForm user={user} />
        </div>

        {/* Comment list */}
        <div>
          <ul className="flex flex-col space-y-6">
            <CommentList />
          </ul>
        </div>
      </div>
    </div>
  )
}

export default App
