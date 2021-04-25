import React, { useState, useEffect, useContext } from 'react';
import getUserFollowedPhotos, { getUserByUserId } from '../services/firebase';
import UserContext from '../context/user';

export default function useFollowedUsersPhotos(){
  const { user: {uid: userId = ""} } = useContext(UserContext);
  const [photos, setPhotos] = useState(null);
  
  useEffect(() => {
    async function getTimelinePhotos(){
      //get the followingUserIds (getUserByUserId)
      const followingUserIds = await getUserByUserId(userId);
      // assign a let variable to followedUserPhotos = []
      let followedUserPhotos = [];
      
      if(followingUserIds && followingUserIds[0].following.length > 0){
        //call a function that will get us the photos
        //re-arrange the array so that we have the newest photos first! (use the property .dateCreated)
        const followedUserPhotos = await getUserFollowedPhotos(userId, followingUserIds[0].following);
        
        followedUserPhotos.sort((a,b) => b.dateCreated - a.dateCreated);
        setPhotos(followedUserPhotos);
      };
    };
    
    getTimelinePhotos();
  }, [userId]);
  
  return { photos };
};
