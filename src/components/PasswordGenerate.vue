<template>
  <v-card :loading="loading" max-width="400" class="mx-auto my-5">
    <v-card-title>OTP</v-card-title>
    <v-card-text>
      <div v-if="password">
        <v-text-field
          variant="outlined"
          label="Password"
          readonly
          v-model="password"
          :suffix="expireIn == 0 ? 'expired' : expireIn"
        >
          <template v-slot:append>
            <v-fade-transition leave-absolute>
              <v-progress-circular
                :siz="30"
                v-model="percent"
                color="primary"
              ></v-progress-circular>
            </v-fade-transition>
          </template>
        </v-text-field>
      </div>
      <v-text-field variant="outlined" label="ID" v-model="id" />
    </v-card-text>
    <v-card-actions>
      <v-btn :disabled="percent > 0" @click="generatePassword">Generate</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      id: 0,
      password: null,
      expireIn: 0,
      expire: 0,
      loading: true,
    };
  },
  mounted() {
    this.generatePassword();
  },
  computed: {
    // a computed getter
    percent: function () {
      // `this` points to the vm instance
      return (100 * this.expireIn) / this.expire;
    },
  },
  watch: {
    expireIn: {
      handler(value) {
        if (value > 0) {
          setTimeout(() => {
            this.expireIn--;
          }, 1000);
        }
      },
      immediate: true, // This ensures the watcher is triggered upon creation
    },
  },
  methods: {
    async generatePassword() {
      const result = await fetch("http://localhost:3000/generate", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          id: this.id,
        }),
      })
        .then((response) => response.json())
        .catch((error) => {
          console.log("Looks like there was a problem: \n", error);
        });
      this.loading = false;
      if (result.status === "ok") {
        this.password = result.password;
        this.expireIn = result.expireIn;
        this.expire = result.expireIn;
      }
    },
  },
};
</script>
