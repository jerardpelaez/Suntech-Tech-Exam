<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="12">
        <h1>Technical Exam - Suntech Investments</h1>
      </v-col>
      <v-col cols="6" class="pt-5">
        <v-card class="mx-auto" variant="outlined">
          <v-card-text>
            <json-forms
              class="form"
              :data="formStore.form"
              :renderers="renderers"
              :schema="schema"
              :uischema="uischema"
              @change="onChange"
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { JsonForms, type JsonFormsChangeEvent } from '@jsonforms/vue'
import { vanillaRenderers } from '@jsonforms/vue-vanilla'

import SubmitButtonRenderer from '@/components/SubmitButtonRenderer.vue'

const renderers = [
  ...vanillaRenderers,
  // use custom submit renderer
  {
    tester: () => true,
    renderer: SubmitButtonRenderer
  }
]

const schema = {
  properties: {
    first_name: {
      title: 'First Name',
      type: 'string'
    },
    last_name: {
      title: 'Last Name',
      type: 'string'
    },
    birthday: {
      title: 'Birthday',
      type: 'string',
      format: 'date'
    },
    email: {
      title: "Email address",
      type: "string",
      pattern: "^\\S+@\\S+\\.\\S+$",
      format: "email"
    }
  },
}

const uischema = {
  type: 'VerticalLayout',
  elements: [
    {
      type: 'Control',
      scope: '#/properties/first_name'
    },
    {
      type: 'Control',
      scope: '#/properties/last_name'
    },
    {
      type: 'Control',
      scope: '#/properties/birthday'
    },
    {
      type: 'Control',
      scope: '#/properties/email',
      rule: {
        effect: "SHOW",
        condition: {
          scope: "#/properties/birthday",
          schema: {
            type: "string",
            format: "date",
          }
        }
      }
    },
    {
      type: 'Control',
      scope: '#/properties/submit',
      options: {
        type: 'custom',
        label: 'Submit',
        renderer: 'SubmitButtonRenderer'
      }
    }
  ]
}

export default defineComponent({
  name: 'HomeView',
  components: { JsonForms, SubmitButtonRenderer },
  data() {
    return {
      schema,
      uischema
    }
  },
})
</script>

<script setup lang="ts">
import { useFormStore } from '@/stores/form';

let formStore = useFormStore();

const onChange = function (event: JsonFormsChangeEvent) {
  formStore.form = event.data;
};

</script>

<style scoped>
/* Styles for the label */
.form:deep(label) {
  margin-top: 1em;
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

/* Styles for the input field */
.form:deep(input) {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-top: 0.3em;
}
</style>
