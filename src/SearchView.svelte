<script>
    import Navbar from "./components/Navbar.svelte";
    import RangeSlider from "./components/rangeSliderComponent.svelte";
    export const title = "Search View";
    let search_value = "굶어";
    let vls = [0, 10000];
</script>

<section class="hero">
    <div class="hero-head">
        <Navbar />
    </div>
    <div class="search_bg">
    <div class="hero-body">
        
    <div class="container has-text-centered" style="margin-top: 100px;">
        <div class="field has-addons" style="width: 700px;
        margin-left: auto;
        margin-right: auto;">
            <div class="control has-icons-left" style="width: 600px; ">
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
        <div class="slider" style="margin-top: 50px; width:1000px">
            <RangeSlider />
        </div>
    </div>
</div>
</div>
</section>
