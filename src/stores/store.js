import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";

// const baseUrl = "https://hexashop-production.up.railway.app";
const baseUrl = "http://localhost:3000";

export const useStore = defineStore("index", {
  state() {
    return {
      registered: false,
      isLogin: false,
      products: [],
      product: {},
      loading: true,
      quote: "",
      city: [],
      shipment: [],
    };
  },
  actions: {
    async register(input) {
      try {
        await axios.post(`${baseUrl}/register`, input);

        this.router.push("/login");
        this.registered = true;
        Swal.fire({
          title: "Congrats...",
          text: this.quote,
          imageUrl: "https://cataas.com/cat/cute/says/lest%20gooow!",
          imageHeight: 200,
        });
      } catch (err) {
        Swal.fire({
          title: "Oops...",
          imageUrl: "https://cataas.com/cat/cute/says/Oops...",
          imageHeight: 200,
          text: err.response.data.msg,
        });
      }
    },
    async login(input) {
      try {
        const { data } = await axios.post(`${baseUrl}/login`, input);

        this.isLogin = true;
        this.router.push("/");
        localStorage.setItem("access_token", data.access_token);
        Swal.fire({
          title: "Congrats...",
          text: this.quote,
          imageUrl: "https://cataas.com/cat/cute/says/wellcome%20baybeh",
          imageHeight: 200,
        });
      } catch (err) {
        Swal.fire({
          title: "Oops...",
          imageUrl: "https://cataas.com/cat/cute/says/Oops...",
          imageHeight: 200,
          text: err.response.data.msg,
        });
      }
    },
    async googleLogin(input) {
      try {
        const { data } = await axios.post(
          `${baseUrl}/googleLogin`,
          {},
          {
            headers: {
              google_token: input,
            },
          }
        );

        this.router.push("/");
        localStorage.setItem("access_token", data.access_token);
        this.isLogin = true;
        Swal.fire({
          title: "Congrats...",
          text: this.quote,
          imageUrl: "https://cataas.com/cat/cute/says/have%20a%20nice%20day!",
          imageHeight: 200,
        });
      } catch (err) {
        Swal.fire({
          title: "Oops...",
          imageUrl: "https://cataas.com/cat/cute/says/Oops...",
          imageHeight: 200,
          text: err.response.data.msg,
        });
      }
    },
    async readProducts() {
      try {
        const { data } = await axios.get(`${baseUrl}/products`);

        this.loading = false;
        this.products = data;
      } catch (err) {
        Swal.fire({
          imageUrl: "https://cataas.com/cat/cute/says/Oops...",
          imageHeight: 200,
          title: "Oops...",
          text: "Error Fetch Data!",
        });
      }
    },
    async readDetailProduct(productCode) {
      try {
        this.product = this.products.filter((el) => {
          if (el.articles[0].code === productCode) {
            return el;
          }
        });

        this.router.push(`/products/${productCode}`);
        this.loading = false;
      } catch (err) {
        Swal.fire({
          imageUrl: "https://cataas.com/cat/cute/says/Oops...",
          imageHeight: 200,
          title: "Oops...",
          text: "Error Fetch Data!",
        });
      }
    },
    async handleQuotes() {
      try {
        const { data } = await axios.get(`${baseUrl}/quotes`);

        this.quote = data;
      } catch (err) {
        Swal.fire({
          imageUrl: "https://cataas.com/cat/cute/says/Oops...",
          imageHeight: 200,
          title: "Oops...",
          text: "Error Quotes Data!",
        });
      }
    },
    async getRajaOngkirCity() {
      try {
        const { data } = await axios.get(`${baseUrl}/orders/city`, {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        });

        this.city = data;
      } catch (err) {
        Swal.fire({
          imageUrl: "https://cataas.com/cat/cute/says/Oops...",
          imageHeight: 200,
          title: "Oops...",
          text: "Error Fetch Data!",
        });
      }
    },
    async postRajaOngkirCost(input) {
      try {
        const { data } = await axios.post(
          `${baseUrl}/orders/cost`,
          {
            origin: 445,
            destination: input,
            weight: 1000,
            courier: "jne",
          },
          {
            headers: {
              access_token: localStorage.getItem("access_token"),
            },
          }
        );

        this.shipment = data;
      } catch (err) {
        Swal.fire({
          imageUrl: "https://cataas.com/cat/cute/says/Oops...",
          imageHeight: 200,
          title: "Oops...",
          text: "Error Fetch Data!",
        });
      }
    },
    async addOrder(id, input) {
      try {
        const { data } = await axios.post(
          `${baseUrl}/orders/${id}`,
          {
            destination: input,
            price: 120000,
          },
          {
            headers: {
              access_token: localStorage.getItem("access_token"),
            },
          }
        );

        console.log(data);
      } catch (err) {
        Swal.fire({
          imageUrl: "https://cataas.com/cat/cute/says/Oops...",
          imageHeight: 200,
          title: "Oops...",
          text: "Something error!",
        });
      }
    },
    async readAllOrders(id, input) {
      try {
        const { data } = await axios.get(`${baseUrl}/orders`, {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        });

        console.log(data);
      } catch (err) {
        Swal.fire({
          imageUrl: "https://cataas.com/cat/cute/says/Oops...",
          imageHeight: 200,
          title: "Oops...",
          text: "Something error!",
        });
      }
    },
  },
  getters: {},
});
