<script>
    import Navbar from "./components/Navbar.svelte";
    import RangeSlider from "./components/rangeSliderComponent.svelte";
    import WordList from "./components/WordList.svelte";
    import { minvlu } from "./store.js";
    import { maxvlu } from "./store.js";

    export const title = "Search View";
    let searchHint = "남은 메뉴 키워드 : 5/5";
    let words = [];
    let searcher = "";
    let searchButton = "검색";

    let modifySearchHint =()=>{
        searchHint="남은 메뉴 키워드 : " + (5-words.length) + "/5";
    }
    let addWord = () => {
        if (words.length < 5) {
            if (searcher.trim()!==""){
            words.push(searcher);
            words = words;
            modifySearchHint();
            searchButton = "검색";
            }
            searcher = "";
        }
        if (words.length == 5) {
            searchButton = "X";
        }
    };
    let onHandleDelete = (text) => {
        words = words.filter((element) => element !== text);
        modifySearchHint();
    };
</script>

<section class="hero" style="width: auto;">
    <div class="hero-head">
        <Navbar />
    </div>
    <div class="search_bg">
        <div class="hero-body">
            <div class="container search">
                <div class="field has-addons">
                    <div class="control has-icons-left">
                        <input
                            class="input is-focused"
                            type="text"
                            placeholder={searchHint}
                            bind:value={searcher}
                        />
                        <span class="icon is-small is-left">
                            <i class="fa fa-search" aria-hidden="true" />
                        </span>
                    </div>
                    <div class="control">
                        <button class="button is-info" on:click={addWord}
                            >{searchButton}
                        </button>
                    </div>
                </div>
                <div class="container wordlist" style="text-align: center;">
                    <WordList {words} {onHandleDelete} />
                </div>
            </div>

            <div class="slider">
                <RangeSlider bind:$minvlu bind:$maxvlu />
            </div>
        </div>
    </div>
    

</section>

<style lang="scss">
	@import "scss/SearchViewCss.scss"
</style>
