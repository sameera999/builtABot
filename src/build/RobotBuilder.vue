<template>
  <div v-if="availableParts" class="content">
    <div class="preview">
      <CollapsibleSection>
        <div class="preview-content">
          <div class="top-row">
            <img :src="selectedRobot.head.src"/>
          </div>
          <div class="middle-row">
            <img :src="selectedRobot.leftArm.src" class="rotate-left"/>
            <img :src="selectedRobot.torsos.src"/>
            <img :src="selectedRobot.rightArm.src" class="rotate-right"/>
          </div>
          <div class="bottom-row">
            <img :src="selectedRobot.base.src"/>
          </div>
        </div>
      </CollapsibleSection>
      <button class="add-to-cart" @click="addToCart()">Add to cart</button>
    </div>
    <div class="top-row">
      <div :class="[saleBorder,'top', 'part']">
        <!-- <div class="robot-name">
          {{selectedRobot.head.title}}
          <span v-if="selectedRobot.head.onSale" class="sale">Sale !</span>
        </div> -->
         <PartSelector
            :parts="availableParts.heads"
            position="top"
            @partSelected="part => this.selectedRobot.head = part"/>
      </div>
    </div>
    <div class="middle-row">
       <PartSelector
          :parts="availableParts.arms"
          position="left"
          @partSelected="part => this.selectedRobot.leftArm = part"/>
       <PartSelector
          :parts="availableParts.torsos"
          position="center"
          @partSelected="part => this.selectedRobot.torsos = part"/>
       <PartSelector
          :parts="availableParts.arms"
          position="right"
          @partSelected="part => this.selectedRobot.rightArm = part"/>
    </div>
    <div class="bottom-row">
      <PartSelector
          :parts="availableParts.bases"
          position="bottom"
          @partSelected="part => this.selectedRobot.base = part"/>
    </div>
    <div>
      <h1>Cart</h1>
      <table>
        <thead>
          <tr>
            <th>Robot</th>
            <th>Cost</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(robot, index) in cart" :key="index">
            <td>{{robot.head.title}}</td>
            <td class="cost">{{robot.cost}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>

import { mapActions } from 'vuex';
import PartSelector from './PartSelector.vue';
import CollapsibleSection from '../shared/CollapsibleSection.vue';

export default {
  name: 'RobotBuilder',
  beforeRouteLeave(to, from, next) {
    if (this.addedToCart) {
      next(true);
    } else {
      /* eslint no-alert:  0 */
      /* eslint no-restricted-globals:  0 */
      const response = confirm('You have not added your robot to cart, saved robot will be lost if your navigate, Are you sure ?');
      next(response);
    }
  },
  components: { PartSelector, CollapsibleSection },
  created() {
    this.getParts();

    console.log('Component created !');
  },
  data() {
    return {
      cart: [],
      addedToCart: false,
      selectedRobot: {
        head: {},
        leftArm: {},
        torsos: {},
        rightArm: {},
        base: {},
      },
    };
  },
  computed: {
    availableParts() {
      return this.$store.state.robots.parts;
    },
    saleBorder() {
      return this.selectedRobot.head.onSale ? 'sale-border' : 'not-sale-border';
    },
    robotHeadStyle() {
      return {
        border: this.selectedRobot.head.onSale ? '3px solid red' : '3px solid blue',
      };
    },
  },
  methods: {
    ...mapActions(
      'robots', ['getParts', 'addRobotToCart'],
    ),
    addToCart() {
      const robot = this.selectedRobot;
      const cost = robot.head.cost
        + robot.leftArm.cost
        + robot.torsos.cost
        + robot.rightArm.cost
        + robot.base.cost;

      this.addRobotToCart({ ...robot, cost })
        .then(() => this.$router.push('/cart'));
      this.addedToCart = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.part {
  position: relative;
  width:165px;
  height:165px;
  border: 3px solid #aaa;
}
.part {
  img{
    width:165px;
  }
}
.top-row {
  display:flex;
  justify-content: space-around;
}
.middle-row {
  display:flex;
  justify-content: center;
}
.bottom-row {
  display:flex;
  justify-content: space-around;
  border-top: none;
}
.head {
  border-bottom: none;
}
.left {
  border-right: none;
}
.right {
  border-left: none;
}
.left img {
  transform: rotate(-90deg);
}
.right img {
  transform: rotate(90deg);
}
.bottom {
  border-top: none;
}
.prev-selector {
  position: absolute;
  z-index:1;
  top: -3px;
  left: -28px;
  width: 25px;
  height: 171px;
}
.next-selector {
  position: absolute;
  z-index:1;
  top: -3px;
  right: -28px;
  width: 25px;
  height: 171px;
}
.center .prev-selector, .center .next-selector {
  opacity:0.8;
}
.left .prev-selector {
  top: -28px;
  left: -3px;
  width: 144px;
  height: 25px;
}
.left .next-selector {
  top: auto;
  bottom: -28px;
  left: -3px;
  width: 144px;
  height: 25px;
}
.right .prev-selector {
  top: -28px;
  left: 24px;
  width: 144px;
  height: 25px;
}
.right .next-selector {
  top: auto;
  bottom: -28px;
  left: 24px;
  width: 144px;
  height: 25px;
}
.right .next-selector {
  right: -3px;
}
.robot-name{
  position: absolute;
  top: -25px;
  text-align: center;
  width: 100%;
}
.sale{
  color: red;
}
.content{
  position: relative;
}
.add-to-cart{
  position: absolute;
  width:210px;
  padding: 3px;
  font-size: 16px;
}
th, td{
  text-align: left;
  padding: 5px;
  padding-right: 20px;
}
.cost{
  text-align: right;
}
.sale-border{
  border: 3px solid red;
}
.not-sale-border{
  border: 3px solid blue;
}
.preview {
  position: absolute;
  top: -20px;
  right: 0;
  width: 210px;
  height: 210px;
  padding: 5px;
}
.preview-content {
  border: 1px solid #999;
}
.preview img {
  width: 50px;
  height: 50px;
}
.rotate-right {
  transform: rotate(90deg);
}
.rotate-left {
  transform: rotate(-90deg);
}
</style>
