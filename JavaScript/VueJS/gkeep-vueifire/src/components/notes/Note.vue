<template>
  <div class="note">
    <h1>{{note.title}}</h1>
    <pre>{{note.content}}</pre>
    <button type="button" v-on:click.stop="remove">
      <i class="fa fa-trash-o" aria-hidden="true"></i>
    </button>
    <button class="edit" type="button">
      <i class="fa fa-pencil" aria-hidden="true"></i>
    </button>
  </div>
</template>

<script>
  import noteRepository from '../../data/NoteRepository'

  export default {
    props: ['note'],
    methods: {
      remove () {
        noteRepository.remove(this.note, (err) => {
          if (err) throw err // TODO: inform the user
        })
      }
    }
  }
</script>

<style>
  .note{
    background: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 5px #ccc;
    padding: 10px;
    margin: 8px 0;
    width: 240px; /* collumn size */
    transition: box-shadow .5s;
    cursor: default;
  }

  .note h1{
    font-size: 1.1em;
    margin-bottom: 6px;
    word-wrap: break-word;
  }

  .note pre {
    font-size: 1.1em;
    margin-bottom: 10px;
    white-space: pre-wrap;
    word-wrap: break-word;
    font-family: inherit;
  }

  .note button{
    background: none;
    border: none;
    font-size: 20px;
    opacity: 0;
    cursor: pointer;
    transition: opacity .5s;
    margin: 0 4px 0 0;
  }

  .note button.edit{
    float: right;
  }

  .note:hover, .note:focus{
    box-shadow: 0 2px 10px #999;
  }

  .note:hover button, .note:focus button{
    opacity: 0.6;
  }
  
  .note button:hover, .note button:focus{
    opacity: 1;
  }
</style>
