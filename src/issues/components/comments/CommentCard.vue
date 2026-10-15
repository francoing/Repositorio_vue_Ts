<script setup lang="ts">
 import useComment from '@/issues/composables/useComments';
import { ref, watch } from 'vue'
import type { Comment } from '@/issues/interfaces/comments';
import { timeSince } from '@/shared/helpers/time-since';
import VueMarkdownRender from 'vue-markdown-render'
import LoaderSpinner from '@/shared/components/LoaderSpinner.vue';


interface Props{
    isOpen: boolean,
    issueNumber: number
    issueTitle: string
    comments: Comment[]
}

interface Emits{
    (e : 'onClose'): void
}

const isDialogOpen = ref<boolean>(false)
const props        = defineProps<Props>()
const emits        = defineEmits<Emits>()

const {commentsQuery} = useComment(props.issueNumber,{autoload : false})

watch(props , ()=>{
    isDialogOpen.value= props.isOpen
    // if(props.isOpen) prefetchComments(props.issueNumber)
})


</script>

<template>
    <q-dialog v-model="isDialogOpen" persistent>
      <q-card class="comments-dialog">
        <q-card-section class="q-pb-sm">
          <div class="text-h6 ellipsis">
            <span class="text-grey-6">#{{ issueNumber }}</span> {{ issueTitle }}
          </div>
          <div class="text-caption text-grey-7">
            <q-icon name="question_answer" class="q-mr-xs" />
            {{ comments.length }} {{ comments.length === 1 ? 'comentario' : 'comentarios' }}
          </div>
        </q-card-section>

        <q-separator />

        <q-card-section class="comments-list scroll">
            <LoaderSpinner
              v-if="commentsQuery.isLoading.value" 
              color="black" 
              :thickness="1" 
              size="1.5rem"
              :show-text="false"
            />
          <div v-if="comments.length === 0" class="text-grey-6 text-center q-py-lg">
            Todavía no hay comentarios
          </div>

          <div v-for="comment in props.comments" :key="comment.id" class="q-mb-lg">
            <div class="row items-center no-wrap q-mb-sm">
              <q-avatar size="32px" class="q-mr-sm">
                <img :src="comment.user.avatar_url" :alt="comment.user.login">
              </q-avatar>
              <span class="text-weight-medium">{{ comment.user.login }}</span>
              <span class="text-caption text-grey-6 q-ml-sm">{{ timeSince(comment.created_at) }}</span>
            </div>

            <div class="comment-body">
              <VueMarkdownRender :source="comment.body || '_Sin contenido_'" />
            </div>
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn flat label="Close" color="primary" @click="emits('onClose')" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
</template>

<style scoped>
.comments-dialog {
  width: 600px;
  max-width: 90vw;
}

/* la lista scrollea y el título y los botones quedan fijos */
.comments-list {
  max-height: 60vh;
}

/* recuadro tipo GitHub, alineado con el nombre (debajo del avatar) */
.comment-body {
  margin-left: 40px;
  padding: 8px 12px;
  background: #f6f8fa;
  border: 1px solid #e1e4e8;
  border-radius: 8px;
  overflow-wrap: anywhere;
}

/* el markdown lo genera otro componente: :deep() para que el estilo scoped le llegue */
.comment-body :deep(p:last-child) {
  margin-bottom: 0;
}

.comment-body :deep(img) {
  max-width: 100%;
}
</style>

