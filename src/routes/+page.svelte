<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="+page">Homepage</div>
<div data-user>
	{JSON.stringify(data, null, 2)}
</div>

<style lang="pcss">
</style>
