Vue.component('product-item', {
    props: {
        id: String,
        name: String,
        image: String,
        price: String,
        value: Array
    },
    template: `
       <div class="product-item">
            <div class="product-description">
                <input type="checkbox" class="product-checkbox" :value="id" v-model="model"/>
                <img :src="image" class="product-img" alt="" />
                <div class="product-text">
                    <p class="product-name">{{name}}</p>
                    <p class="product-id">{{id}}</p>
                </div>
            </div>
            <div class="item-price">\${{price}}</div>
        </div>
    `,
    computed: {
        model: {
          get() {
            return this.value;
          },
          set(value) {
            this.$emit("input", value);
          },
        },
    },
})