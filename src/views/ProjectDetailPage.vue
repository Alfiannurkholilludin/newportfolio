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
        v-if="project.imgbali1 || project.imgbali2 || project.imgbali3 || project.img9"
        class="flex gap-8"
      >

        <!-- <img
          v-if="project.imgbali1"
          :src="project.imgbali1"
          class="w-[794px] h-auto"
        />

        <img
          v-if="project.imgbali2"
          :src="project.imgbali2"
          class="w-[341px] h-[255px]"
        /> -->

        <!-- <img
          v-if="project.img9"
          :src="project.img9"
          class="w-[341px] h-[255px]"
        /> -->

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

      <!-- FULL IMAGE -->
      <section v-if="project.fullimage || project.fullimage2" class="pt-8 w-full">
        <img
          :src="project.fullimage"
          class="w-full h-auto object-cover object-center"
        />
        <img
          :src="project.fullimage2"
          class="w-full h-auto mt-8 object-cover object-center"
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

          <p v-if="project.overviewchallenge" class="whitespace-pre-line">
            {{ project.overviewchallenge }}
          </p>
          
          <p v-if="project.contextchallenge" class="whitespace-pre-line">
            {{ project.contextchallenge }}
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
// import Img6 from "@/assets/project/work5.png"
import img7 from "@/assets/project/balifibermock.png"
import img8 from "@/assets/project/balifibermock2.png"
import img9 from "@/assets/project/balifibermock3.png"
import img10 from "@/assets/project/balifibermock4.png"

import imgbali1 from "@/assets/project/bali1.png"
import imgbali2 from "@/assets/project/balifiber.png"
import imgbali3 from "@/assets/project/keripik.png"

import imgitc1 from "@/assets/project/itc1.png"
import imgitc2 from "@/assets/project/itcmock.png"

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
image:img7,
tentang:"High-speed networks to support data needs in the digital age.",
context:"Context",
titleoverview:"Overview",
overview:"Balifiber is a data communication service and television channel based on the latest technology with 100% fiber optics.",
ctalink: "https://www.balifiber.id/",
titleGoals:"The Goals",
goals: `The main goal of this redesign:
- Increase conversion rates (CTA clicks and lead generation)
- Clarify the value proposition for each product
- Make navigation more intuitive and easier to understand
- Convey a sense of reliability, scalability, and enterprise-grade quality`,

// imgbali1,
// imgbali2,

problem:"Problem",
fimage:img10,
fimage2:img9,
titlechallenge:"The Challenge",
overviewchallenge:"Some of the main challenges of UX analysis:",
contextchallenge:`- The website's information architecture was cluttered and confusing, making it difficult for users to find the information they needed.
- The visual design was outdated and did not effectively communicate the brand's value proposition.
- The website lacked clear calls to action, resulting in low conversion rates.
- The website was not optimized for mobile devices, leading to a poor user experience on smartphones and tablets.
- The website's performance was slow, which negatively impacted user engagement and satisfaction.
- The website did not effectively showcase the range of products and services offered by Balifiber, making it difficult for users to understand the full value of the brand.`,
fullimage:img8,
titleresults:"The Results",
results:"The new website successfully increased user engagement and improved the overall online presence of Balifiber, leading to a significant boost in customer inquiries and satisfaction. The redesign resulted in a 35% increase in CTA clicks and a 25% increase in lead generation within the first three months after launch. User feedback highlighted the improved clarity of the value proposition and the enhanced user experience, particularly on mobile devices. The new design effectively conveyed a sense of reliability and enterprise-grade quality, aligning with Balifiber's brand identity."
},

// Smartcart Section

{
title:"SmartCart By ITC",
slug:"smartcart",
image:imgitc2,
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
fullimage2:imgitc1,
titleresults:"The Results",
results:"The new website successfully increased user engagement and improved the overall online presence of Balifiber, leading to a significant boost in customer inquiries and satisfaction."
},

// Motekar Section

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