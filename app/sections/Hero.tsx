"use client"
import Image from "next/image"
import hero from "../assets/hero.png"
import { ArrowRightLeft, BedDouble, Bot, CalendarDays, ChevronDown, Hotel, Info, Lightbulb, Mic, NotebookText, Plane, Search, SendHorizontal, SlidersHorizontal, Sparkles, Users, UtensilsCrossed, WandSparkles } from "lucide-react"
import { useEffect, useState } from "react"


function Hero(){

    const [booking, setBooking] = useState("flight")

    useEffect(() => {console.log(window.innerWidth);},[])


    return(
        <div className="flex flex-col justify-start items-center w-screen h-screen mt-[100px] overflow-auto bg-gradient-to-br from-[#131F2B]  via-[var(--background)] to-[#101419]">

            <div className="flex flex-col justify-center items-center w-screen">
                <Image src={hero} alt="hero" width={1000} className="w-[95vw] h-[50vh] object-cover rounded-xl"/>
                <div className="absolute inset-0 bg-black/60"></div>  
                <div className="absolute top-[200px] text-4xl px-8 text-zinc-300 text-center font-mono">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sapiente, aperiam!</div>
                <div className= {`${booking == "flight" ? "flex" : "hidden"} absolute  top-[400px]  flex-col justify-center items-start pt-16 p-8  w-[1000px] h-[230px] rounded-3xl bg-[#131F2B]`}>
                    <div></div>
                    <div className=" flex flex-row justify-between items-center w-full text-[11px] text-white "> 
                        <div className="flex flex-row justify-between items-center gap-4 rounded-4xl p-1  bg-[#252C37]">
                        <div className="bg-[#00B2FF] p-2 rounded-2xl">Round Trip</div>
                        <div className="p-2 rounded-2xl">One Way</div>
                        <div className="p-2 rounded-2xl">Multi-city</div></div>
                        <div className="flex flex-row gap-2 text-[14px]">
                            <div className="flex flex-row justify-center items-center gap-2 p-1 px-3 rounded-2xl bg-[#111218]"> <Users className="w-[16px]"/> 1 traveler <ChevronDown className="w-[16px]"/></div>
                            <div className="flex flex-row justify-center items-center gap-2 p-1 px-3 rounded-2xl bg-[#111218]">Economy <ChevronDown className="w-[16px]"/></div>
                        </div>
                    </div>
                    <div className="flex flex-row gap-6 w-full h-full p-4 ">
                        <div className="flex flex-row justify-center items-center gap-2">
                        <div className="flex flex-row  justify-center items-center w-[200px] h-[60px] rounded-2xl bg-[#111218]">
                            <div className="text-[21px] px-2">INS</div>
                            <div className="flex flex-col justify-center items-start px-2 border-l border-l-zinc-400">
                                <div>India</div>
                                <div className="text-[10px] text-zinc-600">Indira Gandhi International</div> </div>
                        </div>
                        <div><ArrowRightLeft className="text-[#00B2FF]"/></div>
                      <div className="flex flex-row  justify-center items-center w-[200px] h-[60px] rounded-2xl bg-[#111218]">
                            <div className="text-[21px] px-2">LHR</div>
                            <div className="flex flex-col justify-center items-start px-2 border-l border-l-zinc-400">
                                <div>London</div>
                                <div className="text-[10px] text-zinc-600">United Kingdom London</div> </div>
                        </div>
                        </div>
                     <div className="flex flex-row justify-center items-center gap-2">
                        <div className="flex flex-row  justify-center items-center w-[200px] h-[60px] rounded-2xl bg-[#111218]">
                            <div className="text-[21px] px-2 pr-6">11</div>
                            <div className="flex flex-col justify-center items-start px-2 border-l border-l-zinc-400">
                                <div>August</div>
                                <div className="text-[10px] text-zinc-600">Monday, 2025</div> </div>
                        </div>
                      <div className="flex flex-row  justify-center items-center w-[200px] h-[60px] rounded-2xl bg-[#111218]">
                            <div className="text-[21px] px-2 pr-6">15</div>
                            <div className="flex flex-col justify-center items-start px-2 border-l border-l-zinc-400">
                                <div>August</div>
                                <div className="text-[10px] text-zinc-600">Friday, 2025</div> </div>
                        </div>
                        </div>
                    </div>
                    <div className="flex flex-row justify-between items-center w-full p-4 text-[11px]">
                        <div className="flex flex-row justify-start gap-4 items-center">
                        <div className="flex flex-row justify-center items-center gap-2 p-1 px-3 rounded-2xl bg-[#111218]">All filters <SlidersHorizontal className="w-[16px]"/></div>
                        <div className="flex flex-row justify-center items-center gap-2 p-1 px-3 rounded-2xl bg-[#111218]">Stops <ChevronDown className="w-[16px]"/></div>
                        <div className="flex flex-row justify-center items-center gap-2 p-1 px-3 rounded-2xl bg-[#111218]">Price <ChevronDown className="w-[16px]"/></div>
                        <div className="flex flex-row justify-center items-center gap-2 p-1 px-3 rounded-2xl bg-[#111218]">Times <ChevronDown className="w-[16px]"/></div>
                        <div className="flex flex-row justify-center items-center gap-2 p-1 px-3 rounded-2xl bg-[#111218]">Duration <ChevronDown className="w-[16px]"/></div>
                        </div>
                        <div>
                            <div className="flex flex-row gap-4 justify-center items-center p-1 px-2 rounded-2xl text-2xl font-medium bg-[#00B2FF]">
                            <Search/>   Search
                            </div>
                        </div>
                    </div>
                </div>
                

                    <div className={` ${booking == "stay" || booking ==  "active" || booking ==  "restro" ? "flex" : "hidden"} absolute  top-[400px]  flex-col justify-center items-start pt-16 p-8 w-[1000px] h-[150px] rounded-3xl bg-[#131F2B]`}>

                    <div className="flex flex-row justify-center items-center gap-8 w-full h-full p-4 ">

                        <div className="flex flex-col  justify-center items-start p-4 w-[200px] h-[90px] rounded-2xl bg-[#111218]">
                            <div className="text-[12px] ">Location/City</div>
                            <div className="text-2xl pt-2 text-zinc-300">New Delhi</div>
                            <div className="text-[12px] text-zinc-400">India</div>
                        </div>
                          <div className="flex flex-col  justify-center items-start p-4 w-[150px] h-[90px] rounded-2xl bg-[#111218]">
                            <div className="text-[12px] ">Date</div>
                            <div className="flex flex-row justify-center items-end gap-2 text-[20px] pt-2 text-zinc-300"><div className="text-3xl">3</div> Dec'25</div>
                            <div className="text-[12px] text-zinc-400">Friday</div>
                        </div>


                          <div className="flex flex-col  justify-center items-start p-4 w-[150px] h-[90px] rounded-2xl bg-[#111218]">
                            <div className="text-[12px] ">Guests</div>
                            <div className="flex flex-row justify-center items-end gap-2 text-[20px] pt-2 text-zinc-300"><div className="text-3xl">1</div> Guest</div>
                            <div className="text-[12px] text-zinc-400">1 Adult 0 Child</div>
                        </div>
                             <div className="flex flex-col  justify-center items-start p-4 w-[150px] h-[90px] rounded-2xl bg-[#111218]">
                            <div className="text-[12px] ">Budget</div>
                            <div className="flex flex-row justify-center items-end gap-2 text-[20px] pt-2 text-zinc-300"><div className="text-3xl"></div> ₹0-₹1500</div>
                            <div className="text-[12px] text-zinc-400">excluding texes </div>

                        </div>
                            <div className="flex flex-row gap-4 justify-center items-center p-2 px-3 rounded-2xl text-2xl font-medium bg-[#00B2FF]">
                            <Search/>   Search
                            </div>
                    </div>

                </div>

                



                  <div className={` ${booking == "journi" ? "flex" : "hidden"} absolute  top-[400px]  flex-col justify-center items-start pt-16 p-8 w-[900px] h-[180px] rounded-3xl bg-[#131F2B]`}>

                    <div className="flex flex-col justify-center items-center gap-4 w-full h-full p-4  ">
                        <div className="flex flex-row justify-between items-center w-[700px] h-[full] p-4 rounded-4xl bg-[#111218]">
                            <input type="text"  placeholder="Enter something..." className="outline-none"/>
                            <div className="flex flex-row gap-2 justify-center items-center">
                            <Mic className="h-[15px] text-zinc-400"/>
                            <div className="p-2 py-3 rounded-full bg-blue-500">
                            <SendHorizontal className="h-[14px] "/>
                            </div>
                            </div>
                        </div>
                        <div className="flex flex-row justify-center items-center gap-4 w-full text-zinc-200">
                            <div className="flex flex-row justify-center items-center gap-4 p-1 px-3 rounded-2xl bg-[#111218] text-[14px]"><WandSparkles className="w-[16px]"/> Create a new trip</div>
                            <div className="flex flex-row justify-center items-center gap-4 p-1 px-3 rounded-2xl bg-[#111218] text-[14px]"><Lightbulb className="w-[16px]"/> Inspire me where to go</div>
                            <div className="flex flex-row justify-center items-center gap-4 p-1 px-3 rounded-2xl bg-[#111218] text-[14px]"><CalendarDays className="w-[16px]"/> Weekend getaways</div>
                            <div className="flex flex-row justify-center items-center gap-4 p-1 px-3 rounded-2xl bg-[#111218] text-[14px]"><Info className="w-[16px]"/> How it works</div>
                        </div>
                    </div>

                </div>



                <div className="flex flex-row justify-center items-center gap-4 absolute top-[370px] w-[600px] h-[50px] bg-[#161A21] rounded-3xl">
                    <div onClick={() => {setBooking("flight")}} className={`flex flex-row justify-center items-center gap-2 rounded-2xl p-1 px-2 text-[16px] ${booking === "flight" ? "bg-[#00B2FF]" : "bg-transparent"} `}><Plane strokeWidth={1} className="h-4"/> Flight</div>
                    <div onClick={() => {setBooking("restro")}} className={`flex flex-row justify-center items-center gap-2 rounded-2xl p-1 px-2 bg-none text-[16px ${booking === "restro" ? "bg-[#00B2FF]" : "bg-transparent"}  `}><UtensilsCrossed strokeWidth={1} className="h-4"/> Restaurants</div>
                    <div onClick={() => {setBooking("journi")}} className={`flex flex-row justify-center items-center gap-2 rounded-2xl p-1 px-2 bg-none text-[16px ${booking === "journi" ? "bg-[#00B2FF]" : "bg-[#161A21]"}  `}><NotebookText strokeWidth={2} className="h-4"/> Journi</div>
                    <div onClick={() => {setBooking("stay")}} className={`flex flex-row justify-center items-center gap-2 rounded-2xl p-1 px-2 bg-none text-[16px] ${booking === "stay" ? "bg-[#00B2FF]" : "bg-transparent"}   `}><BedDouble strokeWidth={1} className="h-4"/> Stays</div>
                    <div onClick={() => {setBooking("active")}} className={`flex flex-row justify-center items-center gap-2 rounded-2xl p-1 px-2 bg-none text-[16px] ${booking === "active" ? "bg-[#00B2FF]" : "bg-transparent"}  `}><Sparkles strokeWidth={1} className="h-4"/> Activities</div>
                </div>
            </div>
            

        </div>
    )
}

export default Hero