<template>
  <div>
    <create-note-form></create-note-form>
    <notes></notes>
    <update-modal :note.sync="selectedNote"></update-modal>
  </div>
</template>

<script>
  import Notes from './components/notes/Index'
  import CreateNoteForm from './components/notes/Create'
  import UpdateModal from './components/notes/UpdateModal'

  export default {
    components: {
      Notes,
      CreateNoteForm,
      UpdateModal
    },
    data () {
      return {
        selectedNote: null
      }
    },
    events: {
      'note.selected': function (note) {
        this.selectedNote = note
      }
    }
  }
</script>

<style>
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  html{
    font-family: sans-serif;
  }

  body{
    background: #eee;
    padding: 0 16px;
  }
</style>
