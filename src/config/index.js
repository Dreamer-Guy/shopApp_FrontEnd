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
    { id: "price-ztoa", label: "Title: LZ to A" },
]