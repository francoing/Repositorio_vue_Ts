<script setup lang='ts'>
import { ref, watch } from 'vue';
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import useIssueMutation from '../composables/useIssueMutation.js';

interface Props{
    isOpen: boolean,
    labels : string[]
}

interface Emits{
    (e : 'onClose'): void
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()

const isDialogOpen   =ref<boolean>(true)
const title          =ref<string>('')
const body           =ref<string>('')
const selectedLabels =ref<string[]>([])

const {issueMutation} = useIssueMutation()

watch(props , ()=>{
    isDialogOpen.value= props.isOpen
})

watch(()=> issueMutation.isSuccess.value , (isSuccess)=>{

    if(isSuccess){
        title.value=''
        body.value=''
        selectedLabels.value=[]

        issueMutation.reset()

        emits('onClose')
        
    }
})

    

</script>

<template>
    <div class="q-pa-md q-gutter-sm">
       <q-dialog v-model="isDialogOpen" position="bottom" persistent>
            <q-card style="width: 500px;">
                <q-form @submit="issueMutation.mutate({title, body, labels: selectedLabels})">

                    <q-linear-progress :value="1" color="primary"/>
                    <q-card-section class="column no-wrap">
                        <div>
                            <div class="text-weight-bold">Nueva issue</div>
                            <div class="text-grey">Crear nueva issue con labels</div>
                        </div>
                        
                        <q-space />

                        <div>
                            <q-input 
                                dense 
                                filled 
                                v-model="title" 
                                label="Title" 
                                placeholder="Title" 
                                class="q-mb-sm"
                                :rules="[val=> !!val || 'Campo requerido']"
                                :disable="issueMutation.isPending.value"
                            />

                            <q-select
                                dense
                                v-model="selectedLabels"
                                multiple
                                :options="props.labels"
                                label="Labels"
                                use-chips
                                stack-label
                                class="q-mb-sm"
                                :disable="issueMutation.isPending.value"
                            />

                             <MdEditor v-model="body" placeholder="# Markdown"  language="en-US"/>



                        </div>
                    </q-card-section>

                    <q-card-actions align="left">
                        <q-btn 
                            label="Cancelar"
                            color="dark"
                            flat
                            v-close-popup
                            @click="emits('onClose')"
                        />

                        <q-space/>

                        <q-btn 
                            label="Guardar"
                            color="dark"
                            flat
                            type="submit"
                        />
                    </q-card-actions>

                </q-form>
                
            </q-card>
        
       </q-dialog>
            
    </div>
</template>



<style scoped>

</style>