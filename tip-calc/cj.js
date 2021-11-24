const amount = document.querySelector(".amount");
const tipBtn = document.querySelectorAll(".tip");
const custom = document.querySelector(".custom");
const people = document.querySelector(".people");
const perPerson = document.querySelector(".tip-amount-value");
const total = document.querySelector(".total-value");
const amtErr = document.querySelector(".amt-error");
const pplErr = document.querySelector(".people-error");
const reset = document.querySelector(".reset");

// all the variables are declared above i declared everything at once even if it's not used in below fucntions and events

//I have declared rst and other variables here for global scope 
rst()
let tip = 0, amt = 0, ppl = 1;

// for the tip buttons
//  In the IF  part here I have added for click event , like if I click a button it gets selected....
//  and if i click on it again it should get unselected as well so the if part is giving that.
//and the ELSE part gives the actual input for tip like whatever button is selected it's going to put that
// text value into the tip variable and ofcourse change the classes select and unselect classes accordingly
//at the end of it is the calc() which is the function for main calculation

 tipBtn.forEach(btn =>{
    btn.addEventListener("click", ()=>{
        if(btn.classList.contains("selected")){
            btn.classList.remove("selected");
            btn.classList.add("unselected");
        }else{            
            tipBtn.forEach(e =>{
                e.classList.remove("selected");
            })
            tip = btn.value;
            btn.classList.remove("unselected");
            btn.classList.add("selected");
        }
        custom.value = "";
        calc();
    })
});


// This one is for the Custom tip value, if I choose to do that, the constraint is the value should be greater than zero
// apart from that it just adds the input into the tip 
custom.addEventListener("input", ()=>{
    if(custom.value >= 0)
    {    
        tipBtn.forEach(e =>{
            e.classList.remove("selected");
        })
        tip = custom.value;
        calc();
    }
})


//This is for the amount that I give as input, HEre I added the "Number" to amt variable
// bcz if I don't add that then it results in "NaN" also the error class is being set to visible if,
// amt goes less than zero and I have added not equal to blank bcz that'd give error even without entering the input
amount.addEventListener("input", ()=>{
    amt = Number(amount.value);
    if(amt <= 0 && amt != ""){
        amount.classList.add("error");
        amtErr.style.visibility = "visible";
    }else{
        amount.classList.remove("error");
        amtErr.style.visibility = "hidden";
        calc();        
    }
})

// this one's for the people field again the default value is 1 so even without the input given it gives 1 to the ppl variable
//again if the people are less than zero then the eroor is set to visible otherwise it goes on to calc.
people.addEventListener("input", ()=>{
    ppl = people.value;
    if(ppl <= 0 && ppl != ""){
        people.classList.add("error");
        pplErr.style.visibility = "visible";
    }else{
        people.classList.remove("error");
        pplErr.style.visibility = "hidden";
        calc();        
    }
})

//for the reset button here added a function for event listener, rst() is declared with variables above,
//It changes everything back to zero or intially declared values. event listener for buttons is also there
//so that every time I click reset the buttons get unselected
//also I checked even if instead of innerHTML I use textContent then also it gives the same result here.
reset.addEventListener("click", rst);
function rst(){
    amount.value = "";
    people.value = "1";
    custom.value = "";
    perPerson.innerHTML = "$0.00";
    total.innerHTML = "$0.00";

    tipBtn.forEach(e =>{
        e.classList.remove("selected");
        e.classList.add("unselected");
    })
}

//This one is the main function that is doing all the calculation for tip and total amount
//Here I added toFixed to give rounded value upto 2
function calc(){
    if(amt >= 0 && ppl >= 1){
        let totalTip = (tip*amt)/(100);
        let totalAmt = amt + totalTip;
        perPerson.innerHTML = `$${((totalTip)/(ppl)).toFixed(2)}`;
        total.innerHTML = `$${((totalAmt)/(ppl)).toFixed(2)}`;
    }
}
