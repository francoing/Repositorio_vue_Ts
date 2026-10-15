<script setup lang="ts">

    interface Props{
        buttons : FabButton[] 
    }

    interface FabButton {
        icon: string;
        color?: string;
        size?: 'xs'|'sm' | 'md' | 'lg' | 'xl';
        action: () => void
    }

    const props = defineProps<Props>()
   
</script>

<template>
    <div class="fab">
        <!-- <q-btn round color="primary" icon="add" size="lg"/> -->
         <q-btn
            v-for="btn of props.buttons"
            :key="btn.icon"
            round
            :color="btn.color"
            :icon="btn.icon"
            :size="btn.size || 'md'"
            @click="btn.action"
         />
    </div>

</template>



<style scoped>

    .fab {
        position: fixed;
        bottom: 30px;
        right: 30px;
    }


</style>