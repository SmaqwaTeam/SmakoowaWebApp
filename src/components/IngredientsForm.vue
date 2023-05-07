<template>
<div class="flex flex-row gap-5 p-3 border-2 rounded-lg border-orange-500 w-full items-center my-3" v-for="ing in ingredientsList">
    <div class="flex-auto w-1/6 ">
       Recipe {{ ing.ingredientId }}  
    </div>
    <div class="flex-auto w-1/2 ">
      {{ ing.ingredient }}
    </div>
    <div class="flex justify-center items-center h-full">
        <button type="button" class="rounded-lg py-2 px-4 bg-orange-500" @click="deleteingredient(ing.ingredientId)">X</button>
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
            allingredients:[],
            allingredientsEmit:[],
        }
    },
    emits: ["ingredientsdata"],
    mounted(){
        this.sendToParrent();
    },
    methods:{
        sendToParrent(){
            this.$emit("ingredientsdata",this.allingredientsEmit)
        },
        addingredient(){
            this.ingredientsList.forEach(element => {
                this.allingredientsEmit.push({name:element.ingredient,position:element.ingredientId,group:this.ingredientGroupId})
            }) 
            this.ingredientsList.push({ingredient: this.ingredient, ingredientId:this.ingredientId++ })
            this.ingredient =""
            let inglength = this.ingredientsList.length
            for(let i=1; i<=inglength; i++)
            {
                this.ingredientsList[i-1].ingredientId= i
            }
        },
        deleteingredient(id){
            this.ingredientsList = this.ingredientsList.filter(t => {
                return t.ingredientId !== id
            })
            let inglength = this.ingredientsList.length
            for(let i=1; i<=inglength; i++)
            {
                this.ingredientsList[i-1].ingredientId= i
            }
        },
        deleteingredientGroup(id){
            this.allingredients = this.allingredients.filter(t => {
                return t.ingredientGroupId !== id
            })
            let inggrlength = this.allingredients.length
            for(let i=1; i<=inggrlength; i++)
            {
                this.allingredients[i-1].ingredientGroupId= i
            }
        },
    }    
}
</script>