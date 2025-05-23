import MainLayout from '../layout/MainLayout';
  
const Contact = () => {
  return (
    <MainLayout>

<div
  className="text-white py-16 px-6 text-center mb-10 bg-green-700 mt-15"

>
  <h1
    className="text-2xl md:text-5xl font-bold"
    style={{ fontFamily: "Merriweather, serif", fontSize: "45px" }}
  >
    Reach Out <span className="text-yellow-400">for Support</span> <br />
    and Queries
  </h1>
  <button className="mt-6 px-6 py-3 border border-white text-white rounded-lg transition hover:bg-yellow-400 hover:text-black">
    Contact Us Now
  </button>
</div>

      <div className="bg-green-700 p-6 md:p-10 rounded-lg max-w-4xl mx-auto flex flex-col md:flex-row items-center md:items-start">
        <div className="w-full md:w-1/2 pr-6">
          <h2 className="text-white text-2xl md:text-3xl font-bold font-[Merriweather] mb-4">
            Drop Us a Message
          </h2>
          <form className="space-y-3">
            <input 
              type="text" 
              placeholder="Your Name" 
              className="w-full p-3 border border-dotted border-white text-white bg-transparent rounded-md text-[OpenSans] focus:outline-none" 
              required 
            />
            <input 
              type="email" 
              placeholder="Your Email" 
              className="w-full p-3 border border-dotted border-white text-white bg-transparent rounded-md text-[OpenSans] focus:outline-none" 
              required 
            />
            <input 
              type="tel" 
              placeholder="Phone Number" 
              className="w-full p-3 border border-dotted border-white text-white bg-transparent rounded-md text-[OpenSans] focus:outline-none" 
            />
            <input 
              type="text" 
              placeholder="Subject" 
              className="w-full p-3 border border-dotted border-white text-white bg-transparent rounded-md text-[OpenSans] focus:outline-none" 
            />
            <textarea 
              placeholder="Your Message" 
              className="w-full p-3 border border-dotted border-white text-white bg-transparent rounded-md h-28 text-[OpenSans] focus:outline-none"
              required
            ></textarea>
            <button 
              type="submit" 
              className="w-2/4 bg-[#FCCD2A] text-white py-3 rounded-md font-normal hover:bg-yellow-400 transition-all"
            >
              Send Message
            </button>
          </form>
        </div>
        <div className="w-170px md:w-1/2 mt-6 md:mt-0 ">
         <img src='/contact/image (1).png' alt="Contact" />
        </div>
      </div>
    </MainLayout>
  );
};

export default Contact;