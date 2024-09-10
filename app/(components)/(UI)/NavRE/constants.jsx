
let nav_links = [
    { text: "Properties", href: "/properties/all", aria: "check our properties"},
    { text: "News", href: "/posts/all", aria: "news about the real estate market"},
    { text: "About", href: "/about", aria: "more information about our company"},
]


let colors = {
    accent_bright: "#d6003580",     // nav text, 
    accent_dark: "#cc2750d3",       // nav text, 

    ui_bright: "#ffffffd3",         // nav
    ui_bright_active: "#ffff",     // nav icon bg
    ui_bright_not_active: "#bebebe2e", // nav icon bg
    ui_bright_menu_border: "#dbdbdb",
    ui_bright_menu_button_hover_bg: "#dbdee5",
    
    ui_dark: "#31313175",           // nav
    ui_dark_active: "#212121",               // nav icon bg
    ui_dark_not_active: "#4f4f4f2e",           // nav icon bg
    ui_dark_menu_border: "#151515a1",
    ui_dark_menu_button_hover_bg: "#ffffff16",

}

// to be required/imported into tailwind.config.js
module.exports = {
    ...colors,
    nav_links

}

// export {};


