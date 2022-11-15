import { writable, derived } from "svelte/store";

export const apiData = writable([]);
export const placeName = writable([]);
export const placeLink = writable([]);



export const places = derived(apiData, ($apidata) => {
    if ($apidata.food) {
        
        return $apidata.food.map(place => place);
    }
    return [];
});
