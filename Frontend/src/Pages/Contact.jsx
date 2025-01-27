import NewsLater from "../Components/NewsLater"
import iphone from"../assets/allinone.png"
function Contact(){
    return <div>
        <div className="text-center text-2xl pt-10 border-t">
            <h1>CONTACT <span className="text-gray-400">US</span></h1>
        </div>
        <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 lg:mr-20">
            <img className=" lg:w-[600px] lg:h-[500px] md:max-[450px]  " src={iphone} alt="" />
            <div className="flex flex-col justify-center items-start gap-6 ">
            <p className="font-semibold text-xl text-gray-600 ">Our Store</p>
            <p className="text-">54709 willms Sation <br />Lorem, ipsum dolor.</p>
            <p className="text-gray-500">Tel:(252) 617942032 <br /> Email: abdirahmanabdallanasser@gmail.com </p>
            <p className="font-semibold text-xl text-gray-600">Careers at dhaash</p>
            <p className="text-gray-500">Leran more about teams and job openings. </p>
            <button className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500">Explore Jobs</button>
            </div>
        </div>

        <NewsLater />
    </div>
}

export default Contact;