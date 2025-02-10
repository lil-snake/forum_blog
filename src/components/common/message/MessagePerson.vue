<template>
  <div class="massage-list">
    <div class="container-fluid">
      <Row>
        <Col flex="55px">
          <el-avatar shape="square" :size="50"
                     :src="'http://image.fangweb.top/Fii6b6EM4tvmE4sIUptqYrooqiah'"></el-avatar>
        </Col>
        <Col flex="auto">
          <div class="massage-list-text">
            <div class="massage-list-text-line">
              sgfh,gdflsgfhsgfh,gdflsgfhsgfh,gdflsgfhsgfh,gdflsgfh
            </div>
            <div class="massage-list-text-line2">
              sdgvnfisdgvnfsdgvnfisdgvnfsdgvnfisdgvnfsdgvnfisdgvnfsdgvnfisdgvnf
            </div>
          </div>
        </Col>
      </Row>

    </div>
  </div>
</template>

<script>
  export default {
    name: "MessagePerson"
  }
</script>

<style scoped>

  .massage-list {
    /*margin-left: 10px;*/
    padding: 5px 0 5px 0px;
    background: rgba(225, 229, 232, 0.5);

    height: 60px;
    vertical-align: middle;

  }

  .massage-list-text {
    display: inline-block;
    vertical-align: middle;
    height: 60px;
    width: 100%;
    /*padding-bottom: 100%;*/
    overflow: hidden;

    position: relative;
  }

  .massage-list-text-line {
    vertical-align: middle;
    height: 25px;
    width: 100%;
    /*padding-bottom: 100%;*/
    overflow: hidden;
    position: absolute;
    top: 5px;
  }

  .massage-list-text-line2 {
    vertical-align: middle;
    height: 25px;
    width: 100%;
    /*padding-bottom: 100%;*/
    overflow: hidden;
    position: absolute;
    top: 28px;
  }

</style>