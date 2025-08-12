<script lang="ts">
	const appsArr = ['App 1', 'App 2', 'App 3']
</script>

<h2 class="logo-text">
	<a href="/"> 鴨川デジタル相談所 </a>
</h2>
<div class="list">
	<div class="item">制作事例</div>
	<div class="item">
		<a href="/about"> 鴨川デジタル相談所について</a>
	</div>
</div>
<a href="/lab"><h3 class="menu-header">ミニアプリ</h3></a>
<div class="list">
	{#each appsArr as app}
		<div class="item">
			{app}
		</div>
	{/each}
</div>

<style lang="scss">
	%item {
		@apply relative flex h-6  min-h-[24px] items-center rounded-sm text-base;
		@apply z-20 text-magnum-900 outline-none ring-0;
		@apply select-none leading-none;
	}

	.item {
		@extend %item;
		@apply pl-6 pr-1;
	}

	.logo-text {
		@extend %item;
		@apply mb-6 pl-3 text-base text-neutral-700;

		font-weight: 500;
	}

	.menu-header {
		@apply mb-3 pl-3 text-lg text-neutral-700;

		font-weight: 500;
	}

	.list {
		@apply mb-6 flex flex-col space-y-2 last:mb-0;
	}
</style>
