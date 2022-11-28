<script>
  import Navbar from './components/Navbar.svelte'
  import RangeSlider from './components/rangeSliderComponent.svelte'
  import WordList from './components/WordList.svelte'
  import { onMount } from 'svelte'
  import { apiData, places } from './apis/api.js'
  import { minvlu } from './store.js'
  import { maxvlu } from './store.js'
  import {radioValue} from './store.js'
  import {useLazyImage as lazyImage} from 'svelte-lazy-image'
  import LazyLoad from '@dimfeld/svelte-lazyload';

  export const title = 'Search View'
  let searchHint = '남은 메뉴 키워드 : 5/5'
  let words = []
  let searcher = ''
  let searchButton = '검색'
  const alt = 'noimg.png'

  let modifySearchHint = () => {
    searchHint = '남은 메뉴 키워드 : ' + (5 - words.length) + '/5'
  }
  let addWord = () => {
    if (words.length < 5) {
      if (searcher.trim() !== '') {
        words.push(searcher)
        words = words
        modifySearchHint()
        searchButton = '검색'
        doFetch();  
      }
      searcher = ''
    }
  }

  let onHandleDelete = (text) => {
    words = words.filter((element) => element !== text)
    modifySearchHint()
  }

  onMount(async () => {
    fetch('http://ec2-15-165-107-63.ap-northeast-2.compute.amazonaws.com/lowPrice?search=') // backend 레포에서, RestAPI 폴더로 cd 한 뒤 node app.js해서 백 서버 로컬에서 실행해야 작동함
      .then((response) => response.json())
      .then((data) => {
        // console.log(data)
        apiData.set(data)
        console.log($places)
      })
      .catch((error) => {
        console.log(error)
        return []
      })
  })

  let doFetch = (async () => {
    fetch('http://ec2-15-165-107-63.ap-northeast-2.compute.amazonaws.com/lowPrice?search='+words[0]) // backend 레포에서, RestAPI 폴더로 cd 한 뒤 node app.js해서 백 서버 로컬에서 실행해야 작동함
      .then((response) => response.json())
      .then((data) => {
        // console.log(data)
        apiData.set(data)
        console.log($places)
      })
      .catch((error) => {
        console.log(error)
        return []
      })
  })

  let gridCount = () => {}
</script>

<style lang="scss">
  @import 'scss/SearchViewCss.scss';
</style> 

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
              bind:value={searcher} />
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
      </div>

      <div class="listOfPlace">
      
          <dl>
            <!-- {#each $places as place}
                <dt>{place.name}  ★ : {place.star} | {place.locate}</dt>
                        {#each place.menus as menu_list}
                            <dd>{menu_list[0]}, {menu_list[1]}</dd>
                            <!-- <img src={menu_list[2]}  alt="img"> -->

            {#each $places as place}
                <LazyLoad>
                <!-- <div class="container"> -->
                <a href={place.link} target="_blank" rel="noreferrer">
                <div class="box" >
                  <slot>
                    <div class="pic">
                      {#if place.imgUrl !== null}
                        <img data-src={place.imgUrl} use:lazyImage />
                      {:else}
                        <img data-src={alt} use:lazyImage/>
                      {/if}
                      

                    </div>
                    <div class="menuInfo">
                      <slot>
                        <div class=m_name style="font-weight:bold">{place.name} </div>
                        <ds>{place.price}원 </ds>
                        <dt>{place.placeName}   |   ★ : {place.star}</dt>
                      </slot>
                    </div>
                  </slot>
                </div>
                <!-- </div> -->
                </a>
                
              
              </LazyLoad>
            {/each}
          </dl>
      </div>
    </div>
  </div>
</section>