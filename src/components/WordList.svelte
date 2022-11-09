
<script>
    export let words;
    export let onHandleDelete;
    import WordItem from "./WordItem.svelte"
    

</script>

    {#each words as word}
    <WordItem {word} {onHandleDelete}/>
    {/each}