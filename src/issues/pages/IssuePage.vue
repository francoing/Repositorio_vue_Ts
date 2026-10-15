<script setup lang="ts">
import { useRoute } from 'vue-router';
import LoaderSpinner from '@/shared/components/LoaderSpinner.vue';
import IssueCard from '../components/issue-list/IssueCard.vue';
import useIssue from '../composables/useIssue.js';

    const route = useRoute()
    const { id } = route.params

    const {issueQuery, commentsQuery} = useIssue( +id! );

</script>
<template>
    
    <router-link class="text-white" to="/">Back</router-link>

    <LoaderSpinner v-if="issueQuery.isLoading.value" color="white" :thickness="1" size="1.5rem" :show-text="false"/>

    <IssueCard v-else-if="issueQuery.data.value" :issue="issueQuery.data.value" />

    <p v-else> Issue {{ id }} no encontrada </p>
    
    <LoaderSpinner v-if="commentsQuery.isLoading.value" color="white" :thickness="1" size="1.5rem" :show-text="false"/>

    <div v-else-if="issueQuery.data.value" class="col">
        <span class="text-h3 q-mb-md">Comments ({{commentsQuery.data.value?.length || 0}})</span>
        <IssueCard v-for="comment in commentsQuery.data.value" :key="comment.id" :issue="comment"/>
        
    </div>    

</template>
<style scoped>

</style>