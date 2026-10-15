
<script setup lang="ts">
import LoaderSpinner from '@/shared/components/LoaderSpinner.vue';
import FilterSelector from '../components/filter-selector/FilterSelector.vue';
import IssueList from '../components/issue-list/IssueList.vue';
import useIssues from '../composables/useIssues.js';
import FloatingButtons from '../components/FloatingButtons.vue';
import NewIssueDialog from '../components/NewIssueDialog.vue';
import { ref } from 'vue';
import useLabels from '../composables/useLabels.js';


const {issuesQuery} = useIssues()
const { labelsQuery} = useLabels()

const isOpen = ref<boolean>(false)

const openModal=() => {
    isOpen.value = true
}


    
</script>
<template>
    <div class="row q-mb-md">
        <div class="col-12">
            <span class="text-h4">List Page</span>
            
        </div>

        <div class="row">
            <div class="col-xs-12 col-md-4">
                <FilterSelector />    
            </div>
            <div class="col-xs-12 col-md-8">
                <LoaderSpinner v-if="issuesQuery.isLoading.value" />
                <IssueList v-else :issues="issuesQuery.data?.value || []" />
            </div>
        </div>
        
    </div>


    <!-- FloatingBotton -->

    <FloatingButtons :buttons="[
        
            {
                icon: 'add',
                color: 'primary',
                size: 'md',
                action: openModal
            }
        ]"
    />

    <NewIssueDialog 
    v-if="labelsQuery.data && isOpen"
    :is-open = "isOpen" 
    :labels="labelsQuery.data.value?.map(label => label.name) || []" 
    @on-close="isOpen = false"/>

    

</template>
<style scoped>

</style>