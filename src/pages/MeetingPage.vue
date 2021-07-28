<template>
  <div>
    <b-row>
      <b-col><h5>Meetings Page</h5></b-col>
      <hr>
      <b-col>
        <ul class="nav">
          <li class="nav-item">
            <router-link class="nav-link" :to="{name: 'MeetingList'}" exact>
              View all meetings
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{name: 'MeetingCreate'}" exact>
              Create new meeting
            </router-link>
          </li>
        </ul>
      </b-col>
    </b-row>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'MeetingPage',
  data() {
    return {
      items: [
        {
          text: 'Admin',
          href: '#',
        },
        {
          text: 'Manage',
          href: '#',
        },
        {
          text: 'Library',
          active: true,
        },
      ],
    };
  },
};
</script>
