<script setup lang="ts">
</script>

<template>
    <div class="app-container">
        <div class="container  bg-gray-200">
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
            </div>
            <TableView />
            <br />
            <footer class="p-4 bg-white  shadow md:px-6 md:py-8 dark:bg-white-900">
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
    min-width: 100%;
    min-height: 100%;
}
</style>