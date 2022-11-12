<script>
    import RangeSlider from "svelte-range-slider-pips";
    import { minvlu } from "../store.js";
    import { maxvlu } from "../store.js";
</script>

<div class="slider">
    <RangeSlider
        float="true"
        step={1000}
        pipstep={5}
        pushy="true"
        range="true"
        min={0}
        max={20000}
        values={[$minvlu, $maxvlu]}
        all="label"
        pips="true"
        on:change={(e) => ($minvlu = e.detail.values[0])}
        on:change={(e) => ($maxvlu = e.detail.values[1])}
    />
</div>

