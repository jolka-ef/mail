<script>
import emailsData from './data/emails.json';
import {format} from 'date-fns'
export default {
  name: 'App',
  data(){
    return {emails :emailsData, format}
  },
  computed : {
    sortedEmails(){
      return this.emails.sort((emailA, emailB) => {
        return emailA.sentAt < emailB.sentAt ? 100 : -1
      })
    },
    unarchivedEmails(){
      return this.sortedEmails.filter(email=>!email.archived)
    }
  }

}

</script>
<template>
  <h1>Mail Inbox</h1>
    <table class="mail-table">
      <thead>
        <tr>
          <th scope="col" class="sr-only">Checkbox</th>
          <th scope="col" class="sr-only">From</th>
          <th scope="col" class="sr-only">Email content</th>
          <th scope="col" class="sr-only">Sent at</th>
          <th scope="col" class="sr-only">Archive</th>
        </tr>
    </thead>
    <tr v-for="email in unarchivedEmails"
    :key="email.id"
    :class="['clickable', email.read ? 'read': '']"
    @click="email.read = true"
    >
      <td><input type="checkbox"/></td>
      <td>{{ email.from }}</td>
      <td class="mail-content"> <strong> {{ email.subject }}  </strong> - {{ email.body }} </td>
      <td class="date">

        {{
        format(new Date(email.sentAt), 'MMM dd yyyy')
        }}

      </td>
      <td><button @click="email.archived = true">Archive</button></td>



    </tr>
    
    
    
  </table>
</template>

  
