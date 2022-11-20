<script>
    import RangeSlider from "svelte-range-slider-pips";
    import { minvlu } from "../store.js";
    import { maxvlu } from "../store.js";
</script>

<div class="slider">
    <RangeSlider
        float="true"
        step={1000}
        pipstep={5}
        pushy="true"
        range="true"
        min={0}
        max={20000}
        values={[$minvlu, $maxvlu]}
        all="label"
        pips="true"
        on:change={(e) => ($minvlu = e.detail.values[0])}
        on:change={(e) => ($maxvlu = e.detail.values[1])}
    />
<!-- 검색버튼 on click에 fetch로 post 보냄 ex) 첫 밸류는 minvlu, maxvlu가 되고 두번째 밸류는 검색 스트링 형태-->
<!-- LAZY LOAD 추가 (스크롤에 )-->
<!-- 마우스 Hover 추가 및 선택됐을 때 효과 등 -->
<!-- 학교 선택화면, 가격 설정 화면 두 개로 분할-->
</div>

