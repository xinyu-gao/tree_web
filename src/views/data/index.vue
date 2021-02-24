<template>
  <div class="dashboard-container">
    <charts />
  </div>
</template>

<script>
import Charts from './components/index'

export default {
  name: 'Data',
  components: { Charts },
  data() {
    return {
    }
  },
  created() {
  }
}
</script>
