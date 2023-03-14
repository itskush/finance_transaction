<script setup>
const { $toast } = useNuxtApp();

const query = gql`
query GetTransactions($offset: Int!, $limit: Int!) {
  getTransactions(offset: $offset, limit: $limit) {
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
    offset: 0,
    limit: 20
}
let { data, error, refresh } = await useAsyncQuery(query, variables)

let tempLength = data.value?.getTransactions.length;
let disabledButton = false;
let filtered = ref(data.value.getTransactions);
const searchText = ref(null);

const fetchMoreTransactions = async () => {
    variables.limit += 20;
    await refresh(variables)
    await disableButton();
}


const disableButton = () => {
    if (tempLength < data.value?.getTransactions.length) {
        tempLength = data.value?.getTransactions.length
    } else {
       $toast.warning("There's no more data");
        disabledButton = true;
    }
}

watch(searchText, (nextSearcn, oldValue) => {
    filtered.value = data.value?.getTransactions.filter(transaction => {
        for (const key in transaction) {
            if (transaction[key]?.toString().toLowerCase().includes(nextSearcn.toLowerCase())) {
                return transaction;
            }
        }
    });
});

watch(data, async (newData, oldValue) => {
    filtered.value = newData.getTransactions;
});

</script>
<template>
    <div class="flex justify-center flex-col mx-auto items-center">
        <div class="flex flex-col mx-auto my-3.5 w-80">
                <div class="flex flex-row mx-auto min-w-full">
                    <div class="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
                        <div class="grid place-items-center h-full w-12 text-gray-300">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>

                        <input v-model="searchText" class="peer h-full w-full outline-none text-sm text-gray-700 pr-2" type="text" id="search"
                            placeholder="Search for reference, bank, amount.." />
                    </div>
                </div>
            </div>
        <div class="min-height">
            <div class="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
            <table class="w-full">
                <thead>
                    <tr
                        class="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                        <th class="px-4 py-3">Reference</th>
                        <th class="px-4 py-3">Category</th>
                        <th class="px-4 py-3">Date</th>
                        <th class="px-4 py-3">Amount</th>
                    </tr>
                </thead>
                <tbody class="bg-white">
                    <TableRow v-for="transaction in  filtered"  :transaction="transaction" />
                </tbody>
            </table>
        </div>
        </div>
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-40"
            :class="{ 'setAsDisabled' : disabledButton  }" @click="fetchMoreTransactions()">
            Load more
        </button>
    </div>
</template>

<style scoped>
.setAsDisabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
    transition: opacity 0.5s ease-in-out;
}
.min-height{
    min-height: 400px;
}
</style>