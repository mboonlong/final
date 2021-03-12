firebase.auth().onAuthStateChanged(async function(user) {
  if (user) {

    // Signed in
    console.log('signed in')
    let db = firebase.firestore()
    

    //Create Firebase collection for users
    db.collection('users').doc(user.uid).set({
        name: user.displayName,
        email: user.email
      })

      
//Sign in formatting
document.querySelector('.sign-in-or-sign-out').insertAdjacentHTML('beforeend', `
<h1 class= font-bold> Signed in as ${user.displayName}</h1>
<button class="underline sign-out">Sign Out</button>`)

document.querySelector('.sign-out').addEventListener('click', function(event) {
firebase.auth().signOut()
document.location.href = 'index.html'
})


//Submission link formatting
document.querySelector('.submissionlink').insertAdjacentHTML('beforeend',`
<a href='form.html'>Submit New Review</a>
`)


//Favorite button formatting
document.querySelector('.favoriteButton').insertAdjacentHTML('beforeend',`
<a href="#" class="favorite-button block text-center w-40 text-white bg-yellow-500 mt-2 px-4 py-2 w-40 rounded">View Favorites</a>
`)

//Populate with reviews and add favorite button functionality
document.querySelector('.favorite-button').addEventListener('click', async function(event) {
  event.preventDefault()
  let reviewsDiv = document.querySelector('.reviews')
  reviewsDiv.innerHTML = ''

  let querySnapshot = await db.collection('reviews').get()
   
let dishList = querySnapshot.docs
    for (let i=0; i<dishList.length; i++) {
      let dishData = dishList[i].data()
      let imageUrl = dishData.Image
      let restaurantName = dishData.Restaurant
      let dishName = dishData.Dish
      let review = dishData.Review
      let city = dishData.City
      let rating = dishData.Rating 
      let dishID = dishList[i].id
      let docRef = await db.collection('favorites').doc(`${dishID}-${user.uid}`).get()
      let favoriteDish = docRef.data()
      if (favoriteDish) {
        reviewsDiv.insertAdjacentHTML('beforeend',`
        <div class="review-${dishID} md:flex flex-row border border-black w-full mt-4 items-center">
        <div><img src = "${imageUrl}" class="m-6 w-60"></img>
        <a href="#" class="favorite-button block text-center text-white bg-yellow-600 m-6 px-4 py-2 w-60 rounded opacity-20">Add to Favorites</a>
        </div>
        <ul class = "ml-16">
        <li>Restaurant: ${restaurantName}</li>
        <li>City: ${city}</li>
        <li>Dish: ${dishName}</li>
        <li>Rating: ${rating} Stars </li>
        <li>Comments: ${review} </li>
        </ul><p> 
        </div>
    `)
      }
    }
})

let querySnapshot = await db.collection('reviews').get()
   
let dishList = querySnapshot.docs
    for (let i=0; i<dishList.length; i++) {
      let dishData = dishList[i].data()
      let imageUrl = dishData.Image
      let restaurantName = dishData.Restaurant
      let dishName = dishData.Dish
      let review = dishData.Review
      let city = dishData.City
      let rating = dishData.Rating 
      let dishID = dishList[i].id
      let docRef = await db.collection('favorites').doc(`${dishID}-${user.uid}`).get()
      let favoriteDish = docRef.data()
      let opacityClass = ''
      if (favoriteDish) {
        opacityClass = 'opacity-20'
      }
  
  
  document.querySelector('.reviews').insertAdjacentHTML('beforeend',`
  
  <div class="review-${dishID} md:flex flex-row border border-black w-full mt-4 items-center">
  <div><img src = "${imageUrl}" class="m-6 w-60"></img>
    <a href="#" class="favorite-button block text-center text-white bg-yellow-600 m-6 px-4 py-2 w-60 rounded ${opacityClass}">Add to Favorites</a>
  </div>
  <ul class = "ml-16">
  <li>Restaurant: ${restaurantName}</li>
  <li>City: ${city}</li>
  <li>Dish: ${dishName}</li>
  <li>Rating: ${rating} Stars </li>
  <li>Comments: ${review} </li>
  </ul><p> 
  </div>
  
  `)
  
  let clickedFavorite = document.querySelector(`.review-${dishID} .favorite-button`)
  clickedFavorite.addEventListener('click', async function(event) {
    event.preventDefault()
    let clicked = document.querySelector(`.review-${dishID} .favorite-button`)
    clicked.classList.add('opacity-20')

    await db.collection('favorites').doc(`${dishID}-${user.uid}`).set({})

  })
    }


//All button
let allButton = document.querySelector('#all-button')
allButton.addEventListener('click', async function(event){
  event.preventDefault()
  let reviewsDiv = document.querySelector('.reviews')
  reviewsDiv.innerHTML = ''

  let dishList = querySnapshot.docs
    for (let i=0; i<dishList.length; i++) {
      let dishData = dishList[i].data()
      let imageUrl = dishData.Image
      let restaurantName = dishData.Restaurant
      let dishName = dishData.Dish
      let review = dishData.Review
      let city = dishData.City
      let rating = dishData.Rating 
      let dishID = dishList[i].id
      let docRef = await db.collection('favorites').doc(`${dishID}-${user.uid}`).get()
      let favoriteDish = docRef.data()
      let opacityClass = ''
      if (favoriteDish) {
        opacityClass = 'opacity-20'
      }
      
      reviewsDiv.insertAdjacentHTML('beforeend',`
      <div class="review-${dishID} md:flex flex-row border border-black w-full mt-4 items-center">
      <div><img src = "${imageUrl}" class="m-6 w-60"></img>
      <a href="#" class="favorite-button block text-center text-white bg-yellow-600 m-6 px-4 py-2 w-60 rounded ${opacityClass}">Add to Favorites</a>
      </div>
      <ul class = "ml-16">
      <li>Restaurant: ${restaurantName}</li>
      <li>City: ${city}</li>
      <li>Dish: ${dishName}</li>
      <li>Rating: ${rating} Stars </li>
      <li>Comments: ${review} </li>
      </ul><p> 
      </div>
  `)

  let clickedFavorite = document.querySelector(`.review-${dishID} .favorite-button`)
  clickedFavorite.addEventListener('click', async function(event) {
    event.preventDefault()
    let clicked = document.querySelector(`.review-${dishID} .favorite-button`)
    clicked.classList.add('opacity-20')

    await db.collection('favorites').doc(`${dishID}-${user.uid}`).set({})
  })
    }
})


//Chicago filter
let chicagoButton = document.querySelector('#chicago-button')
chicagoButton.addEventListener('click', async function(event){
  event.preventDefault()
  let reviewsDiv = document.querySelector('.reviews')
  reviewsDiv.innerHTML = ''

  let querySnapshot = await db.collection('reviews').get()

  let dishList = querySnapshot.docs
    for (let i=0; i<dishList.length; i++) {
      let dishData = dishList[i].data()
      let imageUrl = dishData.Image
      let restaurantName = dishData.Restaurant
      let dishName = dishData.Dish
      let review = dishData.Review
      let city = dishData.City
      let rating = dishData.Rating 
      let dishID = dishList[i].id
      let docRef = await db.collection('favorites').doc(`${dishID}-${user.uid}`).get()
      let favoriteDish = docRef.data()
      let opacityClass = ''
      if (favoriteDish) {
        opacityClass = 'opacity-20'
      }

      if (city == 'Chicago'){
        reviewsDiv.insertAdjacentHTML('beforeend',`
        <div class="review-${dishID} md:flex flex-row border border-black w-full mt-4 items-center">
        <div><img src = "${imageUrl}" class="m-6 w-60"></img>
        <a href="#" class="favorite-button block text-center text-white bg-yellow-600 m-6 px-4 py-2 w-60 rounded ${opacityClass}">Add to Favorites</a>
        </div>
        <ul class = "ml-16">
        <li>Restaurant: ${restaurantName}</li>
        <li>City: ${city}</li>
        <li>Dish: ${dishName}</li>
        <li>Rating: ${rating} Stars </li>
        <li>Comments: ${review} </li>
        </ul><p> 
        </div>
    `)

    let clickedFavorite = document.querySelector(`.review-${dishID} .favorite-button`)
    clickedFavorite.addEventListener('click', async function(event) {
      event.preventDefault()
      let clicked = document.querySelector(`.review-${dishID} .favorite-button`)
      clicked.classList.add('opacity-20')
  
      await db.collection('favorites').doc(`${dishID}-${user.uid}`).set({})
    })
    }
    }
})

//LA filter
let losAngelesButton = document.querySelector('#los-angeles-button')
losAngelesButton.addEventListener('click', async function(event){
  event.preventDefault()
  let reviewsDiv = document.querySelector('.reviews')
  reviewsDiv.innerHTML = ''

  let querySnapshot = await db.collection('reviews').get()

  let dishList = querySnapshot.docs
    for (let i=0; i<dishList.length; i++) {
      let dishData = dishList[i].data()
      let imageUrl = dishData.Image
      let restaurantName = dishData.Restaurant
      let dishName = dishData.Dish
      let review = dishData.Review
      let city = dishData.City
      let rating = dishData.Rating 
      let dishID = dishList[i].id
      let docRef = await db.collection('favorites').doc(`${dishID}-${user.uid}`).get()
      let favoriteDish = docRef.data()
      let opacityClass = ''
      if (favoriteDish) {
        opacityClass = 'opacity-20'
      }

      if (city == 'Los Angeles'){
        reviewsDiv.insertAdjacentHTML('beforeend',`
        <div class="review-${dishID} md:flex flex-row border border-black w-full mt-4 items-center">
        <div><img src = "${imageUrl}" class="m-6 w-60"></img>
        <a href="#" class="favorite-button block text-center text-white bg-yellow-600 m-6 px-4 py-2 w-60 rounded ${opacityClass}">Add to Favorites</a>
        </div>
        <ul class = "ml-16">
        <li>Restaurant: ${restaurantName}</li>
        <li>City: ${city}</li>
        <li>Dish: ${dishName}</li>
        <li>Rating: ${rating} Stars </li>
        <li>Comments: ${review} </li>
        </ul><p> 
        </div>
    `)

    let clickedFavorite = document.querySelector(`.review-${dishID} .favorite-button`)
    clickedFavorite.addEventListener('click', async function(event) {
      event.preventDefault()
      let clicked = document.querySelector(`.review-${dishID} .favorite-button`)
      clicked.classList.add('opacity-20')
  
      await db.collection('favorites').doc(`${dishID}-${user.uid}`).set({})
    })
    }
    }
})

//New York filter
let newYorkButton = document.querySelector('#new-york-button')
newYorkButton.addEventListener('click', async function(event){
  event.preventDefault()
  let reviewsDiv = document.querySelector('.reviews')
  reviewsDiv.innerHTML = ''

  let querySnapshot = await db.collection('reviews').get()

  let dishList = querySnapshot.docs
    for (let i=0; i<dishList.length; i++) {
      let dishData = dishList[i].data()
      let imageUrl = dishData.Image
      let restaurantName = dishData.Restaurant
      let dishName = dishData.Dish
      let review = dishData.Review
      let city = dishData.City
      let rating = dishData.Rating 
      let dishID = dishList[i].id
      let docRef = await db.collection('favorites').doc(`${dishID}-${user.uid}`).get()
      let favoriteDish = docRef.data()
      let opacityClass = ''
      if (favoriteDish) {
        opacityClass = 'opacity-20'
      }

      if (city == 'New York'){
        reviewsDiv.insertAdjacentHTML('beforeend',`
        <div class="review-${dishID} md:flex flex-row border border-black w-full mt-4 items-center">
        <div><img src = "${imageUrl}" class="m-6 w-60"></img>
        <a href="#" class="favorite-button block text-center text-white bg-yellow-600 m-6 px-4 py-2 w-60 rounded ${opacityClass}">Add to Favorites</a>
        </div>
        <ul class = "ml-16">
        <li>Restaurant: ${restaurantName}</li>
        <li>City: ${city}</li>
        <li>Dish: ${dishName}</li>
        <li>Rating: ${rating} Stars </li>
        <li>Comments: ${review} </li>
        </ul><p> 
        </div>
    `)

    let clickedFavorite = document.querySelector(`.review-${dishID} .favorite-button`)
    clickedFavorite.addEventListener('click', async function(event) {
      event.preventDefault()
      let clicked = document.querySelector(`.review-${dishID} .favorite-button`)
      clicked.classList.add('opacity-20')
  
      await db.collection('favorites').doc(`${dishID}-${user.uid}`).set({})
    })
    }
    }
})

//Boston filter
let bostonButton = document.querySelector('#boston-button')
bostonButton.addEventListener('click', async function(event){
  event.preventDefault()
  let reviewsDiv = document.querySelector('.reviews')
  reviewsDiv.innerHTML = ''

  let querySnapshot = await db.collection('reviews').get()

  let dishList = querySnapshot.docs
    for (let i=0; i<dishList.length; i++) {
      let dishData = dishList[i].data()
      let imageUrl = dishData.Image
      let restaurantName = dishData.Restaurant
      let dishName = dishData.Dish
      let review = dishData.Review
      let city = dishData.City
      let rating = dishData.Rating 
      let dishID = dishList[i].id
      let docRef = await db.collection('favorites').doc(`${dishID}-${user.uid}`).get()
      let favoriteDish = docRef.data()
      let opacityClass = ''
      if (favoriteDish) {
        opacityClass = 'opacity-20'
      }

      if (city == 'Boston'){
        reviewsDiv.insertAdjacentHTML('beforeend',`
        <div class="review-${dishID} md:flex flex-row border border-black w-full mt-4 items-center">
        <div><img src = "${imageUrl}" class="m-6 w-60"></img>
        <a href="#" class="favorite-button block text-center text-white bg-yellow-600 m-6 px-4 py-2 w-60 rounded ${opacityClass}">Add to Favorites</a>
        </div>
        <ul class = "ml-16">
        <li>Restaurant: ${restaurantName}</li>
        <li>City: ${city}</li>
        <li>Dish: ${dishName}</li>
        <li>Rating: ${rating} Stars </li>
        <li>Comments: ${review} </li>
        </ul><p> 
        </div>
    `)

    let clickedFavorite = document.querySelector(`.review-${dishID} .favorite-button`)
    clickedFavorite.addEventListener('click', async function(event) {
      event.preventDefault()
      let clicked = document.querySelector(`.review-${dishID} .favorite-button`)
      clicked.classList.add('opacity-20')
  
      await db.collection('favorites').doc(`${dishID}-${user.uid}`).set({})
    })
    }
    }
})

//Miami filter
let miamiButton = document.querySelector('#miami-button')
miamiButton.addEventListener('click', async function(event){
  event.preventDefault()
  let reviewsDiv = document.querySelector('.reviews')
  reviewsDiv.innerHTML = ''

  let querySnapshot = await db.collection('reviews').get()

  let dishList = querySnapshot.docs
    for (let i=0; i<dishList.length; i++) {
      let dishData = dishList[i].data()
      let imageUrl = dishData.Image
      let restaurantName = dishData.Restaurant
      let dishName = dishData.Dish
      let review = dishData.Review
      let city = dishData.City
      let rating = dishData.Rating 
      let dishID = dishList[i].id
      let docRef = await db.collection('favorites').doc(`${dishID}-${user.uid}`).get()
      let favoriteDish = docRef.data()
      let opacityClass = ''
      if (favoriteDish) {
        opacityClass = 'opacity-20'
      }

      if (city == 'Miami'){
        reviewsDiv.insertAdjacentHTML('beforeend',`
        <div class="review-${dishID} md:flex flex-row border border-black w-full mt-4 items-center">
        <div><img src = "${imageUrl}" class="m-6 w-60"></img>
        <a href="#" class="favorite-button block text-center text-white bg-yellow-600 m-6 px-4 py-2 w-60 rounded ${opacityClass}">Add to Favorites</a>
        </div>
        <ul class = "ml-16">
        <li>Restaurant: ${restaurantName}</li>
        <li>City: ${city}</li>
        <li>Dish: ${dishName}</li>
        <li>Rating: ${rating} Stars </li>
        <li>Comments: ${review} </li>
        </ul><p> 
        </div>
    `)

    let clickedFavorite = document.querySelector(`.review-${dishID} .favorite-button`)
    clickedFavorite.addEventListener('click', async function(event) {
      event.preventDefault()
      let clicked = document.querySelector(`.review-${dishID} .favorite-button`)
      clicked.classList.add('opacity-20')
  
      await db.collection('favorites').doc(`${dishID}-${user.uid}`).set({})
    })
    }
    }
})

//Philadelphia filter
let philadelphiaButton = document.querySelector('#philadelphia-button')
philadelphiaButton.addEventListener('click', async function(event){
  event.preventDefault()
  let reviewsDiv = document.querySelector('.reviews')
  reviewsDiv.innerHTML = ''

  let querySnapshot = await db.collection('reviews').get()

  let dishList = querySnapshot.docs
    for (let i=0; i<dishList.length; i++) {
      let dishData = dishList[i].data()
      let imageUrl = dishData.Image
      let restaurantName = dishData.Restaurant
      let dishName = dishData.Dish
      let review = dishData.Review
      let city = dishData.City
      let rating = dishData.Rating 
      let dishID = dishList[i].id
      let docRef = await db.collection('favorites').doc(`${dishID}-${user.uid}`).get()
      let favoriteDish = docRef.data()
      let opacityClass = ''
      if (favoriteDish) {
        opacityClass = 'opacity-20'
      }

      if (city == 'Philadelphia'){
        reviewsDiv.insertAdjacentHTML('beforeend',`
        <div class="review-${dishID} md:flex flex-row border border-black w-full mt-4 items-center">
        <div><img src = "${imageUrl}" class="m-6 w-60"></img>
        <a href="#" class="favorite-button block text-center text-white bg-yellow-600 m-6 px-4 py-2 w-60 rounded ${opacityClass}">Add to Favorites</a>
        </div>
        <ul class = "ml-16">
        <li>Restaurant: ${restaurantName}</li>
        <li>City: ${city}</li>
        <li>Dish: ${dishName}</li>
        <li>Rating: ${rating} Stars </li>
        <li>Comments: ${review} </li>
        </ul><p> 
        </div>
    `)

    let clickedFavorite = document.querySelector(`.review-${dishID} .favorite-button`)
    clickedFavorite.addEventListener('click', async function(event) {
      event.preventDefault()
      let clicked = document.querySelector(`.review-${dishID} .favorite-button`)
      clicked.classList.add('opacity-20')
  
      await db.collection('favorites').doc(`${dishID}-${user.uid}`).set({})
    })
    }
    }
})


  } else {
    // Signed out
    console.log('signed out')

    // Initializes FirebaseUI Auth
    let ui = new firebaseui.auth.AuthUI(firebase.auth())

    // FirebaseUI configuration
    let authUIConfig = {
      signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ],
      signInSuccessUrl: 'index.html'
    }

    // Starts FirebaseUI Auth
    ui.start('.sign-in-or-sign-out', authUIConfig)

    let db = firebase.firestore()

    let querySnapshot = await db.collection('reviews').get()
  
    let dishList = querySnapshot.docs
    for (let i=0; i<dishList.length; i++) {
      let dishData = dishList[i].data()
      let imageUrl = dishData.Image
      let restaurantName = dishData.Restaurant
      let dishName = dishData.Dish
      let review = dishData.Review
      let city = dishData.City
      let rating = dishData.Rating 
      let dishID = dishData.id
  
      document.querySelector('.reviews').insertAdjacentHTML('beforeend',`
      <div class="review-${dishID} md:flex flex-row border border-black w-full mt-4 items-center">
      <div><img src = "${imageUrl}" class="m-6 w-60"></img>
      </div>
      
      <ul class = "ml-16">
      <li>Restaurant: ${restaurantName}</li>
      <li>City: ${city}</li>
      <li>Dish: ${dishName}</li>
      <li>Rating: ${rating} Stars </li>
      <li>Comments: ${review} </li>
      </ul><p> 
      </div>
    
      `)
}


//All button
let allButton = document.querySelector('#all-button')
allButton.addEventListener('click', async function(event){
  event.preventDefault()
  let reviewsDiv = document.querySelector('.reviews')
  reviewsDiv.innerHTML = ''

  let dishList = querySnapshot.docs
    for (let i=0; i<dishList.length; i++) {
      let dishData = dishList[i].data()
      let imageUrl = dishData.Image
      let restaurantName = dishData.Restaurant
      let dishName = dishData.Dish
      let review = dishData.Review
      let city = dishData.City
      let rating = dishData.Rating 
      reviewsDiv.insertAdjacentHTML('beforeend',`
      <div class="review md:flex flex-row border border-black w-full mt-4 items-center">
      <div><img src = "${imageUrl}" class="m-6 w-60"></img>
      </div>
      <ul class = "ml-16">
      <li>Restaurant: ${restaurantName}</li>
      <li>City: ${city}</li>
      <li>Dish: ${dishName}</li>
      <li>Rating: ${rating} Stars </li>
      <li>Comments: ${review} </li>
      </ul><p>
      </div>
      `)
    }
})


//Chicago filter
let chicagoButton = document.querySelector('#chicago-button')
chicagoButton.addEventListener('click', async function(event){
  event.preventDefault()
  let reviewsDiv = document.querySelector('.reviews')
  reviewsDiv.innerHTML = ''

  let querySnapshot = await db.collection('reviews').get()

  let dishList = querySnapshot.docs
    for (let i=0; i<dishList.length; i++) {
      let dishData = dishList[i].data()
      let imageUrl = dishData.Image
      let restaurantName = dishData.Restaurant
      let dishName = dishData.Dish
      let review = dishData.Review
      let city = dishData.City
      let rating = dishData.Rating 
      if (city == 'Chicago'){
      reviewsDiv.insertAdjacentHTML('beforeend',`<div class="review md:flex flex-row border border-black w-full mt-4 items-center">
      <div><img src = "${imageUrl}" class="m-6 w-60"></img></div>
      <ul class = "ml-16">
      <li>Restaurant: ${restaurantName}</li>
      <li>City: ${city}</li>
      <li>Dish: ${dishName}</li>
      <li>Rating: ${rating} Stars </li>
      <li>Comments: ${review} </li>
      </ul><p> 
      </div>
      `)
    }
    }
})

//LA filter
let losAngelesButton = document.querySelector('#los-angeles-button')
losAngelesButton.addEventListener('click', async function(event){
  event.preventDefault()
  let reviewsDiv = document.querySelector('.reviews')
  reviewsDiv.innerHTML = ''

  let querySnapshot = await db.collection('reviews').get()

  let dishList = querySnapshot.docs
    for (let i=0; i<dishList.length; i++) {
      let dishData = dishList[i].data()
      let imageUrl = dishData.Image
      let restaurantName = dishData.Restaurant
      let dishName = dishData.Dish
      let review = dishData.Review
      let city = dishData.City
      let rating = dishData.Rating 
      if (city == 'Los Angeles'){
      reviewsDiv.insertAdjacentHTML('beforeend',`<div class="review md:flex flex-row border border-black w-full mt-4 items-center">
      <div><img src = "${imageUrl}" class="m-6 w-60"></img></div>
      <ul class = "ml-16">
      <li>Restaurant: ${restaurantName}</li>
      <li>City: ${city}</li>
      <li>Dish: ${dishName}</li>
      <li>Rating: ${rating} Stars </li>
      <li>Comments: ${review} </li>
      </ul><p> 
      </div>
      `)
    }
    }
})

//New York filter
let newYorkButton = document.querySelector('#new-york-button')
newYorkButton.addEventListener('click', async function(event){
  event.preventDefault()
  let reviewsDiv = document.querySelector('.reviews')
  reviewsDiv.innerHTML = ''

  let querySnapshot = await db.collection('reviews').get()

  let dishList = querySnapshot.docs
    for (let i=0; i<dishList.length; i++) {
      let dishData = dishList[i].data()
      let imageUrl = dishData.Image
      let restaurantName = dishData.Restaurant
      let dishName = dishData.Dish
      let review = dishData.Review
      let city = dishData.City
      let rating = dishData.Rating 
      if (city == 'New York'){
      reviewsDiv.insertAdjacentHTML('beforeend',`<div class="review md:flex flex-row border border-black w-full mt-4 items-center">
      <div><img src = "${imageUrl}" class="m-6 w-60"></img></div>
      <ul class = "ml-16">
      <li>Restaurant: ${restaurantName}</li>
      <li>City: ${city}</li>
      <li>Dish: ${dishName}</li>
      <li>Rating: ${rating} Stars </li>
      <li>Comments: ${review} </li>
      </ul><p> 
      </div>
      `)
    }
    }
})

//Boston filter
let bostonButton = document.querySelector('#boston-button')
bostonButton.addEventListener('click', async function(event){
  event.preventDefault()
  let reviewsDiv = document.querySelector('.reviews')
  reviewsDiv.innerHTML = ''

  let querySnapshot = await db.collection('reviews').get()

  let dishList = querySnapshot.docs
    for (let i=0; i<dishList.length; i++) {
      let dishData = dishList[i].data()
      let imageUrl = dishData.Image
      let restaurantName = dishData.Restaurant
      let dishName = dishData.Dish
      let review = dishData.Review
      let city = dishData.City
      let rating = dishData.Rating 
      if (city == 'Boston'){
      reviewsDiv.insertAdjacentHTML('beforeend',`<div class="review md:flex flex-row border border-black w-full mt-4 items-center">
      <div><img src = "${imageUrl}" class="m-6 w-60"></img></div>
      <ul class = "ml-16">
      <li>Restaurant: ${restaurantName}</li>
      <li>City: ${city}</li>
      <li>Dish: ${dishName}</li>
      <li>Rating: ${rating} Stars </li>
      <li>Comments: ${review} </li>
      </ul><p> 
      </div>
      `)
    }
    }
})

//Miami filter
let miamiButton = document.querySelector('#miami-button')
miamiButton.addEventListener('click', async function(event){
  event.preventDefault()
  let reviewsDiv = document.querySelector('.reviews')
  reviewsDiv.innerHTML = ''

  let querySnapshot = await db.collection('reviews').get()

  let dishList = querySnapshot.docs
    for (let i=0; i<dishList.length; i++) {
      let dishData = dishList[i].data()
      let imageUrl = dishData.Image
      let restaurantName = dishData.Restaurant
      let dishName = dishData.Dish
      let review = dishData.Review
      let city = dishData.City
      let rating = dishData.Rating 
      if (city == 'Miami'){
      reviewsDiv.insertAdjacentHTML('beforeend',`<div class="review md:flex flex-row border border-black w-full mt-4 items-center">
      <div><img src = "${imageUrl}" class="m-6 w-60"></img></div>
      <ul class = "ml-16">
      <li>Restaurant: ${restaurantName}</li>
      <li>City: ${city}</li>
      <li>Dish: ${dishName}</li>
      <li>Rating: ${rating} Stars </li>
      <li>Comments: ${review} </li>
      </ul><p> 
      </div>
      `)
    }
    }
})

//Philadelphia filter
let philadelphiaButton = document.querySelector('#philadelphia-button')
philadelphiaButton.addEventListener('click', async function(event){
  event.preventDefault()
  let reviewsDiv = document.querySelector('.reviews')
  reviewsDiv.innerHTML = ''

  let querySnapshot = await db.collection('reviews').get()

  let dishList = querySnapshot.docs
    for (let i=0; i<dishList.length; i++) {
      let dishData = dishList[i].data()
      let imageUrl = dishData.Image
      let restaurantName = dishData.Restaurant
      let dishName = dishData.Dish
      let review = dishData.Review
      let city = dishData.City
      let rating = dishData.Rating 
      if (city == 'Philadelphia'){
      reviewsDiv.insertAdjacentHTML('beforeend',`<div class="review md:flex flex-row border border-black w-full mt-4 items-center">
      <div><img src = "${imageUrl}" class="m-6 w-60"></img></div>
      <ul class = "ml-16">
      <li>Restaurant: ${restaurantName}</li>
      <li>City: ${city}</li>
      <li>Dish: ${dishName}</li>
      <li>Rating: ${rating} Stars </li>
      <li>Comments: ${review} </li>
      </ul><p> 
      </div>
      `)
    }
    }
})
  
  }
})
