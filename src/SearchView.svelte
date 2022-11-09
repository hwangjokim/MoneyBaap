<script>
    import Navbar from "./components/Navbar.svelte";
    import RangeSlider from "./components/rangeSliderComponent.svelte";
    import WordList from "./components/WordList.svelte";
    export const title = "Search View";
    let search_value = "돈까스";
    let words = [];
    let searcher="";
    let search_btn="검색";
    let addWord = () =>{
        if (words.length < 5){
        words.push(searcher);
        words=words
        searcher=""
        }
        if (words.length==5){
            search_btn="X"
        }
    }
    let onHandleDelete = text =>{
        words=words.filter((element) => element!==text);
    }

</script>

<section class="hero" style="width: auto;">
    <div class="hero-head">
        <Navbar />
    </div>
    <div class="search_bg">
        <div class="hero-body">
            <div class="container" style="margin-top: 100px;">
                <div
                    class="field has-addons"
                    style="width: 700px;
        margin-left: auto;
        margin-right: auto;"
                >
                    <div class="control has-icons-left" style="width: 600px; ">
                        <input
                            class="input is-focused"
                            type="text"
                            placeholder={search_value}
                            bind:value={searcher}
                        />
                        <span class="icon is-small is-left">
                            <i class="fa fa-search" aria-hidden="true" />
                        </span>
                    </div>
                    <div class="control">
                        <button class="button is-info" on:click={addWord}>{search_btn} </button>
                    </div>
                    
                </div>
                <div class="container" style="text-align: center;">
                        
                        <WordList {words} {onHandleDelete} />
                    </div>
            </div>

            <div class="slider" style="margin-top: 50px; width:1000px">
                <RangeSlider />
            </div>
        </div>
    </div>
</section>
