import { createRouter, createWebHashHistory } from "vue-router"
import Layout from "@renderer/layout/Layout.vue"

const router = createRouter({
  history: createWebHashHistory("."),
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
  routes: [
    {
      path: "/",
      name: "Root",
      redirect: "/index",
      component: Layout,
      children: [
        {
          path: "/index",
          name: "Index",
          component: () => import("@renderer/views/Index.vue")
        },
        {
          path: "/doc",
          name: "Doc",
          redirect: "/doc/pdf",
          children: [
            {
              path: "/doc/pdf",
              name: "PDF",
              component: () => import("@renderer/views/doc/pdf-transform/PDFTransform.vue")
            }
          ]
        }
      ]
    }
  ]
})

export default router
