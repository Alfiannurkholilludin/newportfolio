<template>
    <section ref="scrollSection" class="scroll-container">
        <div ref="horizontalWrapper" class="horizontal-wrapper">
            <div 
                v-for="(panel, index) in panels" 
                :key="index" 
                class="panel"
                :class="`bg-${panel.color}`"
            >
                <div class="job-card">
                    <h2 class="job-title">{{ panel.title }}</h2>
                    
                    <div class="job-meta">
                        <span class="company-name">{{ panel.company }}</span>
                        <span class="duration">{{ panel.duration }}</span>
                    </div>

                    <ul class="job-description">
                        <li v-for="(item, i) in panel.description" :key="i">
                            {{ item }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
/* Container Pemicu Scroll Vertikal */
.scroll-container {
    height: 400vh; /* Contoh: Memberikan ruang scroll 3x viewport */
    /* background-color: #000; */
}

/* Wrapper yang akan digeser Horizontal */
.horizontal-wrapper {
    display: flex;
    /* PENTING: Gunakan position: sticky; agar wrapper tetap di viewport */
    position: sticky; 
    top: 0;
    /* Tinggi 100vh agar wrapper mengisi layar penuh */
    height: 100vh;
    padding: 0 5vw; /* Padding agar panel tidak terlalu mepet */
}

/* Setiap Panel Konten */
.panel {
    flex-shrink: 0; /* Penting agar panel tidak mengecil */
    width: 100vw; /* Lebar setiap panel */
    height: 100vh; /* Tinggi panel */
    margin: 0 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    border-radius: 12px;
    padding: 5vh 5vw; /* Tambahkan padding yang lebih besar untuk konten */
}

/* Kotak Konten Utama di dalam panel */
.job-card {
    max-width: 800px; /* Batasi lebar konten */
    width: 100%;
}

.job-title {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 5px;
}

.job-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 10px;
    margin-bottom: 20px;
    font-size: 1.1rem;
    font-weight: 500;
}

.company-name {
    font-weight: bold;
}

.duration {
    color: #666;
}

.job-description {
    /* margin-left: 20px; */
    padding-left: 0;
    font-size: 1.1rem;
    line-height: 1.6;
}

.job-description li {
    margin-bottom: 10px;
}

/* Contoh Warna Panel */
.bg-red { background-color: transparent; }
.bg-blue { background-color: transparent; }
.bg-green { background-color: transparent; }
.bg-purple { background-color: transparent; }
</style>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// --- State dan Ref ---
const scrollSection = ref(null); // Ref untuk section luar (trigger)
const horizontalWrapper = ref(null); // Ref untuk div yang digeser
const panels = [
    { 
        title: "Experience", 
        description: [
            "Keep scroll slowly to explore my work experience.",
        ] 
    },
    { 
        title: "Frontend Developer (UIUX)", 
        company: "PT Bali Towerindo Sentra Tbk", 
        duration: "Sep 2023 - Present", 
        // color: "red",
        description: [
            "Main Responsibilities:",
            "- Designed more product/solutions for client.",
            "- Handled UX Process and UI design for desktop/mobile responsive version and mobile apps.",
            "- Translated concepts into user flows, wireframes, mockups, and prototyping.",
            "- Analyzed user problems, business goals, and user goals in the early phase of product/feature development.",
            "- Defined innovative solutions for the product direction, visuals, and experience.",
            "- Designed well-though-out user experience flows (expected positive flow and negative flow).",
            "- Evaluated user problems, behavior, and needs based on research.",
        ] 
    },
    { 
        title: "UI UX Designer", 
        company: "Yubi Technology", 
        duration: "Jan 2023 - Sep 2023", 
        // color: "blue",
        description: [
            "Main Responsibilities:",
            "- Create design system and design components library to improve design process and development handoff.",
            "- Create user interface application POS (Point Of Sales).",
            "- Create user interface Website and Application Manufacturing management (PT Anugerah Cipta Molding Indonesia).",
        ] 
    },
    { 
        title: "Web Designer (Freelance Project)", 
        company: "PT  Motekar Digital Kreasi", 
        duration: "Jan 2023 - Jul 2023", 
        // color: "green",
        description: [
            "Main Responsibilities:",
            "- Redesign the landing page website to improve user experience and engagement.",
            "- Create a responsive UI/UX design for desktop and mobile versions.",
            "- Collaborate with developers to ensure accurate implementation of the design.",
            "- Conduct user testing to gather feedback and make necessary adjustments.",
            "- Successfully launched the redesigned website, resulting in a 25% increase in user engagement and a 15% boost in conversion rates.",
        ] 
    },
    { 
        title: "UI Designer (Freelance Project)", 
        company: "PT International Test Center", 
        duration: "Mar 2022 - Apr 2022", 
        // color: "purple",
        description: [
            "Main Responsibilities:",
            "- Designed user interface for an educational testing platform.",
            "- Created wireframes, mockups, and prototypes to visualize the user experience.",
            "- Collaborated with developers to ensure seamless implementation of the design.",
            "- Conducted usability testing to gather feedback and refine the design.",
            "- Delivered a user-friendly interface that enhanced the overall user experience and received positive feedback from users.",
            "- Successfully launched the platform on schedule, contributing to a 30% increase in user satisfaction ratings.",
        ] 
    },
    { 
        title: "UI Designer (Internship)", 
        company: "PT Pertamina Patra Niaga", 
        duration: "Sep 2021 - Feb 2022", 
        // color: "purple",
        description: [
            "Main Responsibilities:",
            "- Contribute to improvements in terms of the User Interface (UI) for the development of the mypertamina application abd aksi create a user interface fir various events held in the mypertamina application.",
            "- Assisted in designing user interfaces for internal applications.",
            "- Created wireframes and prototypes to visualize design concepts.",
            "- Collaborated with senior designers to refine and improve designs.",
            "- Gained hands-on experience in UI design principles and best practices.",
            "- Contributed to the successful launch of an internal application that improved workflow efficiency by 20%.",
        ] 
    },
    { 
        title: "Junior UI UX Designer", 
        company: "PT Uniair Indotama Cargo", 
        duration: "Apr 2021 - Jun 2021", 
        // color: "purple",
        description: [
            "Main Responsibilities:",
            "- Designed user interfaces for the company's logistics management system.",
            "- Created wireframes, mockups, and prototypes to visualize design concepts.",
            "- Collaborated with developers to ensure accurate implementation of designs.",
            "- Conducted user research to gather feedback and improve the user experience.",
            "- Delivered a user-friendly interface that enhanced the overall user experience and received positive feedback from users."
        ] 
    },
];

