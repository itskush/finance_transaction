<script setup>
// import { useQuery } from '@vue/apollo-composable'
// import { gql } from "@apollo/client/core"
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
let filtered = {}
const fetchMoreTransactions = async () => {
    variables.limit += 20;
    await refresh(variables)
    await disableButton();
}

const disableButton = () => {
    if (tempLength < data.value?.getTransactions.length) {
        tempLength = data.value?.getTransactions.length
    } else {
        console.log("there's no more data");
        disabledButton = true;
    }
}
//To do filter
// $listen("search", (filterText) => {
//     filtered = data.value?.getTransactions.filter((innerArray) => {
//         let values = Object.values(innerArray);
//         console.log(values)
//         for (let i = 0; i < values.length; i++) {
//             if (values.indexOf(filterText) > -1) {
//                 return innerArray;
//             }
//         }
//         //    if(values.includes(filterText)){
//         //         return innerArray
//         //    }
//     });
//     // console.log(filtered)
//     if (filtered.length > 0) {
//         data.value.getTransactions = filtered;
//     }

// });

</script>
<template>
    <div class="flex justify-center flex-col mx-auto items-center">
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
                    <TableRow v-for="transaction in  data.getTransactions" :reference="transaction.reference"
                        :id="transaction.id" :category="transaction.category ? transaction.category.name : ' '"
                        :currency="transaction.currency" :color="transaction.category ? transaction.category.color : ''"
                        :amount="transaction.amount" :date="transaction.date" />
                </tbody>
            </table>
        </div>
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-40"
            :class="{ setAsDisabled: disabledButton }" @click="fetchMoreTransactions()">
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
</style>