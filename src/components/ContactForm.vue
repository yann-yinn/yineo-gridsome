<template>
  <div>
    <h1 class="title">Contact</h1>
    <h2
      v-if="requestStatus !== 'FINISHED_ERROR' && requestStatus !== 'FINISHED_OK'"
      class="subtitle"
    >Besoin de mes services ? Envoyez moi un mail avec votre demande !</h2>

    <template v-if="requestStatus === 'FINISHED_OK'">
      <div>
        <div class="message is-success">
          <div
            class="message-body"
          >Merci, votre mail a bien été envoyé, je vous recontacte au plus vite 👍</div>
        </div>
        <div>
          <em>{{inputs.message}}</em>
        </div>
      </div>
    </template>

    <template v-if="requestStatus === 'FINISHED_ERROR'">
      <div>
        <div class="message is-danger">
          <div
            class="message-body"
          >Excusez-moi pour ce désagrément, mais une erreur est survenue pendant l'envoi du message et le mail n'a pas pu être envoyé 😞
            <br>
            {{requestError}}
          </div>
        </div>
        <div>
          <em>{{inputs.message}}</em>
        </div>
      </div>
    </template>

    <template v-if="requestStatus !== 'FINISHED_OK' && requestStatus !== 'FINISHED_ERROR'">
      <form @submit.prevent="onSubmit">
        <div v-show="errors.length > 0" class="message is-danger">
          <div class="message-body">
            <div v-for="(error, index) in errors" :key="index">{{error.message}}</div>
          </div>
        </div>
        <div class="field">
          <label class="label">Votre email</label>
          <div class="control">
            <input
              type="email"
              class="input"
              v-model="inputs.email"
              :class="{'is-danger': getError('email')}"
            >
          </div>
        </div>
        <div class="field">
          <label class="label">Votre message</label>
          <div class="control">
            <textarea
              v-model="inputs.message"
              class="textarea"
              :class="{'is-danger': getError('message')}"
            ></textarea>
          </div>
        </div>
        <input
          class="button is-primary"
          :disabled="requestStatus === 'PENDING'"
          type="submit"
          :value=" requestStatus === 'PENDING' ? 'envoi en cours': 'Envoyer'"
        >
      </form>
    </template>
    <div>
      <div class="section content">
        <p>
          <strong>✉️ yann@yineo.fr</strong>
          <br>☎️ 06 32 70 37 58
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { sendMail } from '@/services/sendgrid'
export default {
  data() {
    return {
      inputs: {
        email: '',
        message: '',
        nom: ''
      },
      errors: [],
      requestStatus: 'NOT_STARTED',
      requestError: null,
      formAlreadySubmitted: false
    }
  },
  methods: {
    formValidate() {
      this.errors = []
      if (!this.inputs.email.trim()) {
        this.errors.push({
          id: 'email',
          message: 'Le champ email est vide 😱 '
        })
      }
      if (!this.inputs.message.trim()) {
        this.errors.push({
          id: 'message',
          message: "Il n'y a pas de message 😭"
        })
      } else if (this.inputs.message.length < 5) {
        this.errors.push({
          id: 'message',
          message: 'Le message semble trop court 🤔'
        })
      }
    },
    getError(id) {
      return this.errors.find(e => e.id === id)
    },
    onSubmit() {
      this.requestError = null
      this.formAlreadySubmitted = true
      this.formValidate()
      if (this.errors.length > 0) {
        return
      }
      this.requestStatus = 'PENDING'
      const message = {
        subject: 'Formulaire de contact',
        to: process.env.CONTACT_FORM_TO,
        email: this.inputs.email,
        message: this.inputs.message
      }
      if (process.env.CONTACT_FORM_CC) {
        message.cc = process.env.CONTACT_FORM_CC
      }
      sendMail({
        subject: 'Formulaire de contact',
        to: process.env.CONTACT_FORM_TO,
        email: this.inputs.email,
        message: this.inputs.message
      })
        .then(r => {
          this.requestStatus = 'FINISHED_OK'
        })
        .catch(e => {
          console.log('e', e)
          this.requestStatus = 'FINISHED_ERROR'
          this.requestError = e.message
        })
    }
  },
  // les erreurs affichées par le formulaire doivent s'effacer
  // dès que l'utilisateur a entrer quelque chose de correct.
  watch: {
    inputs: {
      deep: true,
      handler: function() {
        if (this.formAlreadySubmitted) {
          this.formValidate()
        }
      }
    }
  }
}
</script>