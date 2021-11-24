<template>

  <v-container>
    <v-btn v-if="this.$route.params.item !== 'new'" class="delete mx-2" fab dark medium color="red" @click="deleteData">
      <v-icon dark>mdi-delete</v-icon>
    </v-btn>
    <v-btn type="submit" class="save mx-2" fab dark medium color="green">
      <v-icon dark>mdi-check</v-icon>
    </v-btn>
  </v-container>

</template>

<script>
export default {
  name: "SaveDelete",
  data() {
    return {
      /*
      accountData : {
        item: this.$route.params.item,
        accountName: this.name,
        money: this.money,
        color: this.color
      }
       */
    };
  },
  methods: {
    /*
    buttonClicked(button) {
      const data = {
        item: this.$route.params.item,
        name: this.name,
        money: this.money,
        color: this.color
      };
      if(button == 'delete') {
        this.methods.saveData(data);
      } else {
        this.methods.saveData(data);
      }
    },
     */
    deleteData() {
      this.$emit('deleteData');
    },
    saveData() {
      this.$emit('saveData');
    }
  },
  /*
  watch: {
    name() {
      console.log(this.name);
    },
    color() {
      console.log(this.color);
    }
  }
   */
}
</script>

<style scoped>

  .container {
    position: fixed;
    left: 25%;
    /*top: 80%;*/
    top: 92%;
    width: 50%;
    /* border: black solid 1px; */
  }

  .delete {
    position: relative;
    left: 15%;
  }

  .save {
    position: relative;
    left: 70%;
  }

</style>