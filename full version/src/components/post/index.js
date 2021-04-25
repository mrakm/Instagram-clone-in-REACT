import React, { useRef } from 'react';
import Actions from '/actions.js';
import Comments from './comments.js';
import Image from './image.js';
import Header from './header.js';
import Footer from './footer.js';

export default function Post({ content }){
  const commentInput = useRef(null);
  const handleFocus = () => commentInput.current.focus();
  
  return(
    <div className="bg-white border rounded col-span-4 mb-16">
        <Header username={content.username} />
        <Image src={content.imageSrc} caption={content.caption} />
        <Actions 
            docId={content.docId}
            totalLikes={content.likes.length}
            likedPhoto={content.userLikedPhoto}
            handleFocus={handleFocus}
        />
        <Footer username={content.username} caption={content.caption} />
        <Comments
            docId={content.docId}
            comments={content.comments}
            posted={content.dateCreated}
            commentInput={commentInput}
        />
    </div>
  );
}
