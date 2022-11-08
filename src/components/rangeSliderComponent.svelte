<script>
    import RangeSlider from "svelte-range-slider-pips";
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
		/>
</div>

