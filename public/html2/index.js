const technologies = document.querySelectorAll('.tech')
// console.log(technologies);

technologies.forEach((tech) => {
    for (let i = 2; i < 5; i++) {
        document.getElementById(i).style.display = "none";
    }

    tech.addEventListener('focus', ()=>{
        // console.log(tech);
        c_id = tech.getAttribute('data-id')
        console.log(c_id );     
        
        for (let i = 1; i < 5; i++) {
            if(c_id == i){
                document.getElementById(c_id).style.display = "" 
            }
            else{
                document.getElementById(i).style.display="none"
            }
        }
    })
})
function Left(){
    document.getElementById("scrollRow").scrollLeft -= 100;
}
function Right(){
    document.getElementById("scrollRow").scrollLeft += 100;
}   
	
