<script setup lang="ts">
interface Transaction {
    id: string
    reference: string
    category: string
    date: string
    amount: string
    currency: string
    color: string
}

const props = defineProps<Transaction>()
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
    <tr class="text-gray-700" @click="handleTransactionClick(id)">
        <td class="px-4 py-3 border">
            <div class="flex items-center text-sm">
                <div>
                    <p class="font-semibold">{{ reference ? reference : 'No reference' }}</p>
                </div>
            </div>
        </td>
        <td class="px-4 py-3 border text-xs">
            <span class="px-2 py-2 border font-semibold leading-tight text-black rounded-sm"
                :style="{ 'background-color': '#' + color }">{{ category }} </span>
        </td>
        <td class="px-4 py-3 border text-sm"> {{ formatDate(date) }}</td>
        <td class="px-4 py-3 border text-md font-semibold text-left"> {{ amount + ' ' + currency }}</td>
    </tr>
</template>

<style></style>
