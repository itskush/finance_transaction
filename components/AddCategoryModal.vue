<!-- Using mutation has issues currently with nuxt/apollo see https://github.com/nuxt-modules/apollo/issues/444-->

<!-- <script setup land="ts">
const visible = useState('visible', () => false)

const setClosed = () => { visible.value = !visible.value }

let categories = ref(null);
const query = gql`
mutation AddCategory($data: CategoryInput!) {
  addCategory(data: $data) {
      id
      name
      color
  }
}
`
const variables = {
  name: "",
  color: "",
};


const { mutate: addCateogry } = useMutation(query, variables.value);

const createCategory = async () => {

if (variables.value.name.trim() === "") return;
try {
  // call addComment function to add comment
  const { data } = await addCateogry(variables.value);

  // add new comment to comments array
  categories.value.push(data.addComment.commentEdge.node);

  // reset variables comment body
  variables.value.name = "";
  variables.value.color = "";
  console.log(variables.value);
} catch (error) {
  console.log({ error });
}

};
</script>
<template>
 <div class="relative flex justify-center items-center">
 
 <button @click="setClosed" class="focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 focus:outline-none py-2 px-7 bg-gray-800 text-white rounded text-base hover:bg-black">Add Category</button>

 <div class="fixed z-10 overflow-y-auto top-0 w-full left-0 mt-40" v-if="visible">
  <div class="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0">
    <div class="fixed inset-0 transition-opacity">
      <div class="absolute inset-0 bg-gray-900 opacity-75" />
    </div>
    <span class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
    <div class="inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
      <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <label>Name</label>
        <input type="text" class="w-full bg-gray-100 p-2 mt-2 mb-3"  v-model= "variables.name" />
        <label>Color</label>
        <input type="text" class="w-full bg-gray-100 p-2 mt-2 mb-3"  v-model= "variables.color" />
      </div>
      <div class="bg-gray-200 px-4 py-3 text-right">
        <button type="button" class="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-700 mr-2" @click="setClosed"><i class="fas fa-times"></i> Cancel</button>
        <button type="button" class="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700 mr-2" @click="createCategory"><i class="fas fa-plus"></i> Add</button>
      </div>
    </div>
  </div>
</div>
</div>
</template>

<style>
.hidden{
    display: none;
}
</style> -->