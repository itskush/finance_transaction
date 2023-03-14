<script setup lang="ts">
const { $listen } = useNuxtApp()
const editVisible = useState('editVisible', () => false)
const setClosed = () => { editVisible.value = !editVisible.value }
const route = useRoute()
const { $event } = useNuxtApp();
const { $toast } = useNuxtApp();
const mutation = gql`
mutation UpdateTransaction($data: TransactionInput!) {
  updateTransaction(data: $data) {
      id
  }
}
`
const query = gql`
query  {
  getCategories {
	id
	name
  }
}
`

const categorySelected = {
	data: {
		id: route.params.id,
		categoryId: "",
	}
};

const { data, refresh } = useAsyncQuery(query);
const { mutate: editTransaction } = useMutation(mutation, categorySelected);

const updateTransaction = async () => {
	if (categorySelected.data.categoryId.trim() === "") return;
	try {
		await editTransaction(categorySelected);
		categorySelected.data.categoryId = "";
		$toast.success('Udpated transaction category successfully');
		$event('updatedTransaction')
		setClosed();
	} catch (error) {
		$toast.error('There was an error updating the transaction, please try again');
	}
}

$listen('addedCategory',() => {
	refresh()
});
</script>
<template>
	<div>

		<button
			class="focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 focus:outline-none py-2 px-7 bg-gray-800 text-white rounded text-base hover:bg-black"
			@click="setClosed">Edit</button>

		<div class="modal fixed z-10 overflow-y-auto top-0 w-full left-0 right-0 mt-20" v-if="editVisible">

			<header>

				<h4>Update Transaction Category</h4>

			</header>

			<form>

				<fieldset>

					<label>Select Category</label>

					<select v-model="categorySelected.data.categoryId">

						<option v-for="category in data.getCategories" :value="category.id">{{ category.name }}</option>

					</select>

				</fieldset>

			</form>

			<div class="flex flex-row gap-2 justify-space">

				<button type="button"
					class="btn-primary focus:outline-none py-2 px-7 bg-gray-800 text-white rounded text-base hover:bg-black"
					@click="setClosed"><i class="fas fa-times"></i> Cancel</button>

				<button type="button"
					class="btn-primary focus:outline-none py-2 px-7 bg-gray-800 text-white rounded text-base hover:bg-black"
					@click="updateTransaction">Update Transaction</button>

			</div>

		</div>

	</div>
</template>

<style lang="scss" scoped>
.modal {
	margin: auto;
	margin-top: 10rem;
	width: 600px;
	justify-content: space-between;
	flex-direction: column;
	display: flex;
	border-radius: 2rem;
	padding: 3rem;
	background: #fff;
	box-shadow: 0 20px 25px -5px rgb(0 0 0 / 10%), 0 10px 10px -5px rgb(0 0 0 / 4%);
	height: 300px;

	header {
		height: 0;

		h4 {
			font-size: 1.5rem;
			font-weight: 500;
			color: #12262b;
		}
	}
}

fieldset {
	&.two {
		display: grid;
		grid-template-columns: 0.5fr 0.5fr;
		gap: 2rem;
	}

	.item {
		display: flex;
		flex-direction: column;
	}

	label {
		display: block;
		font-weight: 500;
		color: #12262b;
		font-size: 0.875rem;
		line-height: 1.5rem;
		margin-bottom: 0.25rem;
		text-transform: uppercase;
	}

	input,
	select {
		flex-grow: 1;
		appearance: none;
		padding-left: 1rem;
		width: 100%;
		font: inherit;
		color: rgba(18, 38, 43, 1);
		padding-right: 1rem;
		font-size: 0.875rem;
		border-radius: 0.75rem;
		line-height: 2.5rem;
		border: 1px solid #e2e8f0;
		transition: 0.3s cubic-bezier(0, 0, 0.2, 1);
		box-shadow: 0;
		outline: none;
		color: #59646b;

		&:focus {
			border-color: #0b42c3;
			box-shadow: 0 0 0 3px rgba(#05299e, 0.3);
		}

		&::placeholder {
			color: #59646b;
		}
	}

	&+& {
		margin-top: 2rem;
	}
}

select {
	background-position: center right 1rem;
	background-repeat: no-repeat;
	background-size: 1.1rem;
	background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='none' d='M0 0h24v24H0z'/%3E%3Cpath d='M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z'/%3E%3C/svg%3E");
}

* {
	box-sizing: border-box;
}

p {
	a {
		color: #0b42c3;
	}
}

a {
	text-decoration: none;
}



.btn-primary {
	width: 100%;
	padding-left: 1rem;
	padding-right: 1rem;
	color: #fff;
	display: flex;
	align-items: center;
	justify-content: center;
	font-weight: 500;
	font-size: 1.125rem;
	transition: background-color 0.3s cubic-bezier(0, 0, 0.2, 1);

	&:hover {
		background-color: #454546;
	}
}

input {
	width: 1rem;
	margin: 0;
	flex-shrink: 0;
}</style>