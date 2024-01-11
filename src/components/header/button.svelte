<script lang="ts">
	import { createDialog, melt } from '@melt-ui/svelte'
	import { Menu, X } from 'lucide-svelte'
	import { writable } from 'svelte/store'
	import { fade, fly } from 'svelte/transition'
	import MenuContent from './mobile-menu.svelte'

	const open = writable(false)

	const {
		elements: { trigger, overlay, content, close, portalled },
	} = createDialog({ open, forceVisible: true })
</script>

<button
	type="button"
	class="trigger"
	aria-label="Update dimensions"
	use:melt={$trigger}
>
	<Menu class="icon" />
	<span class="sr-only">メニューを開く</span>
</button>

<div class="portal" use:melt={$portalled}>
	{#if $open}
		<div
			use:melt={$overlay}
			class="overlay"
			transition:fade={{ duration: 150 }}
		/>
		<div
			use:melt={$content}
			class="menu safe-area menu-container"
			transition:fly={{ y: 768, duration: 300, opacity: 1 }}
		>
			<button class="trigger close-dialog" use:melt={$close} aria-label="close">
				<X class="icon" />
			</button>

			<MenuContent />
		</div>
	{/if}
</div>

<style>
	.menu {
		@apply !ring-0;
	}

	.safe-area {
		padding-bottom: calc(6.5rem + env(safe-area-inset-bottom));
	}

	.menu-container {
		@apply fixed bottom-0 z-50 h-auto w-full rounded-xl rounded-b-none bg-neutral-100 px-4
				 pt-12 shadow-lg focus:outline-none md:hidden;

		margin-bottom: 1px;
	}

	.trigger {
		@apply my-1  inline-flex items-center justify-center font-medium leading-none text-magnum-900 transition-colors hover:text-magnum-500;
	}

	.portal {
		@apply md:hidden;
	}

	.overlay {
		@apply fixed inset-0 z-50 bg-black/50 backdrop-blur-sm;
	}

	.close-dialog {
		@apply absolute right-4 top-4 z-20;
	}

	.icon {
		width: 24px;
		height: 24px;
	}
</style>
