import React from 'react'
import { TbHomeDollar } from "react-icons/tb";
import { FaMoneyBillAlt, FaNewspaper } from "react-icons/fa";
import { SiConvertio } from "react-icons/si";
import { Link } from "react-router-dom";
import Stars from './Stars';


const Tabs = () => {
  return (
    <div className='pb-5' >
   
      <div className=" nav flex align-center justify-center">
        <ul className="flex flex-row text-md  font-bold align-center justify-center gap-8">
          <Link to={"/"}>
            <li>
              <TbHomeDollar size={20} />
              <span className="text">HOME</span>
            </li>
          </Link>
          <Link to={"/exchanges"}>
            <li>
              <FaMoneyBillAlt size={20} />
              <span className="text">EXCHNAGES</span>
            </li>
          </Link>
          <Link to={"/convert"}>
            <li >
              <SiConvertio size={18} />
              <span className="text ">Crypto Convert</span>
            </li>
          </Link>
          <Link to={"/news"}>
            <li>
              <FaNewspaper size={18} />
              <span className="text">NEWS</span>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  )
}

export default Tabs
