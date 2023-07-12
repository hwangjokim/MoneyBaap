<script>
  import Navbar from "./components/Navbar.svelte";
  import RangeSlider from "./components/rangeSliderComponent.svelte";
  import WordList from "./components/WordList.svelte";
  import { minvlu } from "./store.js";
  import { maxvlu } from "./store.js";
  import { radioValue } from "./store.js";
  import { replace } from "svelte-spa-router";
  import LazyLoad from "@dimfeld/svelte-lazyload";
  import { onMount } from "svelte";
  //Todo : 1. 별점, 글자 잘리는 거 해결하기
  export const title = "안숭맛춤";

  const options = [
    {
      value: "low",
      label: "최저가순",
    },
    {
      value: "high",
      label: "최고가순",
    },
    {
      value: "dist",
      label: "거리순",
    },
  ];
  let radios = options[0];

  let searchHint = "남은 메뉴 키워드 : 5/5";
  let words = [];
  let searcher = "";
  let searchButton = "검색";
  let result = [];
  let isCheck = true;
  let orderFlag = 0;
  let maxValueForSearch = $maxvlu;
  const alt = "noimg.png";

  onMount(() => {
    if ($radioValue.value == undefined) replace("/");
    changeDisplay();
  });

  //promise가 갱신될 때 마다 (어떻게든) 새롭게 서버에서 쿼리보내서 가져오는 느낌
  let onKeyDown = (e) => {
    switch (e.keyCode) {
      case 13:
        addWord();
    }
  };

  let changeDisplay = () => {
    let see = document.getElementById("see0");

    if ($minvlu == 0) {
      see.style.display = "block";
    } else {
      see.style.display = "none";
    }
  };

  let modifySearchHint = () => {
    searchHint = "남은 메뉴 키워드 : " + (5 - words.length) + "/5";
  };
  // promise가 새로운 갱신의 역할
  let addWord = () => {
    changeDisplay();
    promise = [];
    if (words.length < 5) {
      if (searcher.trim() !== "") {
        words.push(searcher);
        words = words;
        modifySearchHint();
        searchButton = "검색";
        promise = defaultSearch();
      } else {
        promise = defaultSearch();
      }
      document.getElementById("lists").scrollTop = 0;
      searcher = "";
    }
  };

  let onHandleDelete = (text) => {
    changeDisplay();
    words = words.filter((element) => element !== text);
    promise = defaultSearch(); // promise에 대입해서 갱신을 알림
    modifySearchHint();
  };

  // 최저가순:0, 최고가순:1 정렬 바꾸기
  let onChangeOrder = () => {
    promise = defaultSearch();
    document.getElementById("lists").scrollTop = 0;
  };
  let defaultSearch = () => {
    window.scrollTo(0, 0);
    if ($maxvlu == 20000) maxValueForSearch = 1000000;
    else maxValueForSearch = $maxvlu;
    let query =
      "http://localhost:8080/low/" +
      $radioValue.value +
      "?minValue=" +
      $minvlu +
      "&maxValue=" +
      maxValueForSearch +
      "&sort=" +
      radios.value +
      "&zero=" +
      isCheck;
    for (let i = 0; i < words.length; i++) {
      query += "&search=" + words[i];
    }
    fetch(query) // backend 레포에서, RestAPI 폴더로 cd 한 뒤 node app.js해서 백 서버 로컬에서 실행해야 작동함
      .then((response) => response.json())
      .then((data) => {
        result = [];

        backup.push(...data);

        for (let i = 0; i < backup.length; i += 8)
          result.push(backup.slice(i, i + 8));
        backup = [];
      });
  };

  let backup = [];
  let tempForView = [];

  let promise = defaultSearch();

  let gridCount = () => {};
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

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
        <div id="see0" style="display: none;">
          <label class="checkbox">
            <input type="checkbox" bind:checked={isCheck} />
            0원 표시하기
          </label>
        </div>
        {#each options as option}
          <label class="radio">
            <input
              type="radio"
              bind:group={radios}
              name="foobar"
              value={option}
              on:change={onChangeOrder}
            />
            {option.label}
          </label>
        {/each}
      </div>

      <div class="listOfPlace" id="lists">
        <dl>
          {#await promise then data}
            {#each result as placer}
              <LazyLoad>
                {#each placer as place}
                  <a href={place.placeLink} target="_blank" rel="noreferrer">
                    <!-- svelte-ignore a11y-missing-attribute -->
                    <div class="box">
                      <slot>
                        <div class="pic">
                          {#if place.imgUrl !== null}
                            <img loading="lazy" src={place.imgUrl} {alt} />
                          {:else}
                            <img loading="lazy" src={alt} />
                          {/if}
                        </div>
                        <div class="menuInfo">
                          <slot>
                            <div class="m_name" style="font-weight:bold">
                              {place.menuName}
                            </div>
                            <ds>{place.price}원 </ds>
                            <dt>{place.placeName}</dt>
                            {#if place.distance < 1000}
                              <dd>★ : {place.stars} | {place.distance} m</dd>
                            {:else}
                              <dd>
                                ★ : {place.stars} | {place.distance / 1000} km
                              </dd>
                            {/if}
                            <!-- {:else if place.distance < 1000}
                              <dd>{place.distance} m</dd>
                            {:else}
                              <dd>{place.distance / 1000} km</dd> -->
                          </slot>
                        </div>
                      </slot>
                    </div>
                  </a>
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
