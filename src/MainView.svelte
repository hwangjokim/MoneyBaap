<!-- 11/13 commit : npm install 해주세요 -->

<script>
	import RangeSlider from "./components/rangeSliderComponent.svelte";
	import Button from "./components/buttonComponent.svelte";
	import { minvlu } from "./store.js";
	import { maxvlu } from "./store.js";
	export const title="안숭맛춤"
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<section class="hero" style="width: auto;">
	<div class="bg" alt="no img">
		
		<div class="logo">
		<img class="img" src="/logo.png" alt="Logo" />
		</div>
		<div class="title">
			<p>얼마 쓸래?</p>
		</div>
		<div class="slider">
			<RangeSlider bind:$minvlu bind:$maxvlu />
		</div>
		<div style="margin-top: 70px">
			<Button selectPriceRange={true} />
		</div>
	</div>
</section>


<style lang="scss">
	
	@import "scss/MainViewCss.scss"
	

	
</style>
