<script>
	import RangeSlider from "./components/rangeSliderComponent.svelte";
	import Button from "./components/buttonComponent.svelte";
	
	let minPrice=0;
	let maxPrice=0;
</script>

<main>
	<div class=bg alt="no img">
		<h2>얼마 쓸래?</h2>
		<div class=slider>
			<RangeSlider bind:minPrice bind:maxPrice/>
		</div>
		<Button selectPriceRange={true}/>
	</div>
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
		width:800px;
		align-content:center;
		padding:1em;
	}
	h2{
		padding:8.5em;
	}
	.labels{
		text-align:center;
	}
</style>