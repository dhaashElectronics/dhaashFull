
import laptop4 from "../assets/laptop4.jpg"
import NewsLeter from "../Components/NewsLater"
function About(){
    return <div>
        <div className="text-2xl text-center pt-8 border-t ">
            <h1 className=""> ABOUT <span className="text-gray-500"> US</span></h1>
        </div>
        <div className="my-10 flex flex-col md:flex-row gap-16 ">
            <img className="w-full shadow-md md:max-w-[450px]" src={laptop4} alt="" />
            <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur a fugit reiciendis iusto facilis ratione illum ad! Soluta eaque ab maxime commodi aliquid neque fugiat quo id tempora cumque corporis molestias odio odit, nihil qui corrupti eius sunt culpa velit numquam</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur a fugit reiciendis iusto facilis ratione illum ad! Soluta eaque ab maxime commodi aliquid neque fugiat quo id tempora cumque corporis molestias odio odit, nihil qui corrupti eius sunt culpa velit numquam</p>
                <b className="text-gray-800">Our Mission</b>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur a fugit reiciendis iusto facilis ratione illum ad! Soluta eaque ab maxime commodi aliquid neque fugiat quo id tempora cumque corporis molestias odio odit, nihil qui corrupti eius sunt culpa velit numquam</p>
            </div>

        </div>
        <div className="text-xl py-4 ">
            <h1>WHY <span className="text-gray-400">CHOOSE US</span></h1>
        </div>
        <div className="flex flex-col md:flex-row text-sm mb-20">
            <div className="border px-10 md:px-16 py-8  sm:py-20 flex flex-col gap-5">
                <b>Quality Assurance:</b>
                <p className="text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur a fugit reiciendis iusto facilis ratione illum ad! Soluta eaque ab maxime commodi aliquid neque fugiat quo id tempora cumque corporis molestias odio odit, nihil qui corrupti eius sunt culpa velit numquam</p>
            </div>
            <div className="border px-10 md:px-16 py-8  sm:py-20 flex flex-col gap-5">
                <b>convenience:</b>
                <p className="text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur a fugit reiciendis iusto facilis ratione illum ad! Soluta eaque ab maxime commodi aliquid neque fugiat quo id tempora cumque corporis molestias odio odit, nihil qui corrupti eius sunt culpa velit numquam</p>
            </div>
            <div className="border px-10 md:px-16 py-8  sm:py-20 flex flex-col gap-5">
                <b>Exceptional customer service:</b>
                <p className="text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur a fugit reiciendis iusto facilis ratione illum ad! Soluta eaque ab maxime commodi aliquid neque fugiat quo id tempora cumque corporis molestias odio odit, nihil qui corrupti eius sunt culpa velit numquam</p>
            </div>
        </div>
        <NewsLeter/>
    </div>
}
export default About