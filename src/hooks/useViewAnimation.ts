import { useInView } from 'react-intersection-observer'
import { useAnimation, AnimationControls } from 'framer-motion'
import { useEffect } from 'react'

interface UseViewAnimationOptions {
  threshold?: number
  triggerOnce?: boolean
  rootMargin?: string
}

interface UseViewAnimationReturn {
  ref: (node?: Element | null) => void
  controls: AnimationControls
  inView: boolean
}

export const useViewAnimation = (options: UseViewAnimationOptions = {}): UseViewAnimationReturn => {
  const {
    threshold = 0.1,
    triggerOnce = true,
    rootMargin = '0px 0px -50px 0px'
  } = options

  const controls = useAnimation()
  const [ref, inView] = useInView({
    threshold,
    triggerOnce,
    rootMargin
  })

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    } else if (!triggerOnce) {
      controls.start('hidden')
    }
  }, [controls, inView, triggerOnce])

  return { ref, controls, inView }
}

// Predefined animation variants
export const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8
    }
  }
}

export const fadeInDown = {
  hidden: { opacity: 0, y: -60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8
    }
  }
}

export const fadeInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8
    }
  }
}

export const fadeInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8
    }
  }
}

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6
    }
  }
}

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
}

export const slideInFromBottom = {
  hidden: { opacity: 0, y: 100 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8
    }
  }
}

export const slideInFromTop = {
  hidden: { opacity: 0, y: -100 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8
    }
  }
}

export const rotateIn = {
  hidden: { opacity: 0, rotate: -180, scale: 0.3 },
  visible: {
    opacity: 1,
    rotate: 0,
    scale: 1,
    transition: {
      duration: 0.8
    }
  }
}

export const bounceIn = {
  hidden: { opacity: 0, scale: 0.3 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6
    }
  }
} 