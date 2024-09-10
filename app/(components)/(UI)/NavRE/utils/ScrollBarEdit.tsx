//custom scroll behavior used in the nav component
export default function ScrollBarEdit () {

    const body = document.querySelector("html");
  
    if (localStorage.RE_Website_theme === "light") {
      body?.classList.remove("hide_scroll_light");
      body?.classList.remove("hide_scroll_dark");
  
      body?.classList.add("light_scroll");
  
    }
    
    if (localStorage.RE_Website_theme === "dark") {
      body?.classList.remove("hide_scroll_dark");
      body?.classList.remove("hide_scroll_light");
  
      body?.classList.add("dark_scroll");
  
    }
  
  
    setTimeout(()=> {
      // body?.classList.remove("dark_scroll");
      // body?.classList.remove("light_scroll");
      if (localStorage.RE_Website_theme === "light") {
        body?.classList.remove("light_scroll");
        body?.classList.add("hide_scroll_light");
    
      }
      
      if (localStorage.RE_Website_theme === "dark") {
        body?.classList.remove("dark_scroll");
        body?.classList.add("hide_scroll_dark");
    
      }
    },3000);
  
  }
  