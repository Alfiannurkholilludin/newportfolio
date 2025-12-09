<template>
  <main>
  <div class="project-detail-page p-8">
    <img :src="currentProject.image" :alt="currentProject.title" class="w-full h-[800px] object-cover mb-16 rounded-lg shadow-lg"/>
    <!-- <p>{{ currentProject.description }}</p> -->

    <div class="wrapper-text-title w-full flex items-start justify-between pt-8">
      <div class="flex flex-col gap-4">
        <h1 class="text-6xl font-bold pt-8">{{ currentProject.title }}</h1>
        <p class="text-xl text-gray-500 mb-8">{{ projectSlug }}</p>
      </div>
      <div class="text-title">
        <h1 class="text-6xl/18 w-[800px] pt- leading-">{{currentProject.tentang}}</h1>
      </div>
    </div>

    <div class="wrapper-overview flex justify-between pt-16 pb-16">
      <h2 class="text-[22px]">{{ currentProject.context }}</h2>
      <div class="overview-text">
        <p class="title-overview text-[18px] w-[800px] leading-8">{{ currentProject.titleoverview }}</p>
        <p class="text-[18px] w-[800px] leading-8">{{ currentProject.overview }}</p>
        <p class="title-goals text-[18px] w-[800px] leading-8">{{ currentProject.titleGoals }}</p>
        <p class="text-[18px] w-[800px] leading-8">{{ currentProject.goals }}</p>
      </div>
    </div>

    <div class="wrapper-img1 flex gap-8">
      <img :src="currentProject.imgbali1" alt="" class="w-[794px] h-auto">
      <img :src="currentProject.imgbali2" alt="" class="w-[341px] h-[255px]">
    </div>

    <div class="wrapper-img2 pt-8">
      <img :src="currentProject.image" alt="" class="w-full h-auto">
    </div>

    <div class="wrapper-overview flex justify-between pt-16 pb-16">
      <h2 class="text-[22px]">{{ currentProject.problem }}</h2>
      <div class="overview-text">
        <p class="title-overview text-[18px] w-[800px] leading-8">{{ currentProject.titlechallenge }}</p>
        <p class="text-[18px] w-[800px] leading-8">{{ currentProject.overviewchallenge }}</p>
      </div>
    </div>
    
    <!-- <button @click="$router.push('/')" class="mt-10 bg-blue-500 text-white p-3 rounded">
      Kembali ke Daftar Proyek
    </button> -->
  </div>
  <Footer1Page />
  <ScrollButton />
  </main>
</template>

<script>
import { ref, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';

import img1 from "../assets/project/1.png";
import img2 from "../assets/project/2.png";
import img3 from "../assets/project/3.png";
import imgbali1 from "../assets/project/bali1.png";
import imgbali2 from "../assets/project/balifiber.png";
import Footer1Page from '@/components/Footer1Page.vue';
// import ScrollButton from '@/components/ScrollButton.vue';
import ScrollButton from '@/components/ScrollButton.vue'
// import ScrollButton from '@/components/ScrollButton.vue';

// Impor semua data proyek Anda (Anda mungkin ingin memindahkannya ke file data terpisah)
const ALL_PROJECTS = [
    {   
        title: "Balifiber", 
        slug: "PT Bali Towerindo Sentra Tbk",
        // timeline: "", 
        image: img1, 
        description: "Detail lengkap tentang proyek Balifiber dan teknologi yang digunakan.",
        tentang: "high-speed networks to support data needs in the digital age.",
        context: "Context",
        titleoverview: "Overview",
        overview: "Balifiber is a data communication service and television channel based on the latest technology for residential and corporate customers with 100% fiber optics. This service is provided by PT Bali Towerindo Sentra Tbk or commonly known as Bali Tower.",
        titleGoals: "Goals",
        goals: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        imgbali1: imgbali1,
        imgbali2: imgbali2,
        problem: "Problem",
        titlechallenge: "The Challenge",
        overviewchallenge: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
        title: "SmartCart By ITC", 
        slug: "PT International Test Center", 
        image: img2, 
        description: "Detail lengkap tentang proyek SmartCart dan tantangan yang dihadapi.",
        tentang: "solusi inovatif untuk meningkatkan pengalaman berbelanja pelanggan melalui teknologi canggih."
    },
    { 
        title: "Motekar Studio", 
        slug: "Motekar Studio", 
        image: img3, 
        description: "Detail lengkap tentang proyek Motekar Studio dan hasil akhirnya.",
        tentang: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },

    // ... Tambahkan detail untuk semua proyek
];

export default {
  components: {
    ScrollButton,
    Footer1Page
  },

  name: 'ProjectDetail',
  // Jika props: true disetel di router.js, slug akan tersedia sebagai prop
  props: {
    slug: {
        type: String,
        required: true
    }
  },
  setup(props) {
    const route = useRoute();
    const currentProject = ref({});
    const projectSlug = ref(props.slug); // Ambil slug dari props

    const fetchProjectData = (slug) => {
      // Cari data proyek berdasarkan slug yang diterima
      const data = ALL_PROJECTS.find(p => p.slug === slug);
      
      if (data) {
        currentProject.value = data;
      } else {
        // Handle case jika proyek tidak ditemukan (misalnya, redirect ke 404)
        currentProject.value = { title: "Proyek Tidak Ditemukan", description: "Maaf, proyek yang Anda cari tidak ada.", image: '' };
      }
    };

    // 1. Muat data saat komponen pertama kali dipasang
    onMounted(() => {
      fetchProjectData(projectSlug.value);
    });

    // 2. Jika Anda memuat komponen yang sama dengan mengganti rute dinamis (misalnya, dari /project/A ke /project/B)
    // Gunakan 'watch' untuk memuat ulang data saat prop 'slug' berubah.
    watch(() => props.slug, (newSlug) => {
        projectSlug.value = newSlug;
        fetchProjectData(newSlug);
    });

    return {
      currentProject,
      projectSlug
    };
  }
}
</script>

<style>
  .title-overview {
    margin-bottom: 8px;
    font-family: "SFPRODISPLAYBOLD", sans-serif;
    font-weight: bold;
  }
  .title-goals {
    margin-top: 24px;
    margin-bottom: 8px;
    font-family: "SFPRODISPLAYBOLD", sans-serif;
    font-weight: bold;
  }
</style>