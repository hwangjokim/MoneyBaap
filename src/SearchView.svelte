<script>
import Navbar from "./components/Navbar.svelte";
import RangeSlider from "./components/rangeSliderComponent.svelte";
import WordList from "./components/WordList.svelte";
import {
    onMount
} from "svelte";
import {
    apiData,
    places
} from "./apis/api.js";
import {
    minvlu
} from "./store.js";
import {
    maxvlu
} from "./store.js";

export const title = "Search View";
let searchHint = "남은 메뉴 키워드 : 5/5";
let words = [];
let searcher = "";
let searchButton = "검색";

let modifySearchHint = () => {
    searchHint = "남은 메뉴 키워드 : " + (5 - words.length) + "/5";
}
let addWord = () => {
    if (words.length < 5) {
        if (searcher.trim() !== "") {
            words.push(searcher);
            words = words;
            modifySearchHint();
            searchButton = "검색";
        }
        searcher = "";
    }
};
let onHandleDelete = (text) => {
    words = words.filter((element) => element !== text);
    modifySearchHint();
};

onMount(async () => {
    fetch("http://127.0.0.1:5921/contacts") // backend 레포에서, RestAPI 폴더로 cd 한 뒤 node app.js해서 백 서버 로컬에서 실행해야 작동함 
        .then(response => response.json())
        .then(data => {
            console.log(data);
            apiData.set(data);
        }).catch(error => {
            console.log(error);
            return [];
        });

});

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
            <dl>
                {#each $places as place}
                <dt>{place.name}  ★ : {place.star} | {place.locate} </dt>
                {#each place.menus as menu_list}
                <dd>{menu_list[0]}, {menu_list[1]}</dd>
                <!-- <img src={menu_list[2]} width="100" height="100" alt="img"> -->

                {/each}
                <hr />
                {/each}
            </dl>
        </div>
    </div>
    
</section>

<style lang="scss">
@import "scss/SearchViewCss.scss"
</style>
