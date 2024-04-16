"use client"
import {ProductsList} from "@/app/products/products"

export const HomeBestMenu = () => {
  return (
    <section>
      <h2 className="flex justify-center">BEST MENU</h2>
      <ProductsList />
    </section>
  )
}

export const HomeYoutube = () => (
  <iframe
    src="https://www.youtube.com/embed/GSwEU2vT9LI?si=3Ub8EckRz6lTQJMQ"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    className="w-full aspect-video"
  ></iframe>
)
