<script>
  import Navbar from "./components/Navbar.svelte";
  import RangeSlider from "./components/rangeSliderComponent.svelte";
  import WordList from "./components/WordList.svelte";
  import { apiData, places } from "./apis/api.js";
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
      value: "0",
      label: "최저가순",
    },
    {
      value: "1",
      label: "최고가순",
    },
    {
      value: "2",
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
    console.log($minvlu)
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
        promise = doFetch();
      } else {
        promise = doReset();
      }
      document.getElementById("lists").scrollTop = 0;
      searcher = "";
    }
  };

  let onHandleDelete = (text) => {
    changeDisplay();
    words = words.filter((element) => element !== text);
    promise = doReset(); // promise에 대입해서 갱신을 알림
    modifySearchHint();
  };

  // 최저가순:0, 최고가순:1 정렬 바꾸기
  let onChangeOrder = () => {
    console.log(radios.value);
    orderFlag = radios.value;

    promise = doReset();
    document.getElementById("lists").scrollTop = 0;
  };
  /* 
doReset 함수 : 키워드를 삭제할 때 마다 호출되는 함수 
*/
  let doReset = () => {
    backup = [];
    if (words.length == 0)
      defaultSearch(); // 키워드를 모두 지웠다면, 모든 메뉴 검색
    else {
      for (let k = 0; k < words.length; k++) {
        //키워드가 남아있다면, 순회하며 검색함
        fetch(
          "http://ec2-15-165-107-63.ap-northeast-2.compute.amazonaws.com/lowPrice/" +
            $radioValue.value +
            "?search=" +
            words[k]
        ) // backend 레포에서, RestAPI 폴더로 cd 한 뒤 node app.js해서 백 서버 로컬에서 실행해야 작동함
          .then((response) => response.json())
          .then((data) => {
            result = []; // result는 10개식 짤라서 ㄹㅇㄹㅇㄹㅇ 보여줄 배열
            apiData.set(data);
            backup.push(...$places); //백업은  result의 자르기 전 버전
            if (orderFlag != 2) {
              console.log("Sort with others");
              backup.sort(function (first, second) {
                // 백업 배열에서, 가격을 낮은 순서로 정렬해줌
                return first.price - second.price;
              });
            } else if (orderFlag == 2) {
              console.log("sort with dist");
              backup.sort(function (first, second) {
                // 백업 배열에서, 가격을 낮은 순서로 정렬해줌
                return first.distance - second.distance;
              });
            }
            backup = backup.filter(
              //중복 제거 (메뉴 이름과 가게이름 같을경우 컷)
              (value, index, self) =>
                index ===
                self.findIndex(
                  (t) =>
                    t.placeName === value.placeName && t.name === value.name
                )
            );

            if (orderFlag == 1) backup.reverse();
            if ($maxvlu == 20000) maxValueForSearch = 1000000;
            else maxValueForSearch = $maxvlu;

            console.log({ orderFlag });
            tempForView = backup.filter(
              //tempForView = 백업 배열에서, 가격 범위가 지정된 배열. 얘가 result에 10개단위로 썰려서 들어감
              (place) =>
                parseInt(place.price) >= $minvlu &&
                parseInt(place.price) <= maxValueForSearch
            );
            for (
              let i = 0;
              i < tempForView.length;
              i += 10 //result에 10개씩 잘라서 담아줌
            )
              result.push(tempForView.slice(i, i + 10));
          })
          .catch((error) => {
            console.log(error);
            return [];
          });
      }
    }
  };

  //doFetch = 키워드 추가할때 호출
  let doFetch = () => {
    fetch(
      "http://ec2-15-165-107-63.ap-northeast-2.compute.amazonaws.com/lowPrice/" +
        $radioValue.value +
        "?search=" +
        words[words.length - 1] //words의 맨 마지막 원소로 검색
    ) // backend 레포에서, RestAPI 폴더로 cd 한 뒤 node app.js해서 백 서버 로컬에서 실행해야 작동함
      .then((response) => response.json())
      .then((data) => {
        result = [];
        apiData.set(data);
        backup.push(...$places);
        backup.sort(function (first, second) {
          return first.price - second.price;
        });
        backup = backup.filter(
          (value, index, self) =>
            index ===
            self.findIndex(
              (t) => t.placeName === value.placeName && t.name === value.name
            )
        );

        //orderFlag가 1이면, 최고가순 정렬
        if (orderFlag == 1) backup.reverse();
        console.log({ orderFlag });

        if ($maxvlu == 20000) maxValueForSearch = 1000000;
        else maxValueForSearch = $maxvlu;

        tempForView = backup.filter(
          (place) =>
            parseInt(place.price) >= $minvlu &&
            parseInt(place.price) <= maxValueForSearch
        );
        for (let i = 0; i < tempForView.length; i += 10)
          result.push(tempForView.slice(i, i + 10));
      })
      .catch((error) => {
        console.log(error);
        return [];
      });
  };
  let defaultSearch = () => {
    console.log($radioValue.value);
    fetch(
      "http://ec2-15-165-107-63.ap-northeast-2.compute.amazonaws.com/lowPrice/" +
        $radioValue.value +
        "?search="
    ) // backend 레포에서, RestAPI 폴더로 cd 한 뒤 node app.js해서 백 서버 로컬에서 실행해야 작동함
      .then((response) => response.json())
      .then((data) => {
        // console.log(data)
        result = [];

        if ($maxvlu == 20000) maxValueForSearch = 1000000;
        else maxValueForSearch = $maxvlu;

        apiData.set(data);
        backup.push(...$places);

        if (orderFlag != 2) {
          console.log("Sort with others");
          backup.sort(function (first, second) {
            // 백업 배열에서, 가격을 낮은 순서로 정렬해줌
            return first.price - second.price;
          });
        } else if (orderFlag == 2) {
          console.log("sort with dist");
          backup.sort(function (first, second) {
            // 백업 배열에서, 가격을 낮은 순서로 정렬해줌
            return first.distance - second.distance;
          });
        }

        backup = backup.filter(
          (place) =>
            parseInt(place.price) >= $minvlu &&
            parseInt(place.price) <= maxValueForSearch
        );

        if (orderFlag == 1) backup.reverse();

        for (let i = 0; i < backup.length; i += 10)
          result.push(backup.slice(i, i + 10));
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
          <label class="checkbox" >
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
                  {#if isCheck}
                    <a href={place.link} target="_blank" rel="noreferrer">
                      <!-- svelte-ignore a11y-missing-attribute -->
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
                              <dt>{place.placeName}</dt>
                              {#if place.star != null}
                                {#if place.distance < 1000}
                                  <dd>★ : {place.star} | {place.distance} m</dd>
                                {:else}
                                  <dd>
                                    ★ : {place.star} | {place.distance / 1000} km
                                  </dd>
                                {/if}
                              {:else if place.distance < 1000}
                                <dd>{place.distance} m</dd>
                              {:else}
                                <dd>{place.distance / 1000} km</dd>
                              {/if}
                            </slot>
                          </div>
                        </slot>
                      </div>
                    </a>
                  {:else if !isCheck && place.price != 0}
                    <a href={place.link} target="_blank" rel="noreferrer">
                      <!-- svelte-ignore a11y-missing-attribute -->
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
                              <dt>{place.placeName}</dt>
                              {#if place.star != null}
                                {#if place.distance < 1000}
                                  <dd>★ : {place.star} | {place.distance} m</dd>
                                {:else}
                                  <dd>
                                    ★ : {place.star} | {place.distance / 1000} km
                                  </dd>
                                {/if}
                              {:else if place.distance < 1000}
                                <dd>{place.distance} m</dd>
                              {:else}
                                <dd>{place.distance / 1000} km</dd>
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
