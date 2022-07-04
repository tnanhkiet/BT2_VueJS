import "./components/product.js"

new Vue({
  el: "#app",
  data: {
    search: "",
    pageNumber: 1,
    productsData: [],
    productsChecked: [],
    filteredLists: []
  },
  created: function () {
    fetch("assets/data/product.json")
      .then((response) => response.json())
      .then((data) => (this.productsData = data))
  },
  computed: {
    productsShow() {
      this.searchedProducts = this.productsData.filter((item) => {
        return (
          item.name.toLowerCase().includes(this.search.toLowerCase()) ||
          item.id.toLowerCase().includes(this.search.toLowerCase())
        )
      })
      return this.searchedProducts.slice(10 * (this.pageNumber - 1), 10 * this.pageNumber)
    },
    handleSelected() {
      if (this.productsChecked.length > 0) {
        return true
      } else {
        return false
      }
    },
  },
  mounted() {
    this.productsChecked = this.getProductsLocal()
  },
  methods: {
    sortedList(e) {
      if (e.target.value == "1") {
        this.productsData.sort((n1, n2) => {
          let a = n1.name.toLowerCase()
          let b = n2.name.toLowerCase()
          return a === b ? 0 : a > b ? 1 : -1
        })
      } else {
        this.productsData.reverse()
      }
    },
    prev() {
      if(this.pageNumber > 1) {
        this.pageNumber--
      }
    },
    next() {
      if (this.pageNumber < Math.ceil(this.searchedProducts.length / 10)) {
        this.pageNumber++
      }
    },
    handleSave() {
      localStorage.setItem(
        "selectedProducts",
        JSON.stringify(this.productsChecked)
      )
    },
    getProductsLocal() {
      return JSON.parse(localStorage.getItem("selectedProducts")) || []
    },
  },
})
