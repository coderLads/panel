<template>
	<a
		class="w-full h-full bg-white text-center m-0 rounded shadow-md flex flex-col"
		:class="{ shiny: highlight }"
	>
		<p class="text-4xl text-teal-500 mt-4">{{phase}}</p>
		<span class="text-base text-gray-500 mt-1">{{type}}</span>
		<div class="text-sm text-gray-700 mt-1">{{daysUntil}}</div>
	</a>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
	name: "MoonPhase",
	props: {},
	data() {
		return {
			phase: "",
			daysUntil: "",
			type: "",
			timeZone: "America/Los_Angeles",
			highlight: false
			// intervalHolder: 0,
			// delayBetweenUpdates: 5000
		};
	},
	methods: {
		updateTile() {
			const moonPhase: any = {
				0: {
					emoji: "🌑",
					name: "New Moon"
				},
				1: {
					emoji: "🌒",
					name: "Waxing Crescent"
				},
				2: {
					emoji: "🌓",
					name: "First Quarter"
				},
				3: {
					emoji: "🌔",
					name: "Waxing Gibbous"
				},
				4: {
					emoji: "🌕",
					name: "Full Moon"
				},
				5: {
					emoji: "🌖",
					name: "Waning Gibbous"
				},
				6: {
					emoji: "🌗",
					name: "Last Quarter"
				},
				7: {
					emoji: "🌘",
					name: "Waning Crescent"
				},
				8: {
					emoji: "🌑",
					name: "New Moon"
				}
			};
			const synodicMonthConstant: number = 29.530588853;
			const ONEDAY: number = 86400000; // in milliseconds
			const todaysDate: Date = new Date();
			const lastKnownFullMoon: Date = new Date(2019, 9, 27); // October 27th 2019

			const moonAge: number =
				Math.round(
					Math.abs(
						(<any>todaysDate - <any>lastKnownFullMoon) / ONEDAY
					)
				) % synodicMonthConstant;

			let i: number = Math.floor(moonAge / (7.38 / 2));
			i = i > 7 ? i - 7 : i;

			if (this.phase !== moonPhase[i].emoji) {
				this.addShine();
				this.phase = moonPhase[i].emoji;
				this.daysUntil = `${Math.abs(
					Math.ceil(7.38 / 2 - i)
				)} days until ${moonPhase[i + 1].name}`;
				this.type = moonPhase[i].name;
			}
		},
		addShine() {
			this.highlight = true;
			setTimeout(() => {
				this.highlight = false;
			}, 5000);
		}
	},
	created() {
		this.updateTile();
		// this.intervalHolder = setInterval(() => {
		// 	this.updateTile();
		// }, this.delayBetweenUpdates);
	}
	// beforeDestroy() {
	// 	clearInterval(this.intervalHolder);
	// }
});
</script>
