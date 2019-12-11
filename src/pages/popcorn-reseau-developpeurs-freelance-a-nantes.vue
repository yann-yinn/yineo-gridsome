<template>
  <MainLayout class="page-cv">
    <div class="section">
      <div class="container is-small">
        <div class="content has-text-centered">
          <h1>Popcorn Nantes: réseau de développeurs freelance à Nantes, sans frais et sans commission</h1>
          <p>Je suis le fondateur du réseau de développeurs freelances de Nantes "Popcorn". Popcorn Nantes est un réseau et annuaires des développeurs freelances de Nantes, qui permet de connecter entreprises et freelances localement sans frais et sans commission. Pour plus d'informations ou si vous recherchez un développeur freelance, rendez vous directement sur le site !</p>
          <p>
            <a
              class="button is-success is-warning is-large"
              href="https://popcorn-nantes.github.io"
            >Trouver un développeur freelance à Nantes</a>
          </p>
          <hr />
          <p>Côté freelance, l'idée est de pouvoir trouver des missions par le site, mais aussi et surtout au travers de notre tchat qui nous permet de nous échanger des plans boulots ou de nous entre-aider sur des sujets divers liés au freelancing ! L'inscription se fait ici , avec une pull request sur notre repo github:</p>
          <p>Si vous êtes un développeur ou une développeuse qui a envie de rejoindre le réseau, vous pouvez nous retrouver à un de nos évènements qui sont annoncés ici : https://www.meetup.com/fr-FR/meetup-group-tCnaDLLH/</p>
          <p>
            <a
              class="button is-info is-large"
              href="https://popcorn-nantes.github.io/page/inscription"
            >S'inscrire sur Popcorn</a>
          </p>
        </div>
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
      title: "CV"
    };
  }
};
</script>

<page-query>
  query {
    cv: block(id: "cv") {
      content
    }
  }
</page-query>

<style>
.page-cv span.icon {
  width: 0 !important;
}
</style>
