<template>
 <div>
   <StaggeredMenu
     position="right"
     :items="menuItems"
     :social-items="socialItems"
     :display-socials="true"
     :display-item-numbering="true"
     menu-button-color="#f5f5f5"
     open-menu-button-color="#000"
     :change-menu-color-on-open="true"
     :colors="['#9EF2B2', '#27FF64']"
     :logo-url="defaultLogo"
     accent-color="#2F2FE4"
     @menu-open="handleMenuOpen"
     @menu-close="handleMenuClose"
   />
 </div>
</template>

<script setup>
import StaggeredMenu from '@/components/common/StaggeredMenu.vue'
import defaultLogo from '@/assets/images/logo/logolight.png'

const menuItems = [
 { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
 { label: 'About', ariaLabel: 'Learn about us', link: '/about' },
 { label: 'Works', ariaLabel: 'View our works', link: '/works' },
//  { label: 'Contact', ariaLabel: 'Get in touch', link: '/contact' }
]

const socialItems = [
 { label: 'Twitter', link: 'https://twitter.com' },
 { label: 'GitHub', link: 'https://github.com' },
 { label: 'LinkedIn', link: 'https://linkedin.com' }
]

const handleMenuOpen = () => console.log('Menu opened')
const handleMenuClose = () => console.log('Menu closed')
</script>