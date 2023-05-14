<template>
<div class="flex flex-row gap-5 p-3 border-2 rounded-lg border-orange-500 w-full items-center my-3" v-for="ing in ingredientsList">
    <div class="flex-auto w-1/6 ">
        Ingredient {{ ing.position }}  
    </div>
    <div class="flex-auto w-1/2 ">
      {{ ing.name }}
    </div>
    <div class="flex justify-center items-center h-full">
        <button type="button" class="rounded-lg py-2 px-4 bg-orange-500" @click="deleteingredient(ing.position)">X</button>
    </div> 
    
</div>    
<div class="flex flex-row my-5 gap-2 items-center">
    <div class="flex-auto w-1/2 border-2  border-orange-300 ">
        <input class="w-full border-orange-400 focus:border-orange-500 outline-none" type="text" v-model="ingredient" placeholder="Add another ingredient">
    </div>
    <div class=" flex-auto">
        <button  type="button" @click="addingredient" class=" rounded-lg  p-2 bg-orange-400" > Add</button>
    </div>
    
</div>
</template>
<script>
export default {
    name:'IngredientsForm',
    data(){
        return{
            ingredient: "",
            ingredientId:1,
            ingredientGroupId:1,
            ingredientsList:[],
        }
    },
    props: {
        propingredients: Array 
    },
    emits: ["ingredientsdata"],
    mounted(){
        this.sendToParrent();
    },
    created(){
        if(this.propingredients != null)
        {
            this.ingredientsList = this.propingredients
        }
    },
    methods:{
        sendToParrent(){
            this.$emit("ingredientsdata",this.ingredientsList)
        },
        addingredient(){
            this.ingredientsList.push({name: this.ingredient, position:this.ingredientId++,group:this.ingredientGroupId })
            this.ingredient =""
            let inglength = this.ingredientsList.length
            for(let i=1; i<=inglength; i++)
            {
                this.ingredientsList[i-1].position= i
            }
        },
        deleteingredient(id){
            this.ingredientsList = this.ingredientsList.filter(t => {
                return t.position !== id
            })
            let inglength = this.ingredientsList.length
            for(let i=1; i<=inglength; i++)
            {
                this.ingredientsList[i-1].position= i
            }
        },
    }    
}
</script>