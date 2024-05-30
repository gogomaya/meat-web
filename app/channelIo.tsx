"use client"
import React, {useEffect} from "react"

declare global {
  interface Window {
    ChannelIO?: {
      (...args: any[]): void;
      q?: any[];
      c?: (args: IArguments) => void;
    };
    ChannelIOInitialized?: boolean;
  }
}

export const ChannelIOComponent: React.FC = () => {
  useEffect(() => {
    const w = window
    if (w.ChannelIO) {
      console.error("ChannelIO script included twice.")
      return
    }

    const ch = function () {
      ch.c(arguments)
    }

    ch.q = [] as any[]
    ch.c = function (args: IArguments) {
      ch.q.push(args)
    }

    w.ChannelIO = ch

    const l = () => {
      if (w.ChannelIOInitialized) {
        return
      }
      w.ChannelIOInitialized = true
      const s = document.createElement("script")
      s.type = "text/javascript"
      s.async = true
      s.src = "https://cdn.channel.io/plugin/ch-plugin-web.js"
      const x = document.getElementsByTagName("script")[0]
      if (x.parentNode) {
        x.parentNode.insertBefore(s, x)
      }
    }

    if (document.readyState === "complete") {
      l()
    } else {
      w.addEventListener("DOMContentLoaded", l)
      w.addEventListener("load", l)
    }

    w.ChannelIO("boot", {
      pluginKey: "83e94a15-0662-40ae-b37a-5a7a27df10a1"
    })
  }, [])

  return null
}
