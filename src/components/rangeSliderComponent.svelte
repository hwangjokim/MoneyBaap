<script>
    import RangeSlider from "svelte-range-slider-pips";
    export let minvlu;
    export let maxvlu;
</script>
<div class=slider>
    <RangeSlider
        float=true
        step={1000}
        pipstep={5}
        pushy=true
        range=true
        min={0}
        max={20000}
        values = {[minvlu,maxvlu]}
        all='label'
        pips=true
		/>
</div>

