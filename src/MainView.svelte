<!-- 11/13 commit : npm install 해주세요 -->
<script>
	import RangeSlider from "./components/rangeSliderComponent.svelte";
	import Button from "./components/buttonComponent.svelte";
	import { minvlu } from "./store.js";
	import { maxvlu } from "./store.js";
	import {radioValue} from "./store.js";
	export const title = "안숭맛춤";

	
	const options = [
		{
			value: "seouls",
			label: "서울대학교",
		},
		{
			value: "contacts",
			label: "숭실대학교",
		},
		{
			value: "caus",
			label: "중앙대학교",
		},
	];
	$radioValue = options[1]; 
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

		<div class="university">
			{#each options as option}
				<label class="radio">
					<input
						type="radio"
						bind:group={$radioValue}
						name="foobar"
						value={option}
					> {option.label}
				</label>
			{/each}
		</div>

		<div>
			<Button selectPriceRange={true} />
		</div>
	</div>
</section>

<style lang="scss">
	@import "scss/MainViewCss.scss";
</style>
