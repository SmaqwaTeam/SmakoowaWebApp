<template>
<div class=" my-5">
    <div class="inline-block bg-orange-300 w-full" v-for="inst in instructionsList">
    <h1>Instruction {{ inst.position }}</h1>
        <p>
            {{ inst.content }} 
        </p>
    <button type="button" @click="deleteInstrcution(inst.position)">X</button>
</div>    
<div>
    <input type="text" v-model="instruction" placeholder="Add another instruction">
    <button type="button" @click="addInstruction" class="bg-orange-300" > Add instruction</button>
</div>
</div>    

</template>
<script>
export default {
    name:'InstructionsForm',
    data(){
        return{
            instruction: "",
            instructionId:1,
            instructionsList:[],
        }
    },
    emits: ["instructionsdata"],
    mounted(){
        this.sendToParrent()
    },
    methods:{
        addInstruction(){
            this.instructionsList.push({content: this.instruction, position:this.instructionId++ })
            this.instruction =""
            let instlength = this.instructionsList.length
            for(let i=1; i<=instlength; i++)
            {
                this.instructionsList[i-1].position= i
            }
        },
        deleteInstrcution(id){
            this.instructionsList = this.instructionsList.filter(t => {
                return t.position !== id
            })
            let instlength = this.instructionsList.length
            for(let i=1; i<instlength; i++)
            {
                this.instructionsList[i-1].position= i
            }
        },
        sendToParrent(){
            this.$emit("instructionsdata",this.instructionsList)
        }
    }    
}
</script>