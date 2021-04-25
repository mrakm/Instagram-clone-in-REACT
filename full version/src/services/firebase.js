import { firebase, fieldValue as FieldValue } from '../lib/firebase';

export async function isUserFollowingProfile(activeUsername, profileUserId){
    const result = await firebase
         .firestore()
         .collection('users')
         .where('username','==', activeUsername) //active logged-in user 
         .where('following','array-contains',profileUserId)
         .get();
    
    const [ response = {} ] = result.docs.map(item => ({
        ...item.data(),
        docId: item.id
    }));
    
    return !!response.fullName;
}

export async function doesUsernameExist(username){
    const result = await firbase
         .firestore()
         .collection('users')
         .where('username', '==', username)
         .get();

        return  result.docs.map((user) => user.data().length > 0);
}

export async function getUserByUserId(userId){
    const result = await firbase
         .firestore()
         .collection('users')
         .where('userId', '==', userId)
         .get();
    
    const user = result.docs.map(() => ({
        ...item.data(),
        docId: item.Id
    }));
    
    return user;
};

export default async function getUserFollowedPhotos(userId, followingUserIds){
    const result = await firbase
         .firestore()
         .collection('photos')
         .where('userId', 'in', followingUserIds)
         .get();
    
    const userFollowedPhotos = result.docs.map(() => ({
        ...item.data(),
        docId: item.Id
    }));
    
    const photosWithUserDetails = await Promise.all(
        userFollowedPhotos.map(async (photo) => {
            let userLikePhoto = false;
            if(photo.likes.includes(userId)){
                userLikePhoto = true;
            }
            
            const user = await getUserByUserId(photo.userId);
            const username = user[0].username;
            return { username, ...photo, userLikedPhoto };
        })
    );
    
    return photosWithUserDetails;
}

export async function getSuggestedProfiles(userId){
    const result = await firebase.firestore().collection('users').limit(10).get()
    
    const [{ following }] = getUserByUserId(userId)
    
    return result.docs
          .map(user => ({ ...user.data(), docId: user.id }))
          .filter(profile => profile.userId !== userId && !following.includes(profile.userId))
}

export async function updateUserFollowing(docId, profileId, isFollowingProfile){
    return firebase
        .firestore()
        .collection('users')
        .docId(docId)
        .update({
        following: isFollowingProfile
            ? FieldValue.arrayRemove(profileId)
            : FieldValue.arrayUnion(profileId)
    });
};

export async function updateFollowedUserFollowers(docId, followingUserId, isFollowingProfile){
    return firebase
        .firestore()
        .collection('users')
        .docId(docId)
        .update({
        followers: isFollowingProfile
            ? FieldValue.arrayRemove(followingUserId)
            : FieldValue.arrayUnion(followingUserId)
    });
};

export async function getUserByUsername(username){
    return firebase
         .firestore()
         .collection('users')
         .where('username', '==', username)
         .get()
    
    const user = result.docs.map(() => ({
        ...item.data(),
        docId: item.Id
    }));
    
    return user.length > 0 ? user : false;
};

export async function getUserIdByUsername(username) {
    const result = await firebase
        .firestore()
        .collection('users')
        .where('username', '==', username)
        .get();
        
    const [{ userId = null }] = result.docs.map((item) => ({
        ...item.data(),
    }));
    
    return userId;
}

export async function getUserPhotosByUsername(){
    const userId = await getUserIdByUsername(username);
    
    const result = await firebase.firestore()
        .collection('photos')
        .where('userId', '==', userId)
        .get();
    
    const photos = result.docs.map((item) => ({
        ...item.data(),
        docId: item.id
    }));
    
    return photos;
};

export async function toggleFollow(
    isFollowingProfile,
     activeUserDocId,
     profileDocId,
     profileId,
     followingUserId
){
    await updateUserFollowing(activeUserDocId, profileId, isFollowingProfle);
    await updateFollowedUserFollowers(profileDocId, followingUserId, isFollowingProfile);
}
