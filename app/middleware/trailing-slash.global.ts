export default defineNuxtRouteMiddleware((to) => {
  if (to.path !== '/' && to.path.endsWith('/')) {
    const newPath = to.path.slice(0, -1) || '/'
    return navigateTo(newPath, { redirectCode: 301 })
  }

  // if (to.path.match('/blog/\\d{4}/\\d{2}/.*') && !to.path.endsWith('/')) {
  //   // console.log(to.path + '/')
  //   return navigateTo(to.path + '/', { redirectCode: 301 })
  // }
})
