<template>
  <div class="notes">
    <note
      v-for="note in notes"
      :note="note">
    </note>
  </div>
</template>

<script>
  import Firebase from 'firebase'
  import Note from './Note'

  export default {
    components: {
      Note
    },
    data () {
      return {
        notes: []
      }
    },
    ready () {
      let firebase = new Firebase('https://intense-torch-7218.firebaseio.com/')

      firebase.child('notes').on('child_added', (snapshot) => {
        let note = snapshot.val()
        this.notes.unshift(note)
      })
    }
  }
</script>

<style>
  .notes{
    padding: 0 100px;
  }
</style>
