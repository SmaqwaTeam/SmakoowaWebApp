<script>
import RecipeCard from '../components/RecipeCard.vue';
export default {
    components: {
        RecipeCard
    }
}
</script>


<template>
    <div class="container gap-5 flex flex-wrap justify-between items-center mx-auto">
        <div class="flex">
            <RecipeCard></RecipeCard>
        </div>
        <div class="flex">
            <RecipeCard></RecipeCard>
        </div>
        <div class="flex">
            <RecipeCard></RecipeCard>
        </div>
        <div class="flex">
            <RecipeCard></RecipeCard>
        </div>
        <div class="flex">
            <RecipeCard></RecipeCard>
        </div>
        <div class="flex">
            <RecipeCard></RecipeCard>
        </div>

        

    </div>
</template>