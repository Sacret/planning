<template>
  <v-container>
    <v-layout row wrap>
      <template>
        <template v-for="(user, key) in users">
          <v-flex xs2 v-if="user.uid">
            <User :userName="user.userName" :uid="user.uid" :userKey="key" :isOwner="isOwner"></User>
            <EstimationBlock :userName="user.userName" :uid="user.uid"></EstimationBlock>
          </v-flex>
        </template>
        <TaskResult></TaskResult>
        <TaskForm :isOwner="isOwner"></TaskForm>
        <TaskStepper></TaskStepper>
      </template>
      <template>
        <v-flex xs12 justify-center>If you want to join this planning please log in!</v-flex>
        <v-flex xs12 md4 offset-md4>
          <LoginForm></LoginForm>
        </v-flex>
      </template>
    </v-layout>
  </v-container>
</template>

<script>
import { user, plannings } from '@/mocks/mockData.json';
import _find from 'lodash/find';
import User from '@/components/User';
import EstimationBlock from '@/components/EstimationBlock';
import LoginForm from '@/components/LoginForm';
import TaskResult from '@/components/TaskResult';
import TaskForm from '@/components/TaskForm';
import TaskStepper from '@/components/TaskStepper';

export default {
  name: 'planning',
  components: { User, EstimationBlock, LoginForm, TaskResult, TaskForm, TaskStepper },
  data: () => ({
    isOwner: false,
  }),
  computed: {
    userName() {
      return this.$store.state.userName;
    },
    uid() {
      return this.$store.state.uid;
    },
    plannings() {
      return plannings;
    },
  },
  watch: {
    userName() {
      this.checkUid();
    },
  },
  methods: {
    checkUid() {
      const isUserInArray = _find(this.users, { uid: this.uid });
      if (this.userName && !isUserInArray) {
        this.users.push({
          uid: this.uid,
          userName: this.userName,
        });
      }
    },
  },
  // beforeCreate() {
  created() {
    if (user) {
      this.$store.commit('saveUserId', { uid: user.uid });
      const planningId = this.$route.params.id;
      if (planningId) {
        this.planning = this.plannings[planningId];
        this.isOwner = user.uid === this.planning.uid;
        this.$store.commit('savePlanningTitle', { planningTitle: this.planning.title });

        this.users = this.planning.users;
        this.checkUid();
      }
    }
  },
};
</script>
