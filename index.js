firebase.auth().onAuthStateChanged(async function(user) {
  if (user) {
    // Signed in
    console.log('signed in')
    let db = firebase.firestore()
    
    db.collection('users').doc(user.uid).set({
        name: user.displayName,
        email: user.email
      })

document.querySelector('.sign-in-or-sign-out').insertAdjacentHTML('beforeend', `
<h1 class= font-bold> Signed in as ${user.displayName}</h1>
<button class="underline sign-out">Sign Out</button>`)

document.querySelector('.sign-out').addEventListener('click', function(event) {
firebase.auth().signOut()
document.location.href = 'index.html'
})

document.querySelector('.submissionlink').insertAdjacentHTML('beforeend',`
<a href='form.html'>Submit New Review</a>`)

document.querySelector('.dropdowns').insertAdjacentHTML('beforeend', `

<!--FAVORITES DROPDOWN-->
  
  <style>
    .dropdown-favorites {
      position: relative;
      display: inline-block;
    }
    
    .dropdown-favorites-content {
      display: none;
      position: absolute;
      background-color: #f9f9f9;
      min-width: 160px;
      box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
      padding: 12px 16px;
      z-index: 1;
    }
    
    .dropdown-favorites:hover .dropdown-favorites-content {
      display: block;
    }

    .dropdown-favorites-content p:hover {background-color:#6f86c4}

    </style>
    
    <div class="dropdown-favorites">
      <button class="bg-gray-500 hover:bg-gray-700 text-white font-bold m-6 px-2 rounded">Favorites ∨</button>
      <div class="dropdown-favorites-content">
        <p><button>All Dishes</button></p>
        <p><button>My Favorites</button></p>
        <p><button>Friends Favorites</button></p>
      </div>
    </div>`)

    let querySnapshot = await db.collection('reviews').get()
  
    let dishList = querySnapshot.docs
    for (let i=0; i<dishList.length; i++) {
      let dishData = dishList[i].data()
      let imageUrl = dishData.Image
      let restaurantName = dishData.Restaurant
      let dishName = dishData.Dish
      let review = dishData.Review
      let city = dishData.City
  
  document.querySelector('.reviews').insertAdjacentHTML('beforeend',`
  <div class="md:flex flex-row border border-black w-full mt-4 items-center">
  <div><img src = "${imageUrl}" class="m-6 w-60"></img></div>
  <ul class = "ml-16">
  <li>Restaurant: ${restaurantName}</li>
  <li>City: ${city}</li>
  <li>Cuisine: Healthy</li>
  <li>Dish: ${dishName}</li>
  <li>Rating: ⭐⭐⭐⭐⭐</li>
  <li>Instagram Rating: 📸📸📸📸📸</li>
  <li>Comments: ${review} </li>
  </ul>
  </div>
  
  `)
}

// document.querySelector('.dropdown-city-content').addEventListener('click', async function() {

// document.querySelector('.review').innerHTML =''

// let filteredreviews = await db.collection('reviews').where(`${city}`, '==', dishCity).get()

// let dishList = querySnapshot.docs
//     for (let i=0; i<dishList.length; i++) {
//       let dishData = dishList[i].data()
//       let imageUrl = dishData.Image
//       let restaurantName = dishData.Restaurant
//       let dishName = dishData.Dish
//       let review = dishData.Review
//       let city = dishData.City
  
//   document.querySelector('.reviews').insertAdjacentHTML('beforeend',`
//   <div class="md:flex flex-row border border-black w-full mt-4 items-center">
//   <div><img src = "${imageUrl}" class="m-6 w-60"></img></div>
//   <ul class = "ml-16">
//   <li>Restaurant: ${restaurantName}</li>
//   <li>City: ${city}</li>
//   <li>Cuisine: Healthy</li>
//   <li>Dish: ${dishName}</li>
//   <li>Rating: ⭐⭐⭐⭐⭐</li>
//   <li>Instagram Rating: 📸📸📸📸📸</li>
//   <li>Comments: ${review} </li>
//   </ul>
//   </div>
  
//   `)
// }
// }


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
  
  document.querySelector('.reviews').insertAdjacentHTML('beforeend',`
  <div class="md:flex flex-row border border-black w-full mt-4 items-center">
  <div><img src = "${imageUrl}" class="m-6 w-60"></img></div>
  <ul class = "ml-16">
  <li>Restaurant: ${restaurantName}</li>
  <li>City: Chicago</li>
  <li>Cuisine: Healthy</li>
  <li>Dish: ${dishName}</li>
  <li>Rating: ⭐⭐⭐⭐⭐</li>
  <li>Instagram Rating: 📸📸📸📸📸</li>
  <li>Comments: ${review} </li>
  </ul>
  </div>
  
  `)
}
  
  }
})
