<script>
    export let onHandleDelete;
    export let word;
</script>
    
        <button class="button is-info is-light is-outlined is-rounded" style="margin-right: 20px;" on:click="{() => onHandleDelete(word)}" ><span>{word}</span>
            <span class="icon is-small">
              <i class="fas fa-times"></i>
            </span></button>

