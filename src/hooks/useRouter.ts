import { useRouter } from 'vue-router'
const router = useRouter()

const goHome = () => {
  router.push('/')
}

export {
  goHome
}
