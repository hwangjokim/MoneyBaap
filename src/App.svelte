<script>
	import RangeSlider from "svelte-range-slider-pips";
	import Button from "./buttonComponent.svelte";
	
	let vls = [0,10000]
	let minPrice=0;
	let maxPrice=0;
</script>

<main>
	<h1>안숭맛춤</h1>
	<h2>얼마 쓸래?</h2>
	<div class=slider>
		<RangeSlider bind:minPrice bind:maxPrice
			float 
			step={1000}
			pipstep={5}
			pushy=true
			range values={vls}
			min={0} max={20000}
			all='label'
			pips
			on:change={(e)=>minPrice=e.detail.values[0]}
			on:change={(e)=>maxPrice=e.detail.values[1]}/>
	</div>
	<Button selectPriceRange={true}/>
</main>

<div class=labels>
	<p1> minPrice = {minPrice} // </p1>
	<p2> maxPrice = {maxPrice}</p2>
</div>

<style>
	main{
		text-align:center;
		padding:4em;
		margin:0 auto;
	}
	.slider{
		padding:4em;
	}
	h2{
		padding:2em;
	}
	.labels{
		text-align:center;
	}
</style>