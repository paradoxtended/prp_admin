<script lang="ts">
import type { AdminData } from '$lib/state/admin';

export let admin: AdminData;
export let allPlayers;
</script>

<div class="w-full h-full">
    <div class="w-full h-1/2 flex gap-5">
        <div class="bg-gradient-to-br from-black/50 to-lime-900/20 border border-lime-800 rounded-md w-2/3 h-fit p-5 text-white font-[Inter]">
            <div class="flex justify-between items-center">
                <p class="font-semibold text-lg">Current Players on Server</p>
                <p class="font-bold text-2xl text-lime-400">91</p>
            </div>
            <div class="my-5 flex gap-3 flex-wrap overflow-auto max-h-32">
                <div class="flex items-center gap-4 border border-red-500 w-fit px-3 py-1.5 rounded-lg bg-gradient-to-b from-red-900/50 to-red-500/50">
                    <p class="text-red-300 font-light">Medical</p>
                    <p class="font-bold">3</p>
                </div>
                <div class="flex items-center gap-4 border border-blue-500 w-fit px-3 py-1.5 rounded-lg bg-gradient-to-b from-blue-900/50 to-blue-500/50">
                    <p class="text-blue-300 font-light">Police</p>
                    <p class="font-bold">2</p>
                </div>
                <div class="flex items-center gap-4 border border-yellow-500 w-fit px-3 py-1.5 rounded-lg bg-gradient-to-b from-yellow-900/50 to-yellow-500/50">
                    <p class="text-yellow-100 font-light">DOJ</p>
                    <p class="font-bold">0</p>
                </div>
            </div>
            <div>
                <div onclick={allPlayers} class="bg-neutral-100/15 border border-neutral-400 w-fit rounded-full px-4 py-1.5 cursor-pointer duration-200 hover:border-lime-500 hover:bg-lime-500/10">All Players</div>
            </div>
        </div>
        <div class="bg-gradient-to-br from-black/50 to-lime-900/20 w-1/3 h-full rounded-md border border-lime-800 pt-5 pl-5 pb-5 font-[Inter] text-white">
            <div class="flex justify-between items-center pr-5">
                <p class="font-semibold">Admins Online</p>
                <p class="font-bold text-2xl text-lime-400">{(admin.online?.length || 0) + 1}</p>
            </div>
            <div class="mt-3 flex flex-col gap-3 h-[85%] overflow-auto pr-5">
                <div class="flex justify-between bg-neutral-100/15 px-3 py-2 border border-neutral-400 rounded-lg items-center">
                    <p>{admin.nickname}</p>
                    <p class="bg-lime-950/70 px-2 py-1 font-light text-sm border border-lime-500 rounded-lg">{admin.role.charAt(0).toUpperCase() + admin.role.slice(1)}</p>
                </div>

                {#if admin.online}
                    {#each admin.online as user}
                        <div class="flex justify-between bg-neutral-100/15 px-3 py-2 border border-neutral-400 rounded-lg items-center">
                            <p class="w-1/2 line-clamp-3">{user.nickname}</p>
                            <p class="bg-lime-950/70 px-2 py-1 border font-light text-sm border-lime-500 rounded-lg">{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</p>
                        </div>
                    {/each}
                {/if}
            </div>
        </div>
    </div>
    <div>

    </div>
</div>