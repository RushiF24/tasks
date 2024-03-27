const testimonials = document.querySelectorAll('.testimonials')
// console.log(testimonials );

testimonials.forEach((test) => {
    for (let i = 2; i < 4; i++) {
        document.getElementById(i).style.display = "none";
    }
})
let current = 1;
function Rightmove(){
    
    for (let i = 1; i < 4; i++) {
        if(current == i){
            document.getElementById(current).style.display = "" 
        }
        else{
            document.getElementById(i).style.display="none"
        }
    }
    current++;
    if(current==4) current=1;
}



function Leftmove() {
    for (let i = 1; i < 4; i++) {
        if(current == i){
            document.getElementById(current).style.display = "" 
        }
        else{
            document.getElementById(i).style.display="none"
        }
    }
    current--;
    if(current==0) current=3;
}