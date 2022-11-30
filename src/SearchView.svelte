<script>
  import Navbar from "./components/Navbar.svelte";
  import RangeSlider from "./components/rangeSliderComponent.svelte";
  import WordList from "./components/WordList.svelte";
  import { apiData, places } from "./apis/api.js";
  import { minvlu } from "./store.js";
  import { maxvlu } from "./store.js";
  import LazyLoad from "@dimfeld/svelte-lazyload";
// 지금 되는거 : 가격 범위 보여주기, 검색 "한개까지" , 지우는거 안됨 
  export const title = "Search View";
  let searchHint = "남은 메뉴 키워드 : 5/5";
  let words = [];
  let searcher = "";
  let searchButton = "검색";
  let result = [];
  let isCheck = true;
  const alt = "noimg.png";

  let onKeyDown = (e) => {
    switch (e.keyCode) {
      case 13:
        addWord();
    }
  };

  let modifySearchHint = () => {
    searchHint = "남은 메뉴 키워드 : " + (5 - words.length) + "/5";
  };

  let addWord = () => {
    promise = [];
    if (words.length < 5) {
      if (searcher.trim() !== "") {
        words.push(searcher);
        words = words;
        modifySearchHint();
        searchButton = "검색";
        promise = doFetch();
      }
      searcher = "";
    }
  };

  let onHandleDelete = (text) => {
    words = words.filter((element) => element !== text);
    doReset();
    modifySearchHint();
  };

  let doReset = () => {
    backup=[];
    promise=doFetch();
  };

  let doFetch = () => {
    fetch(
      "http://ec2-15-165-107-63.ap-northeast-2.compute.amazonaws.com/lowPrice?search=" +
        words[0]
    ) // backend 레포에서, RestAPI 폴더로 cd 한 뒤 node app.js해서 백 서버 로컬에서 실행해야 작동함
      .then((response) => response.json())
      .then((data) => {
        result = [];
        apiData.set(data);
        backup.push(...$places);
        
        backup.sort(function (first, second) {
          return first.price - second.price;
        });
        backup = backup.filter((place) => (parseInt(place.price)  >= $minvlu && parseInt(place.price) <= $maxvlu));
        console.log(backup);

        for (let i = 0; i < backup.length; i += 10)
          result.push(backup.slice(i, i + 10));
      })
      .catch((error) => {
        console.log(error);
        return [];
      });
  };
  let backup = [];

  let promise = fetch(
    "http://ec2-15-165-107-63.ap-northeast-2.compute.amazonaws.com/lowPrice?search="
  ) // backend 레포에서, RestAPI 폴더로 cd 한 뒤 node app.js해서 백 서버 로컬에서 실행해야 작동함
    .then((response) => response.json())
    .then((data) => {
      // console.log(data)
      result = [];
      apiData.set(data);
      backup.push(...$places);
      backup = backup.filter((place) => (parseInt(place.price)  >= $minvlu && parseInt(place.price) <= $maxvlu));
      for (let i = 0; i < backup.length; i += 10)
        result.push(backup.slice(i, i + 10));
      backup=[];
    });

  let gridCount = () => {};
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
            <button class="button is-info" on:click={addWord}>
              {searchButton}
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
      <div class="control is-radio">
        <label class="radio">
          <input type="radio" name="foobar" checked />
          최저가순
        </label>
        <label class="radio">
          <input type="radio" name="foobar" />
          최고가순
        </label>

        <label class="checkbox" style="margin-left: 0.5em;">
          <input type="checkbox" bind:checked={isCheck} />
          0원 표시하기
        </label>
      </div>

      <div class="listOfPlace">
        <dl>
          {#await promise then data}
            {#each result as placer}
              <LazyLoad>
                {#each placer as place}
                  {#if isCheck}
                    <a href={place.link} target="_blank" rel="noreferrer">
                      <div class="box">
                        <slot>
                          <div class="pic">
                            {#if place.imgUrl !== null}
                              <img src={place.imgUrl} />
                            {:else}
                              <img src={alt} />
                            {/if}
                          </div>
                          <div class="menuInfo">
                            <slot>
                              <div class="m_name" style="font-weight:bold">
                                {place.name}
                              </div>
                              <ds>{place.price}원 </ds>
                              {#if place.star != null}
                                <dt>{place.placeName} | ★ : {place.star}</dt>
                              {:else}
                                <dt>{place.placeName}</dt>
                              {/if}
                            </slot>
                          </div>
                        </slot>
                      </div>
                    </a>
                  {:else if !isCheck && place.price != 0}
                    <a href={place.link} target="_blank" rel="noreferrer">
                      <div class="box">
                        <slot>
                          <div class="pic">
                            {#if place.imgUrl !== null}
                              <img src={place.imgUrl} />
                            {:else}
                              <img src={alt} />
                            {/if}
                          </div>
                          <div class="menuInfo">
                            <slot>
                              <div class="m_name" style="font-weight:bold">
                                {place.name}
                              </div>
                              <ds>{place.price}원 </ds>
                              {#if place.star != null}
                                <dt>{place.placeName} | ★ : {place.star}</dt>
                              {:else}
                                <dt>{place.placeName}</dt>
                              {/if}
                            </slot>
                          </div>
                        </slot>
                      </div>
                    </a>
                  {/if}
                {/each}
              </LazyLoad>
            {/each}
          {/await}
        </dl>
      </div>
    </div>
  </div>
</section>

<svelte:window on:keydown|prevent_default={onKeyDown} />

<style lang="scss">
  @import "scss/SearchViewCss.scss";
</style>
