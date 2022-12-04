import { writable, derived } from "svelte/store";

export const apiData = writable([]);
export const placeName = writable([]);
export const placeLink = writable([]);



export const places = derived(apiData, ($apidata) => {
    if ($apidata.menus) {
        return $apidata.menus;
    }
    return [];
});
    