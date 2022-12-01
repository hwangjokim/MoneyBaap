<script>
  import Navbar from "./components/Navbar.svelte";
  import RangeSlider from "./components/rangeSliderComponent.svelte";
  import WordList from "./components/WordList.svelte";
  import { apiData, places } from "./apis/api.js";
  import { minvlu } from "./store.js";
  import { maxvlu } from "./store.js";
  import LazyLoad from "@dimfeld/svelte-lazyload";
  //Todo 20000원인거 초과로 ㄱ
  //스크롤 해걀 ㄱㄱ
  //최고가순으로 정렬하기 : X
  //버튼 눌렀을 때 갱신시키기 : O
  export const title = "안숭맛춤";

  let searchHint = "남은 메뉴 키워드 : 5/5";
  let words = [];
  let searcher = "";
  let searchButton = "검색";
  let result = [];
  let isCheck = true;
  let orderFlag = 0;
  const alt = "noimg.png";
  //promise가 갱신될 때 마다 (어떻게든) 새롭게 서버에서 쿼리보내서 가져오는 느낌 
  let onKeyDown = (e) => {
    switch (e.keyCode) {
      case 13:
        addWord();
    }
  };

  let modifySearchHint = () => {
    searchHint = "남은 메뉴 키워드 : " + (5 - words.length) + "/5";
  };
// promise가 새로운 갱신의 역할
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
      else{
        promise = doReset();
      }
      document.getElementById("lists").scrollTop = 0;
      searcher = "";
    }
  };

  let onHandleDelete = (text) => {
    words = words.filter((element) => element !== text);
    promise = doReset(); // promise에 대입해서 갱신을 알림
    modifySearchHint();
  };

  // 최저가순:0, 최고가순:1 정렬 바꾸기
  let onChangeOrder = () =>{
    console.log(orderFlag)
    if (orderFlag == 1){
      orderFlag = 0;
    }
    else if(orderFlag == 0){
      orderFlag = 1;
    }
    promise=doReset();
    document.getElementById("lists").scrollTop = 0;
  }
/* 
doReset 함수 : 키워드를 삭제할 때 마다 호출되는 함수 
*/
  let doReset = () => {
    
    backup = [];
    if (words.length == 0) defaultSearch(); // 키워드를 모두 지웠다면, 모든 메뉴 검색 
    else {
      for (let k = 0; k < words.length; k++) { //키워드가 남아있다면, 순회하며 검색함
        fetch(
          "http://ec2-15-165-107-63.ap-northeast-2.compute.amazonaws.com/lowPrice?search=" +
            words[k]
        ) // backend 레포에서, RestAPI 폴더로 cd 한 뒤 node app.js해서 백 서버 로컬에서 실행해야 작동함
          .then((response) => response.json())
          .then((data) => {
            result = []; // result는 10개식 짤라서 ㄹㅇㄹㅇㄹㅇ 보여줄 배열
            apiData.set(data); 
            backup.push(...$places); //백업은  result의 자르기 전 버전 

            backup.sort(function (first, second) { // 백업 배열에서, 가격을 낮은 순서로 정렬해줌
              return first.price - second.price;
            });
            backup = backup.filter( //중복 제거 (메뉴 이름과 가게이름 같을경우 컷)
              (value, index, self) =>
                index ===
                self.findIndex(
                  (t) =>
                    t.placeName === value.placeName && t.name === value.name
                )
            );
            
            if(orderFlag==1)
              backup.reverse();

              console.log({orderFlag})
            tempForView = backup.filter( //tempForView = 백업 배열에서, 가격 범위가 지정된 배열. 얘가 result에 10개단위로 썰려서 들어감
              (place) =>
                parseInt(place.price) >= $minvlu &&
                parseInt(place.price) <= $maxvlu
            );
            for (let i = 0; i < tempForView.length; i += 10) //result에 10개씩 잘라서 담아줌
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
      "http://ec2-15-165-107-63.ap-northeast-2.compute.amazonaws.com/lowPrice?search=" +
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
        if(orderFlag==1)
            backup.reverse();
          console.log({orderFlag})

        tempForView = backup.filter(
          (place) =>
            parseInt(place.price) >= $minvlu && parseInt(place.price) <= $maxvlu
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
    fetch(
      "http://ec2-15-165-107-63.ap-northeast-2.compute.amazonaws.com/lowPrice?search="
    ) // backend 레포에서, RestAPI 폴더로 cd 한 뒤 node app.js해서 백 서버 로컬에서 실행해야 작동함
      .then((response) => response.json())
      .then((data) => {
        // console.log(data)
        result = [];
        apiData.set(data);
        backup.push(...$places);
        backup = backup.filter(
          (place) =>
            parseInt(place.price) >= $minvlu && parseInt(place.price) <= $maxvlu
        );

        if(orderFlag==1)
          backup.reverse();
        
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
        <label class="radio">
          <input type="radio" name="foobar" checked on:change={onChangeOrder}/>
          최저가순
        </label>
        <label class="radio">
          <input type="radio" name="foobar" on:change={onChangeOrder}/>
          최고가순
        </label>

        <label class="checkbox" style="margin-left: 0.5em;">
          <input type="checkbox" bind:checked={isCheck} />
          0원 표시하기!
        </label>
      </div>

      <div class="listOfPlace" id="lists" >
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
                              
                                <dt>{place.placeName} </dt>
                                {#if place.star != null}
                                <dd>★ : {place.star}</dd>
                                {:else}
                                <de>&nbsp;</de>
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
                              <dt>{place.placeName} </dt>
                              {#if place.star != null}
                                <dd>★ : {place.star}</dd>
                                {:else}
                                <de>△</de>
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
