

<script setup lang="ts">
import { toRef } from 'vue';

    
interface Props {
    size?: string,
    color?: string,
    thickness?: number,
    showText?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    size: '3rem',
    color: 'primary',
    thickness: 2,
    showText: true
});

const color = toRef(props, 'color');
const size = toRef(props, 'size');
const thickness = toRef(props, 'thickness');
const showText = toRef(props, 'showText');
    
</script>


<template>
    <div class="column items-center">
        <q-spinner :color="color" :size="size" :thickness="thickness" />
        <span v-if="showText" class="q-mt-sm">Loading...</span>
    </div>
</template>

<style scoped>

</style>