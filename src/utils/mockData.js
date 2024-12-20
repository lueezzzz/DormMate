import Jala from "../assets/images/Jala.png";
import Daniella from "../assets/images/Daniella.png";
import Khanne from "../assets/images/Khanne.png";
import Rian from "../assets/images/Rian.png";
import Andry from "../assets/images/Andry.png";
import dorm1 from "../assets/images/dorm1.jpg";

export const permitsMockData = [
  {
    id: 0,
    name: "John Doe",
    type: "Late Night",
    room: 26,
    status: "Pending",
  },
  {
    id: 1,
    name: "John Dos",
    type: "Late Night",
    room: 26,
    status: "Pending",
  },
  {
    id: 2,
    name: "John Doeing nothing",
    type: "Late Night",
    room: 26,
    status: "Pending",
  },
  {
    id: 3,
    name: "Justin Doe",
    type: "Overnight",
    room: 26,
    status: "Pending",
  },
  {
    id: 4,
    name: "Dohn Joe",
    type: "Overnight",
    room: 26,
    status: "Pending",
  },
  {
    id: 5,
    name: "Johnny Doe",
    type: "Overnight",
    room: 26,
    status: "Pending",
  },
  {
    id: 6,
    name: "John Doe",
    type: "Overnight",
    room: 26,
    status: "Pending",
  },
  {
    id: 7,
    name: "Master Joe",
    type: "Weekend",
    room: 26,
    status: "Pending",
  },
];

export const authors = [
  {
    id: 1,
    name: "Jala Aguirre",
    img: Jala,
  },
  {
    id: 2,
    name: "Daniella Pailden",
    img: Daniella,
  },
  {
    id: 3,
    name: "Khanne Labao",
    img: Khanne,
  },
  {
    id: 4,
    name: "Rian Mabait",
    img: Rian,
  },
  {
    id: 5,
    name: "Andry Tumacole",
    img: Andry,
  },
];

export const socialLinks = [
  {
    id: 1,
    href: "#contacts",

    class: "fa-solid fa-phone",
  },
  {
    id: 2,
    href: "#contacts",

    class: "fa-solid fa-envelope",
  },
];


export const navConfig = {
  "/": [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#authors", label: "Authors" },
  ],
  "/login": [
    { href: "#home", label: "Home", link: "/" },
    { href: "#about", label: "About", link: "/" },
    { href: "#authors", label: "Authors", link: "/" },
    { href: "#transient", label: "Transient", link: "/transient", className: "transient" },
  ],
  "/transient": [
    { href: "#home", label: "Home", link: "/" },
    { href: "#about", label: "About", link: "/" },
    { href: "#authors", label: "Authors", link: "/" },
    { href: "#transient", label: "Login", link: "/login", className: "transient" },
  ],

    "/transient-booking": [
    { href: "#home", label: "Home", link: "/" },
    { href: "#about", label: "About", link: "/" },
    { href: "#authors", label: "Authors", link: "/" },
    { href: "#transient", label: "Login", link: "/login", className: "transient" },
  ],
  
};

export const customTheme = {
    button: {
      color: {
        orangeHover: "bg-[#ff8d4e] hover:bg-[#d3723e]",
      },
    },
    input: {
      colors: {
        orangeFocus: "focus:ring-[#ff8d4e] focus:border-[#ff8d4e]",
      },
    },
  };