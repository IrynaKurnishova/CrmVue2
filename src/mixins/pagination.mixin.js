import _ from "lodash";
export default {
  data() {
    return {
      page: +this.$route.query.page || 1, //страница по дефолту
      pageSize: 5, //размер страницы в 5 элементов
      pageCount: 0, //нет никаких страниц по умолчанию
      allItems: [], //все данные с сервера
      items: [], //данные которые необходимо показывать
    };
  },
  methods: {
    pageChangeHandler(page) {
      this.$router.push(`${this.$route.path}?page=${page}`);
      this.items = this.allItems[page - 1] || this.allItems[0];
    },
    setupPagination(allItems) {
      this.allItems = _.chunk(allItems, this.pageSize);
      this.pageCount = _.size(this.allItems);
      this.items = this.allItems[this.page - 1] || this.allItems[0];
    },
  },
};
