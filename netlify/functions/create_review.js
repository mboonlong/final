// /.netlify/functions/create_review
let firebase = require('./firebase')

exports.handler = async function(event) {
  let db = firebase.firestore()
  let body = JSON.parse(event.body)
  let restaurantName = body.Restaurant
  let city = body.City
  let dishName = body.Dish
  let imageUrl = body.Image
  let rating = body.Rating
  let review = body.Review

  let newReview = { 
    Restaurant: restaurantName,
    City: city,
    Dish: dishName,
    Image: imageUrl,
    Rating: rating,
    Review: review,
    created: firebase.firestore.FieldValue.serverTimestamp()
  }

  let docRef = await db.collection('reviews').add(newReview)
  newReview.id = docRef.id

  return {
    statusCode: 200,
    body: JSON.stringify(newReview)
  }

}