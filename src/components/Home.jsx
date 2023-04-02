import Hero from 'components/layout/Hero';
import Categories from 'components/layout/Categories';
import { useRef } from 'react'

const Home = () => {
  const categoriesRef = useRef(null)
  const scrollTo = {
    categories: () =>
      categoriesRef?.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      })
  }

  return (
    <>
      <Hero scrollTo={scrollTo} />
      <Categories ref={categoriesRef} />
    </>

  )
}

export default Home