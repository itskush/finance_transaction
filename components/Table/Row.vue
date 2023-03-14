<script setup lang="ts">
const { transaction } = defineProps(["transaction"]);
const formatDate = (date: string) => {
    const d = new Date(date)
    return d.toLocaleDateString();
};

const route = useRouter();

const handleTransactionClick = (id: string) => {
    route.push(`/transaction/${id}`)
}

</script>
<template>
    <tr class="text-gray-700" @click="handleTransactionClick(transaction.id)">
        <td class="px-4 py-3 border">
            <div class="flex items-center text-sm">
                <div>
                    <p class="font-semibold">{{ transaction.reference ? transaction.reference : 'No reference' }}</p>
                </div>
            </div>
        </td>
        <td class="px-4 py-3 border text-xs">
            <span class="px-2 py-2 border font-semibold leading-tight text-black rounded-sm"
                :style="{ 'background-color': '#' + transaction.category?.color }">{{ transaction.category?.name }} </span>
        </td>
        <td class="px-4 py-3 border text-sm"> {{ formatDate(transaction.date) }}</td>
        <td class="px-4 py-3 border text-md font-semibold text-left"> {{ transaction.amount + ' ' + transaction.currency }}</td>
    </tr>
</template>

<style></style>
