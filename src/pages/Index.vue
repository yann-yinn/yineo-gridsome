<template>
  <MainLayout class="home">
    <div class="presentation">
      <div class="columns">
        <div class="column">
          <PresentationColumnLeft/>
        </div>
        <div class="column is-one-quarter">
          <PresentationColumnRight/>
        </div>
      </div>
      <div class="section content posts">
        <h2 class="title is-3">Derniers articles</h2>
        <BulmaGrid :items="$page.allBlogPost.edges" itemsByRow="2">
          <template slot-scope="row">
            <PostTeaserHomepage :post="row.item.node"/>
          </template>
        </BulmaGrid>
      </div>
    </div>
  </MainLayout>
</template>

<script>
import MainLayout from "@/layouts/MainLayout";
import BulmaGrid from "@/components/BulmaGrid";
import PostTeaserHomepage from "@/components/PostTeaserHomepage";
import PresentationColumnLeft from "@/components/PresentationColumnLeft";
import PresentationColumnRight from "@/components/PresentationColumnRight";
export default {
  components: {
    MainLayout,
    BulmaGrid,
    PostTeaserHomepage,
    PresentationColumnLeft,
    PresentationColumnRight
  },
  metaInfo() {
    return {
      title: "Consulting Vue.js"
    };
  }
};
</script>

<page-query>
  query Home {
    allBlogPost (perPage: 4) {
      edges {
        node {
          title
          image (width: 200)
          content
          path
          date(format: "D MMMM, YYYY")
        }
      }
    }
  }
</page-query>
