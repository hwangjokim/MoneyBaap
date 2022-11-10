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

<main>
	<div class="bg" alt="no img">
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
</main>

<style>
	main {
		text-align: center;
		/* margin: auto; */
	}
	.slider {
		width: 800px;
		align-content: center;
		padding: 1em;
	}
	.title {
		margin-top: 30px;
		padding-top: 9em;
	}
</style>
