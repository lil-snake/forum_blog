<template>
  <div class="message-box row-no-gutters">
    <div class="container-fluid clean-padding">
      <div class="row">
        <div class="col-lg-4 col-md-4 col-xs-4 col-sm-4 left">
          <MessagePerson/>
          <!--          <MessagePerson />-->
        </div>
        <div class="col-lg-8 col-md-8 col-xs-8 col-sm-8 right">
          <div class="message-main">
            <div class="message-head">
              dkslgjkldfsjgklfdjhbgilkdfgjhblkajfgdlkhjgflskjhlkfjhdkslgjkldfsjgklfdjhbgilkdfgjhblkajfgdlkhjgflskjhlkfjh你说的副科级干部女大夫
            </div>
            <div class="message-body">
              <div class="bubble">
                <div class="sender-person">
                  13 九月,2023 &nbsp;&nbsp;&nbsp;我是谁谁谁我是谁谁谁我是谁谁谁我是谁谁谁我是谁谁谁我是谁谁谁
                </div>
                <div class="sender-info">
                  sdgnfdkjhsdgnfdkjhsdgnfdkjhsdgnfdkjhsdgnfdkjhsdgnfdkjhsdgnfdkjhsdgnfdkjhsdgnfdkjhsdgnfdkjhsdgnfdkjh
                </div>
              </div>
            </div>
            <div class="sender-input">
              <Input v-model="senderInput" maxlength="200" show-word-limit type="textarea" style="width: 97%" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import MessagePerson from "components/common/message/MessagePerson";

  export default {
    name: "MessageBox",
    components: {
      MessagePerson
    },
    data() {
      return {
        senderInput: '',
      }
    },
    created() {
    },
    methods: {

    }
  }
</script>

<style scoped>
  .message-box {
    padding: 0;
    border: 1px solid #ebebeb;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    height: 700px;
    width: 100%;
    overflow: hidden;
    /*background: #0b5ed7;*/
  }

  .clean-padding {
    padding: 0;
  }

  .message-box .left {
    height: 700px;
    padding: 0;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    /*background: #fc0606;*/
  }

  .message-box .right {
    height: 700px;
    padding: 0;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    /*background: #85f572;*/
    border-left: 1px solid rgba(0, 0, 0, 0.2);
  }

  .message-head {
    height: 50px;
    line-height: 50px;
    background: rgba(179, 174, 174, 0.2);
    overflow: hidden;
    padding: 0 10px;
    font-size: 19px;
    font-weight: bolder;
    border-bottom: 1px solid rgba(175, 171, 171, 0.5);
  }

  .bubble {
    margin: 10px 30px 10px 5px;
    height: 100%;
    width: 100%;
    padding: 10px 30px 10px 10px;
    /*background: #8aea85;*/
    word-wrap: break-word;
  }

  .message-main{
    height: 700px;
    position: relative;
  }

  .sender-input{
    position: absolute;
    bottom: 0;
    width: 100%;
    margin-right: 20px;
  }
</style>