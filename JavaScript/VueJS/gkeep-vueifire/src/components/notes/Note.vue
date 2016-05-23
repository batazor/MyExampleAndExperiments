<template>
  <div class="note">
    <h1>{{ note.title }}</h1>
    <pre>
      {{ note.content }}
    </pre>
  </div>
</template>

<script>
  export default {
    props: ['note']
    // here you define the attributes/props of the component,
    // will be available via this.note
    // when using component you can use the prop externally via
    // '<note :note"{title: 'hi', content: 'lorem'}" ></note>'
  }
</script>

<style>
  .note{
    background: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 5px #ccc;
    padding: 10px;
    margin: 8px 0;
    width: 240px;
  }

  .note h1{
    font-size: 1.1em;
    margin-bottom: 6px;
  }

  .note pre {
    font-size: 1.1em;
    margin-bottom: 10px;
    white-space: pre-wrap;
    word-wrap: break-word;
    font-family: inherit;
  }
</style>
