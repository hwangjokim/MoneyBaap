<script>
  import Navbar from "./components/Navbar.svelte";
  import RangeSlider from "./components/rangeSliderComponent.svelte"; //레인지 슬라이더 ,라이브러리
  import WordList from "./components/WordList.svelte";
  import { minvlu } from "./store.js";
  import { maxvlu } from "./store.js";
  import { radioValue } from "./store.js";
  import { replace } from "svelte-spa-router";
  import LazyLoad from "@dimfeld/svelte-lazyload";
  import { onMount } from "svelte";
  export const title = "안숭맛춤";

  const options = [
    //라디오 버튼
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

  let searchHint = "남은 메뉴 키워드 : 5/5"; //검색칸 placeholder ..로 기억
  let words = []; // 검색 키워드 저장할 배열
  let searcher = ""; //검색 글자
  let searchButton = "검색";
  let result = []; //실제 html에서 loop돌 결과
  let isCheck = true; // 0원보기 체크바스
  let maxValueForSearch = $maxvlu; // 슬라이더값 20000 설정시, 최대금액 무제한으로 설정하기 위함
  const alt = "noimg.png"; // 이미지 없을때 기본 출력값

  onMount(() => {
    // RADIOVALUE = 학교정보. 선택 안된 상태로 넘어오면 (검색 페이지에서 새로고침시) -> 초기 화면으로
    if ($radioValue.value == undefined) replace("/");
    changeDisplay();
  });

  //promise가 갱신될 때 마다 (어떻게든) 새롭게 서버에서 쿼리보내서 가져오는 느낌
  let onKeyDown = (e) => {
    //엔터키 누르면 검색버튼 함수 자동실행
    switch (e.keyCode) {
      case 13:
        addWord();
    }
  };

  let changeDisplay = () => {
    let see = document.getElementById("see0"); // 0원 보기 체크박스 표시 여부(슬라이더 0에 갖다둬야 표시됨!)

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
      //5개 다 안찼고
      if (searcher.trim() !== "") {
        //공백 입력 아니면
        words.push(searcher);
        words = words;
        modifySearchHint(); //남은 키워드수 갱신
        searchButton = "검색";
        promise = defaultSearch(); //API CALL
      } else {
        promise = defaultSearch();
      }
      document.getElementById("lists").scrollTop = 0; // 스크롤바 맨위로 올려줌
      searcher = "";
    }
  };

  let onHandleDelete = (text) => {
    changeDisplay();
    words = words.filter((element) => element !== text); //word 리스트에서 삭제
    promise = defaultSearch(); // promise에 대입해서 갱신을 알림. 스벨트는 대입문만 해도 업데이트 처리 위해 함수 call됨
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
      isCheck; //쿼리쪽은 API 문서로 올릴게요
    for (let i = 0; i < words.length; i++) {
      query += "&search=" + words[i];
    }
    fetch(query)
      .then((response) => response.json())
      .then((data) => {
        result = [];
        console.log(data);

        backup.push(...data);

        console.log(backup);

        for (let i = 0; i < backup.length; i += 5)
          result.push(backup.slice(i, i + 5)); //이거 해야 LAZYLOAD 정상 작동함.. 이유는 모름...........
        console.log(result);
        backup = [];
      });
  };

  let backup = [];

  let promise = defaultSearch(); //맨 첫 실행
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
            //라디오 버튼에 바인딩 과정
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
                        </slot>
                      </div>
                    </slot>
                  </div>
                </a>
              {/each}
            </LazyLoad>
          {/each}
        </dl>
      </div>
    </div>
  </div>
</section>

<svelte:window on:keydown|prevent_default={onKeyDown} />

<style lang="scss">
  @import "scss/SearchViewCss.scss";
</style>
