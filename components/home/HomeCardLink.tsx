import Link from 'next/link'
import React from 'react'

const HomeCardLink = ({cmp}:{
    cmp: any
}) => {
  return (
    <Link
    href={cmp.link}
    className="group rounded-lg border border-gray-300 dark:border-neutral-800 px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
    // target="_blank"
    // rel="noopener noreferrer"
    >
        <h2 className="mb-3 text-2xl font-semibold">
        {cmp.title}{" "}
        <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
            -&gt;
        </span>
        </h2>
        <p className="m-0 max-w-[30ch] text-sm opacity-50">
        {cmp.description}
        </p>
    </Link>
  )
}

export default HomeCardLink;