let horizontalScrollTL = null; // Timeline untuk menyimpan animasi

// --- Fungsi Animasi ---
const setupHorizontalScroll = () => {
    // Pengecekan Awal: Pastikan kedua elemen utama ada sebelum mencoba setup ScrollTrigger
    if (!scrollSection.value || !horizontalWrapper.value) {
        console.warn("Scroll section or wrapper not found. Skipping horizontal setup.");
        return; // Hentikan fungsi jika elemen belum ada
    }

    // Hitung lebar yang harus digeser (Kode ini sudah benar)
    const totalWidth = horizontalWrapper.value.scrollWidth;
    const viewportWidth = window.innerWidth; 
    const endPosition = totalWidth - viewportWidth; 
    
    // 1. Buat Timeline
    horizontalScrollTL = gsap.timeline({
        scrollTrigger: {
            trigger: scrollSection.value,
            start: "top top",
            
            // 🔥 PERBAIKAN DI SINI 🔥
            end: () => {
                // Tambahkan pengecekan null sebelum membaca properti DOM
                const triggerElement = scrollSection.value;

                if (triggerElement) {
                    // Hitung jarak end (tinggi section dikurangi tinggi viewport)
                    return "+=" + (triggerElement.offsetHeight - window.innerHeight); 
                }
                
                // Nilai fallback yang aman jika elemen null (misalnya, default ke 300vh)
                return "3000"; 
            }, 

            pin: true,
            scrub: 1,
            // Beri ID agar bisa di-kill dengan mudah saat unmount
            id: "horizontal-scroll", 
        }
    });

    // 2. Tambahkan animasi pergeseran
    horizontalScrollTL.to(horizontalWrapper.value, {
        x: -endPosition,
        ease: "none",
    });
};

onMounted(() => {
    // ScrollTrigger memerlukan DOM yang sudah ter-render sepenuhnya. 
    // Menggunakan setTimeout seringkali lebih aman di lingkungan Vue.
    setTimeout(setupHorizontalScroll, 100);
});

onUnmounted(() => {
    // Hapus ScrollTrigger saat komponen dihancurkan (penting untuk SPA)
    if (ScrollTrigger.getById("horizontal-scroll")) {
        ScrollTrigger.getById("horizontal-scroll").kill();
    }
});
</script>