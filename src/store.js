import {writable} from 'svelte/store';
export let minvlu = writable(1000);
export let maxvlu = writable(10000);
export let radioValue = writable({});
