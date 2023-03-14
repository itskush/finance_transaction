<script setup land="ts">
const { $event } = useNuxtApp()
const { $toast } = useNuxtApp();
const visible = useState('visible', () => false)
const setClosed = () => { visible.value = !visible.value }

const mutation = gql`
mutation AddCategory($data: CategoryInput!) {
  addCategory(data: $data) {
      name
      color
  }
}
`
const variables = {
  data: {
    id: "",
    name: "",
    color: "",
  }
};

const { mutate: addCategory } = useMutation(mutation, variables);
const createCategory = async () => {
  if (variables.data.name.trim() === "") return;
  try {
    await addCategory(variables);
    variables.data.name = "";
    variables.data.color = "";
    $toast.success('Category added successfully');
	$event('addedCategory')
    setClosed();
  } catch (error) {
    $toast.error('There was an error adding the category, please try again');
  }
};
</script>
<template>
  <div class=" flex justify-center items-center">

    <button @click="setClosed"
      class="focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 focus:outline-none py-2 px-7 bg-gray-800 text-white rounded text-base">Add
      Category</button>
    <div class="modal fixed z-10 overflow-y-auto top-0 w-full left-0 right-0 mt-20" v-if="visible">
      <div class="flex flex-row gap-2 justify-space">
      <header>
        <h4>Add New Category</h4>
      </header>
      </div>
      <div clas="flex flex-row gap-2 justify-space">
      <form>
        <fieldset>

          <label>Name</label>
          <input type="text" class="w-full bg-gray-100 p-2 mt-2 mb-3" v-model="variables.data.name" />
        </fieldset>

        <fieldset>
          <label>Color</label>
          <input type="text" class="w-full bg-gray-100 p-2 mt-2 mb-3" v-model="variables.data.color" />
        </fieldset>

      </form>
     </div>
      <div class="flex flex-row gap-2 justify-space">

        <button type="button" class="btn-primary" @click="setClosed"><i class="fas fa-times"></i> Cancel</button>

        <button type="button" class="btn-primary" @click="createCategory">Add Category</button>

      </div>

    </div>

  </div>
</template>

<style lang="scss" scoped>
.hidden {
  display: none;
}
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
	height: 400px;

	header {
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
		height: 2.5rem;
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
	height: 3rem;
	padding-left: 1rem;
	padding-right: 1rem;
	color: #fff;
	display: flex;
	align-items: center;
	justify-content: center;
	font-weight: 500;
	font-size: 1.125rem;
	background-color: #1b1b1d;
	transition: background-color 0.3s cubic-bezier(0, 0, 0.2, 1);
	border-radius: 0.35rem;
	&:hover {
		background-color: #313134;
	}
}

input {
	width: 1rem;
	margin: 0;
	flex-shrink: 0;
}
</style>