<script setup>
const route = useRoute();
const query = gql`
query SingleTransaction($singleTransactionId: String) {
  singleTransaction(id: $singleTransactionId) {
            id
            reference
            date
            amount
            currency
            account {
            name
            }
            category {
                color
                name
            }
        }
    }
`
const variables = {
    singleTransactionId: route.params.id
}
const { data } = await useAsyncQuery(query, variables)

const router = useRouter();

const goBack = () => {
    router.push(`/`)
}
</script>
<template>
    <div class="app-container">
        <div class="container">

            <body class="antialiased bg-gray-200 font-sans">
                <div class="max-w-6xl mx-auto">
                    <div class="flex flex-col items-center justify-center min-h-screen">
                        <button @click="goBack" class="z-10 p-3 bg-gray-100 rounded-full shadow-md animate-bounce mx-auto">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2" d="m10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                        </button>
                        <div class="max-w-sm w-full sm:w-1/2 lg:min-w-max py-6 px-3">
                            <div class="bg-white shadow-xl rounded-lg overflow-hidden">
                                <div class="p-4">
                                    <p class="uppercase tracking-wide text-2xl  font-bold text-gray-700"> Account : {{
                                        data.singleTransaction.account.name }}</p>
                                    <p class="text-base text-gray-900 "> Amount: <span class="font-bold">{{
                                        data.singleTransaction.amount + ' ' +
                                        data.singleTransaction.currency }}</span></p>
                                    <p class="text-gray-700 italic">Date: {{ new
                                        Date(data.singleTransaction.date).toDateString() }}</p>
                                </div>
                                <div class="flex flex-col p-4 border-t border-gray-300 text-gray-700">
                                    <div class="flex-1 inline-flex items-center">
                                        <p> Reference: <span class="text-gray-900 font-bold">{{
                                            data.singleTransaction.reference ? data.singleTransaction.reference : 'No
                                                                                        Reference'}} </span></p>
                                    </div>
                                    <br />
                                    <div class="flex-1 inline-flex items-center">
                                        <p>Category: <span
                                                class="text-gray-900 font-bold px-2 py-2 border font-semibold leading-tight text-black rounded-sm"
                                                :style="{ 'background-color': '#' + data.singleTransaction.category?.color }">{{
                                                    data.singleTransaction.category?.name ?
                                                    data.singleTransaction.category?.name : 'No Categories' }}</span></p>
                                    </div>
                                </div>
                                <div
                                    class="px-4 pt-3 pb-4 border-t border-gray-300 bg-gray-100 flex flex-row justify-center">
                                    <button
                                        class="font-bold py-2 px-4 rounded w-40 bg-blue-200 hover:bg-blue-100 text">Edit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </body>
        </div>

    </div>
</template>

<style scoped>
/* Arrow Styling */
.backArrow {
    font-size: 25px;
    line-height: 25px;

    width: 1em;
    height: 1em;
    padding: 6px;

    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    transform: rotate(180deg);

    color: white;
    border: 2px solid white;
    border-radius: 50%;

    -webkit-touch-callout: none;
    -khtml-user-select: none;
}

.backArrow:hover {
    background: rgba(255, 255, 255, .5);
}

.backArrow:active {
    position: relative;
    right: 2px;
}</style>