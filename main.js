import './components/product.js'

new Vue({
	el: "#app",
    data: {
        search: '',
        perPage: 10,
        pageNumber: 0,
        productData: [],
        productChecked: [],
    },
    created:  function() {
        fetch('assets/data/product.json')
            .then(response => response.json())
            .then(data => (this.productData = data))
    },
    computed:{
        currentPageItems() {
            return this.productData.slice(this.pageNumber * this.perPage, this.pageNumber * this.perPage + 1 + this.perPage)
        },
        filteredLists() {
            return this.currentPageItems.filter(item => {
                return item.name.toLowerCase().includes(this.search.toLowerCase()) || item.id.toLowerCase().includes(this.search.toLowerCase())
            })
        },
        handleSelected() {
            if(this.productChecked.length > 0) {
                return true
            } else {
                return false
                
            }
        }
    },
    methods: {
        prev() {
            this.pageNumber--
        },
        next() {
            this.pageNumber++
        },
        handleSave() {
            localStorage.setItem('selectedProducts', JSON.stringify(this.productChecked))
        }
    }
})
