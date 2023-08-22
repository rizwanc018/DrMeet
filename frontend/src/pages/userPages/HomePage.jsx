import { Hero, About, Departments } from "../../_components/userComponents"

function HomePage() {
    return (
        <>
            <Hero />
            <About />
            <div className="w-[90%] mx-auto">
                <Departments />
            </div>
        </>
    )
}

export default HomePage