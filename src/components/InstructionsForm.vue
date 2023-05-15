<template>
  <div class="flex flex-col gap-2 my-5">
    <div
      class="flex flex-row gap-5 p-3 border-2 rounded-lg border-orange-500 w-full items-center"
      v-for="inst in instructionsList"
    >
      <h1 class="flex-auto w-1/6">Instruction {{ inst.position }}</h1>
      <p class="flex-auto w-1/2">
        {{ inst.content }}
      </p>
      <div class="flex justify-center items-center h-full">
        <button
          type="button"
          class="rounded-lg py-2 px-4 bg-orange-500"
          @click="deleteInstrcution(inst.position)"
        >
          X
        </button>
      </div>
    </div>
    <div class="my-5 flex flex-row gap-2 items-center">
      <div class="flex-auto border-2 border-orange-300">
        <input
          class="w-full focus:border-orange-500 outline-none"
          type="text"
          v-model="instruction"
          placeholder="Add another instruction"
        />
      </div>
      <div class="flex-auto">
        <button
          type="button"
          @click="addInstruction"
          class="bg-orange-300 rounded-lg p-1"
        >
          Add instruction
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'InstructionsForm',
  data () {
    return {
      instruction: '',
      instructionId: 1,
      instructionsList: []
    }
  },
  props: {
    propinstructions: Array
  },
  emits: ['instructionsdata'],
  mounted () {
    this.sendToParrent()
  },
  created () {
    if (this.propinstructions != null) {
      this.instructionsList = this.propinstructions
    }
  },
  methods: {
    addInstruction () {
      this.instructionsList.push({
        content: this.instruction,
        position: this.instructionId++
      })
      this.instruction = ''
      const instlength = this.instructionsList.length
      for (let i = 1; i <= instlength; i++) {
        this.instructionsList[i - 1].position = i
      }
    },
    deleteInstrcution (id) {
      this.instructionsList = this.instructionsList.filter((t) => {
        return t.position !== id
      })
      const instlength = this.instructionsList.length
      for (let i = 1; i < instlength; i++) {
        this.instructionsList[i - 1].position = i
      }
    },
    sendToParrent () {
      this.$emit('instructionsdata', this.instructionsList)
    }
  }
}
</script>
