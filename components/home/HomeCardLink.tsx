import Image from 'next/image';
import Link from 'next/link'
import React from 'react'

const HomeCardLink = ({cmp} : {
  cmp:any
}) => {
  return (
    <Link
    href={cmp.link} target="_blank"
    className="group rounded-lg border border-gray-300 dark:border-neutral-800 px-3 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
    // target="_blank"
    // rel="noopener noreferrer"
    >
        { cmp.image && (
        <div className='w-full h-[200px] relative mb-[2rem] overflow-hidden rounded-md'>
          <Image src={cmp.image} fill alt="image"
          style={{objectFit: "cover"}}
          className=' hover:scale-[1.01] transition-all duration-300 ease-linear'></Image>
        </div>
        )}
        <h2 className="mb-3 text-2xl font-semibold px-2">
        {cmp.title}{" "}
        <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
            -&gt;
        </span>
        </h2>
        <p className="m-0 text-sm opacity-50 px-2">
        {cmp.description}
        </p>
    </Link>
  )
}

export default HomeCardLink;