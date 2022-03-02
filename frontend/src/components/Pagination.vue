<template>
  <div>
    <nav>
      <ul>
        <li>
          <button v-if="page != 1" @click="page--">Previous</button>
        </li>
        <li v-for="pageNumber in pages" :key="pageNumber.index">
          <button
            @click="page = pageNumber"
            :class="pageNumber === page ? 'active' : ''"
          >
            {{ pageNumber }}
          </button>
        </li>
        <li>
          <button v-if="page < pages.length" @click="page++">Next</button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  props: ["usersCount"],
  data() {
    return {
      page: 1,
      perPage: 10,
     
    };
  },

  computed: {
    pages() {
      let numberOfPages = Math.ceil(this.usersCount / this.perPage);
      let pages = [];
      for (let i = 1; i <= numberOfPages; i++) {
        pages.push(i);
      }
      return pages;
    },
  },
  methods: {
    setPages() {
      let numberOfPages = Math.ceil(this.usersCount / this.perPage);
      for (let i = 1; i <= numberOfPages; i++) {
        this.pages.push(i);
      }
    },
    paginate(users) {
      let page = this.page;
      let perPage = this.perPage;
      let from = page * perPage - perPage;
      let to = page * perPage;
      return users.slice(from, to);
    },
  },
};
</script>
