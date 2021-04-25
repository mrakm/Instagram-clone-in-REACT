import React, { useState, useContext } from 'react';
import FirebaseContext from '../../context/firebase';
import UserContext from '../../context/user';

export default function AddComments({ docId, comment, setComment, commentInput }){
  const { firebase, fieldValue } = useContext(FirebaseContext);
  const [ comments, setComments ] = useState(comment);
  
  const { user: {displayName} } = useContext(UserContext);
  
  const handleSubmitComment = async (e) => {
    e.preventDefault();
    
    setComments([{ displayName, comment }, ...comments]);
    setComment=setComments('');
    
    return firebase
           .firestore()
           .collection('photos')
           .doc(docId)
           .update({
                comments: fieldValue.arrayUnion({ displayName, comment })
            })
  }
  
  return(
    <div className="border-t border-gray">
        <form 
            className="flex w-full justify-between pl-0 pr-5"
            onSubmit={(e) => comment.length >= 3 ? handleSubmitComment(e) : e.preventDefault()}
            method="POST"
        >
            <input
                aria-label="Add a comment"
                type="text"
                autoComplete="off"
                className="text-sm text-gray w-full mr-3 py-5 px-4"
                name="add-comment"
                placeholder="Add a comment..."
                value={comment}
                onChange={({ target }) => setComment(target.value)}
                ref={commentInput}
            />
            <button
                className={`text-sm font-bold text-blue-500 ${!comment && 'opacity-25'}`}
                type="button"
                disabled={comment.length < 3}
                onClick={handleSubmitComment}
            >
                  Post
            </button>
        </form>
    </div>
  )
}
