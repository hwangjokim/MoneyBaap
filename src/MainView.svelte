<script>
	import RangeSlider from "./components/rangeSliderComponent.svelte";
	import Button from "./components/buttonComponent.svelte";
	
	let minPrice=0;
	let maxPrice=0;
</script>
<main>
	<div class=bg alt="no img">
		<div class="title">
		<p>얼마 쓸래?</p>
	</div>
		<div class=slider>
			<RangeSlider />
		</div>
		<div style="margin-top: 70px">
		<Button selectPriceRange={true}/>
	</div>
	</div>
</main>

<!-- <div class=labels>
	<p1> minPrice = {minPrice} // </p1>
	<p2> maxPrice = {maxPrice}</p2>
</div> -->
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
	/* .labels{
		text-align:center;
	} */
</style>