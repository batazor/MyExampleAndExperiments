import Vue from 'vue'
import App from './App'
import Firebase from 'firebase'

let firebase = new Firebase('https://intense-torch-7218.firebaseio.com/')

firebase.child('notes').set([
  { title: 'Hello world', content: 'Lorem ipsum' }
])

firebase.child('notes').on('value', (snapshot) => {
  let notes = snapshot.val()
  console.log(notes)
  window.alert(notes[0].title)
})

/* eslint-disable no-new */
new Vue({ // new Vue instance
  el: 'body', // attach Vue to the body
  components: { App } // include App component globally
})
