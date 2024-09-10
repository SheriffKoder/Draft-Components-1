
import ScrollContext from "./SmoothScrollContext"

export default function Home() {
    return (
        <ScrollContext>
        <main className="">
            {/* sections */}
            <section className='h-[100vh] border flex flex-col items-center justify-center'>
                Hero 1
            </section>
            <section className='h-[100vh] border flex flex-col items-center justify-center'>
                Hero 2
            </section>
        </main>    
        </ScrollContext>

    );
}