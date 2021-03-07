document.addEventListener('DOMContentLoaded', async function(event) {
  event.preventDefault()

  let db = firebase.firestore()


  // Make the submission form
  document.querySelector('form').addEventListener('submit', async function(event) {
    event.preventDefault()

    // document.querySelector('#dropdown-city-content-1').addEventListener('click', async function(event) {
    //   event.preventDefault()
    //   let dishCity=document.querySelector('#dropdown-city-content-1').value
    //   console.log(dishCity)
    // })
  
    // document.querySelector('#dropdown-city-content-2').addEventListener('click', async function(event) {
    //   event.preventDefault()
    //   let dishCity=document.querySelector('#dropdown-city-content-2').value
    //   console.log(dishCity)
    // })
  
    // document.querySelector('#dropdown-city-content-3').addEventListener('click', async function(event) {
    //   event.preventDefault()
    //   let dishCity=document.querySelector('#dropdown-city-content-3').value
    //   console.log(dishCity)
    // })
  
    // document.querySelector('#dropdown-city-content-4').addEventListener('click', async function(event) {
    //   event.preventDefault()
    //   let dishCity=document.querySelector('#dropdown-city-content-4').value
    //   console.log(dishCity)
    // })
  
    // document.querySelector('#dropdown-city-content-5').addEventListener('click', async function(event) {
    //   event.preventDefault()
    //   let dishCity=document.querySelector('#dropdown-city-content-5').value
    //   console.log(dishCity)
    // })
  
    // document.querySelector('#dropdown-city-content-6').addEventListener('click', async function(event) {
    //   event.preventDefault()
    //   let dishCity=document.querySelector('#dropdown-city-content-6').value
    //   console.log(dishCity)
    // })

      let restaurantName = document.querySelector('#restaurant-name').value
      let city = document.querySelector('#city').value
      let dishName = document.querySelector('#dish-name').value
      let imageUrl = document.querySelector('#image-url').value
      let review = document.querySelector('#review').value
      let rating = document.querySelector('#rating').value
    
    let docRef = await db.collection('reviews').add({
      Restaurant: restaurantName,
      City: city,
      Dish: dishName,
      Image: imageUrl,
      Rating: rating,
      Review: review
      // , City: dishCity
      })

    let reviewId = docRef.id 
    
    document.querySelector('#restaurant-name').value = '' 
    document.querySelector('#city').value = '' 
    document.querySelector('#dish-name').value = '' 
    document.querySelector('#image-url').value = '' 
    document.querySelector('#review').value = '' 
    document.querySelector('#rating').value = '' 

  })
    
})