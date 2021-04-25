import React from 'react';
import Skeleton from 'react-loading-skeleton';
import Post from './post';
import useFollowedUsersPhotos from '../hooks/use-followed-users-photos.js';

// References
//   - https://www.npmjs.com/package/react-loading-skeleton

export default function Timeline(){
    const { photos } = useFollowedUsersPhotos();
    
    return(
        <div className="container col-span-2">
            {!photos ? (
                <Skeleton count={4} width={640} height={500} className="mb-5" />
             ) : (
                 photos.map((content) => <Post key={content.docId} username={content.username} /> )
             )};
        </div>
    )
}
