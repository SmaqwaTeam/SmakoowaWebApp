<template>
    <div class=" flex flex-col border-1 bg-slate-400 my-2" v-for="inggroup in allingredients">
        <p> Group {{ inggroup.ingredientGroupId }} 
        <button type="button " @click="deleteingredientGroup(inggroup.ingredientGroupId)"> DELETE GROUP</button>
        </p>
        <div class="bg-slate-200" v-for="ing in inggroup.ingredientGroup">
            {{ ing.ingredient }}
        </div>
    </div>
<div class="inline-block bg-orange-300 w-full" v-for="ing in ingredientsList">
    {{ ing.ingredient }} {{ ing.ingredientId }}
    <button type="button" @click="deleteingredient(ing.ingredientId)">X</button>
</div>    
<div>
    <input type="text" v-model="ingredient" placeholder="Add another ingredient">
    <button type="button" @click="addingredient" class="bg-orange-400" > Add</button>
    <button type="button" @click="addingredientgroup" class="bg-orange-700"> Add group</button>
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
        addingredientgroup(){
            this.ingredientsList.forEach(element => {
                this.allingredientsEmit.push({name:element.ingredient,position:element.ingredientId,group:this.ingredientGroupId})
            }) 
            this.allingredients.push({ingredientGroup:this.ingredientsList,ingredientGroupId:this.ingredientGroupId++})
            
            this.ingredientsList = []
            this.ingredientId = 1
        }


    }    
}
</script>