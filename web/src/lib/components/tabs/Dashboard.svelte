<script lang="ts">
import type { AdminData } from '$lib/state/admin';

export let admin: AdminData;
</script>

<div class="outline h-full overflow-auto overflow-x-hidden">
    <p class="text-white p-5">Welcome, {admin.nickname}, you are an <span class="text-red-500">{admin.role}</span></p>
</div>