<script setup lang="ts">
import useIssue from '@/issues/composables/useIssue';
import { State, type Issue } from '@/issues/interfaces/issue';
import { timeSince } from '@/shared/helpers/time-since';
import { ref, toRefs } from 'vue';
import VueMarkdownRender from 'vue-markdown-render'
import CommentCard from '../comments/CommentCard.vue';
import useComment from '@/issues/composables/useComments';

interface Props {
  issue: Issue
}

// interface Emits{
//     (e : 'showComments' , issueNumber : number): void
// }

const props = defineProps<Props>()
// const emits = defineEmits<Emits>()
const {issue} = toRefs(props)
const {  setIssueCacheData } = useIssue(issue.value.number,{autoload : false})
const isOpen = ref<boolean>(false)

const {commentsQuery} = useComment(issue.value.number,{autoload : false})

const openModal=() => {
    isOpen.value = true
    console.log('hola',isOpen.value)
    
}




</script>


<template>
  <!-- <q-card class="text-black col-12 q-mb-md" flat bordered 
    @mouseenter="prefetchIssue(issue.number)"
  > -->
  <q-card class="text-black col-12 q-mb-md" flat bordered 
    @mouseenter="setIssueCacheData(issue)"
  >
    <q-item>
      <q-item-section avatar>
        <q-avatar>
          <img :src="issue.user.avatar_url" alt="User Avatar">
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label>
          <router-link :to="`/issue/${ issue.number }`">{{issue.title}}</router-link>
        </q-item-label>
        <q-item-label caption>
          {{ timeSince(issue.created_at) }}
        </q-item-label>
      </q-item-section>

      <q-item-section>
        <q-item-label class="row items-center justify-end">
          <q-item-label class="q-mr-md" 
            v-if="issue.comments > 0" 
            @click="openModal "
          >
            <q-icon name="question_answer" />
            {{ issue.comments}}
          </q-item-label>
          <q-chip v-if="issue.state === State.Closed" color="positive" text-color="white" icon="check"> Closed </q-chip>
          <q-chip v-else color="negative" text-color="white" icon="bug_report"> Open </q-chip>
        </q-item-label>

      </q-item-section>
    </q-item>

    <q-separator />

    <q-item-section class="q-pa-md markdown-css">
      <vue-markdown-render :source="issue.body || 'Sin descripción'" />
    </q-item-section>

    <q-separator />

    <q-item-section class="q-pa-xs q-gutter-xs">
      <div>
        <q-chip v-for="label in issue.labels" :key="label.id" :style="{color: `#${label.color}`}" 
            outline  
        >
            {{ label.name }}
        </q-chip>
      </div>
    </q-item-section>

  </q-card>


  <CommentCard
    :is-open="isOpen"
    @on-close="isOpen = false"
    :issue-number="issue.number"
    :issue-title="issue.title"  
    :comments="commentsQuery.data.value || []"
  />

</template>


<style>

    .markdown-css{
      width: 250px !important; 
    }

</style>