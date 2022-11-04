<script>
    export let buttonType = 'primary';
    export let selectPriceRange = false;
</script>

<button class={buttonType} class:selectPriceRange={selectPriceRange}>
    <slot>음식점 찾기</slot>
</button>

<style>
    button{
        border:0;
        cursor:pointer;
        border-radius: 6px;
        padding:8px 12px;
        font-weight:bold;
        box-shadow:1px 2px 3px rgb(0,0,1,0.2)
    }
    .selectPriceRange {
        background: #18A8F1;
        color: white
    }
</style>