import GlobeIcon from "./Globe"
import Logo from "./Logo"
import MapIcon from "./Trail"
import { Map, Globe, Home, User, Menu } from "lucide-react";


function Nav(){

    return(
        <div className="fixed top-0 flex flex-row justify-between items-center w-screen h-[30px] px-6 py-8 text-sm text-gray-400 border-b border-b-zinc-800 bg-[#101419] z-10">
            <div className="flex flex-row gap-4 justify-center items-center">
                <Logo/>
                <div>Mapper</div>
                <div>Driftin</div>
                <div>Orbit</div>
                <div>SmartTrails</div>
                <div>PriceTime</div>
                <div>VisaScan</div>
                <div>AppScout</div>
            </div>
            <div className="flex flex-row justify-center items-center gap-4">
                <div className="flex flex-row justify-center items-center gap-2"><MapIcon className="text-zinc-400 h-4 w-4" />
                Trailboard</div>
                <div className="flex flex-row justify-center items-center gap-2"><GlobeIcon className="text-zinc-400 h-4 w-4" />
                English</div>
                <div className="flex flex-row justify-center items-center rounded-2xl p-2 bg-zinc-900">
                <User className="h-[15px]"/><Menu className="h-[15px]"/> </div>
                
            </div>
            

        </div>
    )
}
export default Nav