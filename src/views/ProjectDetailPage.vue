<template>
  <main>
    <div class="project-detail-page p-8">

      <!-- HERO IMAGE -->
      <img
        v-if="project.image"
        :src="project.image"
        :alt="project.title"
        class="w-full h-[800px] object-cover mb-16 rounded-lg shadow-lg"
      />

      <!-- TITLE SECTION -->
      <section class="flex justify-between items-start pt-8 gap-10">

        <div class="flex flex-col gap-4">
          <h1 class="text-6xl font-bold">
            {{ project.title }}
          </h1>

          <p class="text-xl text-gray-500">
            {{ project.slug }}
          </p>
        </div>

        <div v-if="project.tentang" class="max-w-[800px]">
          <h2 class="text-5xl leading-tight">
            {{ project.tentang }}
          </h2>
        </div>

      </section>


      <!-- OVERVIEW -->
      <section
        v-if="project.overview"
        class="flex justify-between pt-20 pb-16 gap-10"
      >

        <h2 class="text-[22px] font-semibold">
          {{ project.context }}
        </h2>

        <div class="max-w-[800px] text-[18px] leading-8 space-y-4">

          <p v-if="project.titleoverview" class="title-overview">
            {{ project.titleoverview }}
          </p>

          <p>
            {{ project.overview }}
          </p>

          <a
            v-if="project.ctalink"
            :href="project.ctalink"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-block mt-6 font-semibold py-3 text-white rounded-lg hover:underline transition"
          >
            Visit Website
          </a>

          <p v-if="project.titleGoals" class="title-goals">
            {{ project.titleGoals }}
          </p>

          <p v-if="project.goals" class="whitespace-pre-line">
            {{ project.goals }}
          </p>

        </div>

      </section>


      <!-- IMAGE GALLERY -->
      <section
        v-if="project.imgbali1 || project.imgbali2 || project.imgbali3"
        class="flex gap-8"
      >

        <img
          v-if="project.imgbali1"
          :src="project.imgbali1"
          class="w-[794px] h-auto"
        />

        <img
          v-if="project.imgbali2"
          :src="project.imgbali2"
          class="w-[341px] h-[255px]"
        />

        <img
          v-if="project.imgbali3"
          :src="project.imgbali3"
          class="w-[341px] h-[255px]"
        />

      </section>


      <!-- FULL IMAGE -->
      <section v-if="project.fimage || project.fimage2" class="pt-8 flex gap-8 w-full">
        <img
          :src="project.fimage"
          class="w-[710px] h-auto object-cover object-center"
        />
        <img
          :src="project.fimage2"
          class="w-[710px] h-auto mt-8"
        />
      </section>


      <!-- CHALLENGE -->
      <section
        v-if="project.problem"
        class="flex justify-between pt-20 pb-16 gap-10"
      >
        <h2 class="text-[22px] font-semibold">
          {{ project.problem }}
        </h2>

        <div class="max-w-[800px] text-[18px] leading-8 space-y-4">

          <p v-if="project.titlechallenge" class="title-overview">
            {{ project.titlechallenge }}
          </p>

          <p v-if="project.overviewchallenge">
            {{ project.overviewchallenge }}
          </p>

        </div>
      </section>

      <!-- Results -->

      <section v-if="project.results" class="flex justify-between pt-20 pb-16 gap-10">
        <h2 class="text-[22px] font-semibold">
          Results
        </h2>

        <div class="max-w-[800px] text-[18px] leading-8 space-y-4">

          <p v-if="project.titleresults" class="title-overview">
            {{ project.titleresults }}
          </p>

          <p v-if="project.results">
            {{ project.results }}
          </p>

        </div>

      </section>
    <Testimonials />
    </div>
    <Footer1Page />
    <ScrollButton />

  </main>
</template>

<script setup>

import { ref, onMounted, watch } from "vue"
import { useRoute } from "vue-router"

import Footer1Page from "@/components/Footer1Page.vue"
import ScrollButton from "@/components/ScrollButton.vue"

import img1 from "@/assets/project/1.png"
import img2 from "@/assets/project/2.png"
import img3 from "@/assets/project/3.png"
import img4 from "@/assets/project/allpagebalifiber.jpg"
import img5 from "@/assets/project/regisbalifiber.png"

import imgbali1 from "@/assets/project/bali1.png"
import imgbali2 from "@/assets/project/balifiber.png"
import imgbali3 from "@/assets/project/keripik.png"

import imgpromptai from "@/assets/project/work4.png"
import Testimonials from "@/components/Testimonials.vue"

const route = useRoute()

const project = ref({})

/*
PROJECT DATA
*/
const ALL_PROJECTS = [

{
title:"Balifiber",
slug:"balifiber",

image:img1,

tentang:"High-speed networks to support data needs in the digital age.",

context:"Context",

titleoverview:"Overview",

overview:"Balifiber is a data communication service and television channel based on the latest technology with 100% fiber optics.",

ctalink: "https://www.balifiber.id/",

titleGoals:"The Goals",

goals: `Startplan aims to:
- Creating a responsive website
- Integrating customer management
- Improving online visibility
- Providing customer support features
- Optimizing SEO`,

imgbali1,
imgbali2,

problem:"Problem",

fimage:img4,
fimage2:img5,

titlechallenge:"The Challenge",

overviewchallenge:"The main challenge was building a visually appealing yet functional website that remains easy to use.",

titleresults:"The Results",

results:"The new website successfully increased user engagement and improved the overall online presence of Balifiber, leading to a significant boost in customer inquiries and satisfaction."
},

{
title:"SmartCart By ITC",
slug:"smartcart",

image:img2,
tentang:"Revolutionizing retail with smart shopping carts for a seamless experience.",
context:"Context",

titleoverview:"Overview",

overview:"SmartCart is a smart shopping cart system designed to enhance the retail shopping experience by providing features such as real-time product information, navigation assistance, and seamless checkout.",

ctalink: "https://smartcart.id/",

titleGoals:"Goals",

goals:`- Develop a user-friendly interface for the smart shopping cart system
- Integrate real-time product information and navigation assistance
- Implement a seamless checkout process
- Enhance the overall shopping experience for customers`,

imgbali3,

problem:"Problem",

fimage2:img5,

titlechallenge:"The Challenge",

overviewchallenge:"The main challenge was building a visually appealing yet functional website that remains easy to use.",

titleresults:"The Results",

results:"The new website successfully increased user engagement and improved the overall online presence of Balifiber, leading to a significant boost in customer inquiries and satisfaction."

},

{
title:"Motekar Studio",
slug:"motekar",
image:img3,

tentang:"Creative studio focused on modern digital experiences."
}

]


/*
FETCH PROJECT
*/
const fetchProject = (slug) => {

const found = ALL_PROJECTS.find(p => p.slug === slug)

project.value = found ?? {
title:"Project Not Found",
overview:"The requested project does not exist."
}

}


/*
INITIAL LOAD
*/
onMounted(() => {
fetchProject(route.params.slug)
})


/*
WATCH ROUTE CHANGE
*/
watch(
() => route.params.slug,
(newSlug)=>{
fetchProject(newSlug)
}
)

</script>

<style scoped>

.title-overview{
font-weight:bold;
margin-bottom:8px;
font-family:"SFPRODISPLAYBOLD",sans-serif;
}

.title-goals{
font-weight:bold;
margin-top:24px;
margin-bottom:8px;
font-family:"SFPRODISPLAYBOLD",sans-serif;
}

</style>