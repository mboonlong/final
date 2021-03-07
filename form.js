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
      let dishName = document.querySelector('#dish-name').value
      let imageUrl = document.querySelector('#image-url').value
      let review = document.querySelector('#review').value
    
    let docRef = await db.collection('reviews').add({
      Restaurant: restaurantName,
      Dish: dishName,
      Image: imageUrl,
      Review: review
      // , City: dishCity
      })

  })
    
})