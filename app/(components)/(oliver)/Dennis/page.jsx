import HeroDennis from '../InfiniteScrollText/page'
import GalleryDennis from '../ProjectGallery/page'
import CurvedMenu from "../CurvedMenu/page"
import HeaderDennis from "../HeaderDennis/page"



const Dennis = () => {



  return (
    <main>
        <nav className="absolute z-[1] w-full">
            <div className='absolute top-0 w-full'><HeaderDennis/></div>
            <div className=''><CurvedMenu/></div>
        </nav>
        <HeroDennis/>
        <GalleryDennis/>
    </main>
  )
}

export default Dennis