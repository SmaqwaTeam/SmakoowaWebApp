<template>
    <div class="flex flex-row rounded-lg items-center justify-center bg-orange-400 w-fit p-2">
            <button @click="pushToTagPage(tag.id)" type="button" class="rounded-lg bg-orange-500 w-fit p-2" > {{ tag.name }} </button> 
    </div>
</template>
<script>
export default{
    name:'UserTag',
    props:{
        tag: Object
    },
    methods:{
        pushToTagPage(id)
        {
            this.$router.push('/tags')
        }
    }
}
</script>