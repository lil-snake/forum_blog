<template>
  <footer>
    <div class="container-xl">
      <div class="footer-inner">
        <div class="row d-flex align-items-center gy-4">
          <!-- copyright text -->
          <div class="col-md-4">
            <span class="copyright"><a href="" target="_blank" title="备案号">考研交流平台</a></span>
          </div>

          <!-- social icons -->
          <div class="col-md-4 text-center">
            <ul class="social-icons list-unstyled list-inline mb-0">
              <li class="list-inline-item"><a href="/adminLogin" target="_blank">后台管理</a></li>
            </ul>
          </div>

          <!-- go to top button -->
          <div class="col-md-4">
            <a href="#" id="return-to-top" class="float-md-end"><i class="icon-arrow-up"></i>回到顶部</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer"
}
</script>

<style scoped>
.copyright a{
  color: #9faabb;
}

.copyright a:hover {
  color: #9faabb;
  background: linear-gradient(to bottom right, gray, #000000);
  -webkit-background-clip:text;
  -webkit-text-fill-color:transparent;
}

</style>