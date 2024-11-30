import path from "path"

export const loginFormControl = [
    {
        id:'userName',
        label:'Username',
        type:'text',
        placeholder:'Enter your username'
    },
    {
        id:'password',
        label:'Password',
        type:'password',
        placeholder:'Enter your password'
    }
]

export const registerFormControl = [
    {
        id:'fullName',
        label:'Full Name',
        type:'fullName',
        placeholder:'Enter your full name'
    },
    {
        id:'userName',
        label:'Username',
        type:'text',
        placeholder:'Enter your username'
    },
    {
        id:'email',
        label:'Email',
        type:'email',
        placeholder:'Enter your email'
    },
    {
        id:'password',
        label:'Password',
        type:'password',
        placeholder:'Enter your password'
    },
    {
        id:'confirmPassword',
        label:'Confirm Password',
        type:'password',
        placeholder:'Confirm your password'
    }
]

export const shoppingViewHeaderMenuItems = [
    {
        id: 'home',
        label: 'Home',
        path: '/shop/home'
    },
    {
        id: 'products',
        label: 'Products',
        path: '/shop/listing'
    },
    {
        id: 'laptop',
        label: 'Laptop',
        path: '/shop/listing',
    },
    {
        id: 'laptopgaming',
        label: 'Laptop Gaming',
        path: '/shop/listing',
    },
    {
        id: 'pc',
        label: 'PC',
        path: '/shop/listing',
    },
    {
        id: 'phone',
        label: 'Phone',
        path: '/shop/listing',
    },
    {
        id: 'watch',
        label: 'Watch',
        path: '/shop/listing',  
    },
    {
        id: "aboutus",
        label: "About Us",
        path: "/shop/listing",
    },
]

export const categoryOptionsMap = {
    laptop: 'Laptop',
    laptopgaming: 'Laptop Gaming',
    pc: 'PC',
    phone: 'Phone',
    watch: 'Watch',
}

export const brandOptionsMap = {
    acer: 'Acer',
    asus: 'Asus',
    dell: 'Dell',
    hp: 'HP',
    apple: 'Apple',
    samsung: 'Samsung',
}

export const sortOptions = [
    { id: "price-lowtohigh", label: "Price: Low to High" },
    { id: "price-hightolow", label: "Price: High to Low" },
    { id: "price-atoz", label: "Title: A to Z" },
    { id: "price-ztoa", label: "Title: Z to A" },
]

export const filterOptions = {
    Category: [
        { id: "laptop", label: "Laptop" },
        { id: "laptopgaming", label: "Laptop Gaming" },
        { id: "pc", label: "PC" },
        { id: "phone", label: "Phone" },
        { id: "watch", label: "Watch" },
    ],
    Branch: [
        { id: "acer", label: "Acer" },
        { id: "asus", label: "Asus" },
        { id: "dell", label: "Dell" },
        { id: "hp", label: "HP" },
        { id: "apple", label: "Apple" },
        { id: "samsung", label: "Samsung" },
    ],
    Price: [
        { id: "price-0-500", label: "$0 - $500" },
        { id: "price-500-1000", label: "$500 - $1000" },
        { id: "price-1000-1500", label: "$1000 - $1500" },
        { id: "price-1500-2000", label: "$1500 - $2000" },
        { id: "price-2000-2500", label: "$2000 - $2500" },
        { id: "price-2500-3000", label: "$2500 - $3000" },
    ]
}