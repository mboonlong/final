// /.netlify/functions/favorites
let firebase = require('./firebase')

//copied from Kelloggram. Still need to update
exports.handler = async function(event) {
  let db = firebase.firestore()
  let body = JSON.parse(event.body)
  let reviewId = body.reviewId
  let userId = body.userId
  
  console.log(`post: ${postId}`)
  console.log(`user: ${userId}`)

  let querySnapshot = await db.collection('favorites')
                              .where('reviewId', '==', reviewId)
                              .where('userId', '==', userId)
                              .get()
//   let numberOfLikes = querySnapshot.size

  if (numberOfLikes == 0) {
    await db.collection('likes').add({
      postId: postId,
      userId: userId
    })
    return { statusCode: 200 }
  } else {
    return { statusCode: 403 }
  }

}