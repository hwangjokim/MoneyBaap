<script>
	import RangeSlider from "./components/rangeSliderComponent.svelte";
	import Button from "./components/buttonComponent.svelte";
	import {minvlu} from "./store.js"
	import {maxvlu} from "./store.js"
	let minPrice=0;
	let maxPrice=10000;
</script>
<main>
	<div class=bg alt="no img">
		<div class="title">
		<p>얼마 쓸래?</p>
	</div>
		<div class="slider">
			<RangeSlider bind:$minvlu bind:$maxvlu
			 />
		</div>
		<div style="margin-top: 70px">
		<Button selectPriceRange={true}/>
	</div>
	</div>
</main>

<div class=labels>
	<p1> minPrice = {$minvlu} // </p1>
	<p2> maxPrice = {$maxvlu}</p2>
</div>
<style>
	main{
		text-align:center;
		/* margin: auto; */
	}
	.slider{
		width:800px;
		align-content:center;
		padding:1em;
	}
	.title{
		margin-top: 30px;
		padding-top: 9em;	
	}
	.labels{
		text-align:center;
	} 
</style>