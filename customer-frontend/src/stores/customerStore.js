// customerStore.js
import { defineStore } from 'pinia'
import axios from 'axios'

export const useCustomerStore = defineStore('customer', {
  state: () => ({
    customers: [],
    currentPage: 1,
    totalPages: 0,
    total: 0,
    sortBy: 'id',
    sortOrder: 'asc',
    perPage: 30
  }),
  actions: {
    async fetchCustomers({ page, sortBy, sortOrder, perPage }) {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/customers', {
          params: { page, sortBy, sortOrder, perPage }
        })

        this.customers = response.data.data
        this.currentPage = response.data.current_page
        this.totalPages = response.data.last_page
        this.total = response.data.total
        this.sortBy = sortBy
        this.sortOrder = sortOrder
        this.perPage = perPage
      } catch (error) {
        console.error('Failed to fetch customers:', error)
      }
    }
  },
  getters: {
    getCustomers: (state) => state.customers
  }
})
