<template>
  <div class="q-pa-md">
    <h4 class="text-center">Customer Table</h4>
    <q-table
      :rows="customers"
      :columns="columns"
      row-key="id"
      :pagination="pagination"
      :loading="loading"
      :rows-per-page-options="[30]"
      class="my-sticky-header-table"
      flat
      bordered
    >
      <!-- @request="onRequest" -->
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
            class="text-white"
            @click="onSort(col.name)"
          >
            {{ col.label }}
            <q-icon
              :name="getSortIcon(col.name)"
              class="q-ml-sm"
              size="sm"
              v-if="col.name !== 'score'"
            />
          </q-th>
        </q-tr>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td v-for="col in props.cols" :key="col.name" :props="props">
            <template v-if="col.name === 'score'">
              <div class="row items-center">
                <ScoreChart :score="props.row.score" />
                <span class="q-ml-sm">{{ props.row.score }}%</span>
              </div>
            </template>
            <template v-else>
              {{ props.row[col.field] }}
            </template>
          </q-td>
        </q-tr>
      </template>
    </q-table>

    <div class="row justify-center q-mt-md">
      <q-pagination
        v-model="pagination.page"
        :max="totalPages"
        :max-pages="5"
        boundary-links
        direction-links
        @update:model-value="onPaginationChange"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { useCustomerStore } from '../stores/customerStore'
import ScoreChart from '../components/ScoreChart.vue'

const $q = useQuasar()
const store = useCustomerStore()

const loading = ref(false)
const pagination = ref({
  sortBy: 'id',
  descending: false,
  page: 1,
  rowsPerPage: 30,
  rowsNumber: 0
})

const columns = [
  { name: 'id', required: true, label: 'ID', align: 'left', field: 'id', sortable: false },
  { name: 'first_name', align: 'left', label: 'FIRST NAME', field: 'first_name', sortable: false },
  { name: 'last_name', align: 'left', label: 'LAST NAME', field: 'last_name', sortable: false },
  { name: 'email', align: 'left', label: 'EMAIL ADDRESS', field: 'email', sortable: false },
  { name: 'score', align: 'left', label: 'SCORE', field: 'score', sortable: false }
]

const customers = computed(() => store.getCustomers)
const totalPages = computed(() => store.totalPages)

const getSortIcon = (columnName) => {
  if (pagination.value.sortBy !== columnName) return 'arrow_upward'
  return pagination.value.descending ? 'arrow_downward' : 'arrow_upward'
}

const onSort = (columnName) => {
  console.log('onSort', columnName)
  const isDescending = pagination.value.sortBy === columnName ? !pagination.value.descending : false
  pagination.value.sortBy = columnName
  pagination.value.descending = isDescending
  onRequest({
    pagination: pagination.value
  })
}

const onPaginationChange = (page) => {
  console.log('onPaginationChange')
  pagination.value.page = page
  onRequest({
    pagination: pagination.value
  })
}

const onRequest = async (props) => {
  const { page, sortBy, descending } = props.pagination
  loading.value = true
  await store.fetchCustomers({
    page,
    sortBy,
    sortOrder: descending ? 'desc' : 'asc',
    perPage: pagination.value.rowsPerPage
  })

  pagination.value.rowsNumber = store.total
  pagination.value.page = page
  pagination.value.sortBy = sortBy
  pagination.value.descending = descending
  loading.value = false
}

onMounted(() => {
  onRequest({
    pagination: pagination.value
  })
})
</script>

<style lang="scss">
.my-sticky-header-table {
  height: 600px;

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th {
    background-color: #2b2d42;
  }

  thead tr th {
    position: sticky;
    z-index: 1;
  }

  thead tr:first-child th {
    top: 0;
  }

  &.q-table--loading thead tr:last-child th {
    top: 48px;
  }
}
</style>
