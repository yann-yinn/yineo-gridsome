<template>
  <MainLayout class="home">
    <div class="section">
      <div class="content" v-html="$page.cv.content"></div>
    </div>
  </MainLayout>
</template>

<script>
import MainLayout from "@/layouts/MainLayout"
import BulmaGrid from "@/components/BulmaGrid"
import PostTeaserHomepage from "@/components/PostTeaserHomepage"
import PresentationColumnLeft from "@/components/PresentationColumnLeft"
import PresentationColumnRight from "@/components/PresentationColumnRight"
export default {
  components: { 
    MainLayout, 
    BulmaGrid, 
    PostTeaserHomepage, 
    PresentationColumnLeft, 
    PresentationColumnRight 
  }
}
</script>

<page-query>
  query {
    cv: block(id: "cv") {
      content
    }
  }
</page-query>
