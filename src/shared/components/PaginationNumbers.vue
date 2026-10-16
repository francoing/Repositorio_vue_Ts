<script setup lang="ts">



    interface Props {
        totalPageNumbers: number[]
        currentPage: number
        totalPages: number
    }

    const props = defineProps<Props>()
    const emit = defineEmits<{ (e:'changePage', page: number): void }>()
    
</script>

<template>
    <div>
        <button 
            :disabled="props.currentPage === 1"
            @click="emit('changePage', props.currentPage - 1)"
            >Anterior</button>
            <button 
            v-for="number in props.totalPageNumbers"
            :key="number"
            :class="{active: props.currentPage === number}"
            @click="emit('changePage', number)"
        >
            {{ number }}
        </button>
        <button 
            :disabled="props.currentPage === props.totalPages"
            @click="emit('changePage', props.currentPage + 1)"
        >
            Siguiente
        </button>
    </div>
</template>


<style scoped>

    div{
        margin-top: 10px;
    }
    button{
        background-color: transparent;
        border-radius:5px;
        border:1px solid var(--color-border);
        color: var(--color-text);
        cursor:pointer;
        margin-right: 5px;
        padding:10px;
        transition: all .5s;
    }

    button:hover{
        background-color: hsl(160, 100%, 37%, 0.2);
        transition: all .5s;
    }

    .active{
        background-color: hsl(160, 100%, 37%, 0.2);
    }

</style>