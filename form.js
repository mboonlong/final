firebase.auth().onAuthStateChanged(async function(user) {
    if (user) {
      // Signed in
      console.log('signed in')

      let db = firebase.firestore()

     

      let restaurantName = document.querySelector('#restaurant-name').value
            let dishName = document.querySelector('#dish-name').value
            let imageUrl = document.querySelector('#image-url').value
            let review = document.querySelector('#review').value
    
        db.collection('reviews').doc(user.uid).set({
            Restaurant: restaurantName,
            Dish: dishName,
            Image: imageUrl,
            Review: review
      })

      window.addEventListener('DOMContentLoaded', async function(event) {
        let form = document.querySelector('form').addEventListener('submit', async function(event) {
            event.preventDefault()
  
      // Sign-out button
      document.querySelector('.sign-in-or-sign-out').innerHTML = `
        <button class="text-pink-500 underline sign-out">Sign Out</button>
      `
      document.querySelector('.sign-out').addEventListener('click', function(event) {
        console.log('sign out clicked')
        firebase.auth().signOut()
        document.location.href = 'index.html'
      })


    
        
            // let restaurantName = document.querySelector('#restaurant-name').value
            // let dishName = document.querySelector('#dish-name').value
            // let imageUrl = document.querySelector('#image-url').value
            // let review = document.querySelector('#review').value


        
        
            // let docRef = await db.collection('reviews').add({ //'posts' had to match with what's in firestore 
            //   Restaurant: restaurantName,
            //   Dish: dishName,
            //   Image: imageUrl,
            //   Review: review
            // })
        })
})
}
})