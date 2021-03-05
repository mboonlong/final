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
<h1> Signed in as ${user.displayName}</h1>
<button class="underline sign-out">Sign Out</button>`)

document.querySelector('.sign-out').addEventListener('click', function(event) {
firebase.auth().signOut()
document.location.href = 'home.html'
})

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
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold m-6 px-2 rounded">Favorites ∨</button>
      <div class="dropdown-favorites-content">
        <p><button>All Dishes</button></p>
        <p><button>My Favorites</button></p>
        <p><button>Friends Favorites</button></p>
      </div>
    </div>`)


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
  }
})
