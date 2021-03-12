document.addEventListener('DOMContentLoaded', async function(event) {
  event.preventDefault()

  let db = firebase.firestore()


  // Make the submission form
  document.querySelector('form').addEventListener('submit', async function(event) {
    event.preventDefault()

      let restaurantName = document.querySelector('#restaurant-name').value
      let city = document.querySelector('#city').value
      let dishName = document.querySelector('#dish-name').value
      let imageUrl = document.querySelector('#image-url').value
      let review = document.querySelector('#review').value
      let rating = document.querySelector('#rating').value
    
   await db.collection('reviews').add({
      Restaurant: restaurantName,
      City: city,
      Dish: dishName,
      Image: imageUrl,
      Rating: rating,
      Review: review
      }) 
    
    document.querySelector('#restaurant-name').value = '' 
    document.querySelector('#city').value = '' 
    document.querySelector('#dish-name').value = '' 
    document.querySelector('#image-url').value = '' 
    document.querySelector('#review').value = '' 
    document.querySelector('#rating').value = '' 

    window.alert('Your review has been submitted. Thank you!')


  })
    
})