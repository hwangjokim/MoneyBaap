<script>
    import RangeSlider from "svelte-range-slider-pips";
    export let minPrice=0
    export let maxPrice=0
</script>
<div class=slider>
    <RangeSlider
        float=true
        step={1000}
        pipstep={5}
        pushy=true
        range=true
        values={[0,10000]}
        min={0}
        max={20000}
        all='label'
        pips=true
		on:change={(e)=>minPrice=e.detail.values[0]}
		on:change={(e)=>maxPrice=e.detail.values[1]}/>
</div>

