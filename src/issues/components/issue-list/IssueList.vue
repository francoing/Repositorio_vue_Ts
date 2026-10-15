<script setup lang="ts">
    import IssueCard from './IssueCard.vue';
    import type { Issue } from '@/issues/interfaces/issue';

    interface Props{
        issues: Issue[]
    }

    const props = defineProps<Props>()

    
</script>
<template>
    <div class="row q-gutter-md">
        <IssueCard v-for="issue of props.issues" :key="issue.id" :issue="issue" />
    </div>

</template>
<style scoped>

</style>