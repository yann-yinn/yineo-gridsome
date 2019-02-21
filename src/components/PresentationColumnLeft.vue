<template>
  <div>
    <section class="hero section">
      <div class="hero-body">
        <h1 class="title is-1">{{$static.metaData.homepageTitle}}</h1>
        <h2 class="subtitle is-3">{{$static.metaData.homepageSubtitle}}</h2>
      </div>
    </section>
    <section class="content is-medium">
      <blockquote v-html="$static.presentation.content"></blockquote>
    </section>
  </div>
</template>

<static-query>
  query {
    metaData {
      homepageTitle
      homepageSubtitle
    },
    presentation: block(id: "presentation") {
      content
    }
  }
</static-query>
