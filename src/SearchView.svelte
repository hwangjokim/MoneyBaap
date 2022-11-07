<script>
    import Navbar from "./Navbar.svelte";
    import RangeSlider from "svelte-range-slider-pips";
    export const title = "Search View";
    let search_value = "굶어";
    let vls = [0, 10000];
</script>

<section class="hero">
    <div class="hero-head">
        <Navbar />
    </div>

    <div class="container is-widescreen" style="margin-top: 100px;">
        <div class="field has-addons">
            <div class="control has-icons-left" style="width: 600px;">
                <input
                    class="input is-focused"
                    type="text"
                    placeholder={search_value}
                />
                <span class="icon is-small is-left">
                    <i class="fa fa-search" aria-hidden="true" />
                </span>
            </div>
            <div class="control">
                <button class="button is-info"> 검색 </button>
            </div>
        </div>
        <div class="slider" style="margin-top: 50px;">
            <RangeSlider
                float
                step={1000}
                pipstep={5}
                pushy="true"
                range
                values={vls}
                min={0}
                max={20000}
                all="label"
                pips
            />
        </div>
    </div>
</section>
