// /.netlify/functions/favorites
let firebase = require('./firebase')

//copied from Kelloggram. Still need to update
exports.handler = async function(event) {
  let db = firebase.firestore()
  let body = JSON.parse(event.body)
  let dishId = body.dishId
  let userId = body.userId
  
  console.log(`review: ${dishId}`)
  console.log(`user: ${userId}`)

  //await db.collection('favorites').doc(`${dishID}-${user.uid}`).set({})

  // let querySnapshot = await db.collection('favorites')
  //                             .where('dishId', '==', dishId)
  //                             .where('userId', '==', userId)
  //                             .get()

                            
//   let numberOfLikes = querySnapshot.size

  //if (numberOfLikes == 0) {
    await db.collection('favorites').doc(`${dishID}-${userID}`).add({
      dishId: dishId,
      userId: userId
    })
    return { statusCode: 200 }
  } 
  //else {
    //return { statusCode: 403 }
 // }

//}