<script setup lang="ts">
const { $event } = useNuxtApp();
const searchFilter = (event : any) => {
    $event("search", event.target.value)
};
</script>

<template>
    <div class="app-container">
        <div class="container">
            <section class="container mx-auto p-6 font-mono">
                <div class="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
                    <div class="w-full overflow-x-auto">

                    </div>
                </div>
            </section>
            <div class="flex flex-col mx-auto">
                <div class="flex flex-col items-left justify-left w-full h-full ">
                    <h1 class="text-left text-3xl font-bold text-gray-800">Transactions</h1>
                </div>
                <div class="flex flex-row mx-auto">
                    <div class="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
                        <div class="grid place-items-center h-full w-12 text-gray-300">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>

                        <input @input="searchFilter($event)" class="peer h-full w-full outline-none text-sm text-gray-700 pr-2" type="text" id="search"
                            placeholder="Search for reference, bank, amount.." />
                    </div>
                </div>
                <!-- Search filters for table -->
               
            </div>
            <TableView />
            <br />
            <footer class="p-4 bg-white  shadow md:px-6 md:py-8 dark:bg-white-900">
                <hr class="my-6 border-gray-200 sm:mx-auto dark:border-black-700 lg:my-8" />
                <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© Financials All Rights
                    Reserved.
                </span>
            </footer>
        </div>

    </div>
</template>

<style scoped>
.container {
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: auto;
    width: 100%;
}
</style>