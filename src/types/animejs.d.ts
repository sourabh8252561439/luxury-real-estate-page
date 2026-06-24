declare module 'animejs' {
  interface AnimeInstance {
    finished: Promise<void>
  }

  interface AnimeParams {
    targets?: any
    duration?: number
    delay?: number | ((el: HTMLElement, i: number, total: number) => number)
    easing?: string
    loop?: boolean
    autoplay?: boolean
    direction?: string
    [key: string]: any
  }

  interface StaggerOptions {
    start?: number
    direction?: string
    easing?: string
    from?: string
    grid?: [number, number] | string
    axis?: string
  }

  interface AnimeTimelineInstance {
    add(params: AnimeParams, offset?: string | number | '-=' | '+='): AnimeTimelineInstance
    finished: Promise<void>
  }

  function anime(params: AnimeParams): AnimeInstance
  namespace anime {
    function stagger(value: number | string, options?: StaggerOptions): (el: HTMLElement, i: number, total: number) => number
    function timeline(params?: AnimeParams): AnimeTimelineInstance
  }

  export default anime
}
