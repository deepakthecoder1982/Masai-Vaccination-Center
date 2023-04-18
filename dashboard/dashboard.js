let UserData = JSON.parse(localStorage.getItem('UserData'));
// console.log(UserData);


let showData = users =>{
    document.querySelector('tbody').innerText = '';
    // console.log(users
    let count=1;
    users.forEach((User,index) => {
        let row = document.createElement('tr'); 
        // <!-- sr,id,name,age,designation,Priority,vaccine,otp,Delete,vaccinated -->
        let No = document.createElement('td');
        No.innerText = count++;  
        let id = document.createElement('td');
        id.innerText = User.id;
        let name = document.createElement('td');
        name.innerText = User.name;
        let age = document.createElement('td');
        age.innerText = User.age;
        let designation = document.createElement('td');
        designation.innerText = User.designation;
        let priority = document.createElement('td');
        priority.innerText = User.priorityResult;
        let vaccine = document.createElement('td');
        vaccine.innerText = User.vaccine;
        let otp  = document.createElement('td');
        let date = new Date();
        // let ans =  Math.floor(Math.random()*100).toString()+date.getTime().toString().slice(8,-1);
        let ans = (Math.floor(Math.random()*2232 +3456) + Math.ceil(Math.random()*1000 + 2945)).toString(); 
        if(ans.length==4){
            otp.innerText = ans;
        }else{
            otp.innerText = Math.floor(Math.random()*10000 + 1000).toString()
        }
        let Delete = document.createElement('td');
        Delete.innerText = "Delete";
        Delete.style.color = 'red';
        Delete.style.cursor = 'pointer';
        Delete.addEventListener('click',()=>{
            DeleteData(index);
        });
        let vaccinated = document.createElement('td');
        vaccinated.innerText = "Vaccinate";
        vaccinated.style.color = 'green';
        vaccinated.style.cursor = 'pointer';
        vaccinated.addEventListener('click',()=>{
            ValidateOtp(otp.innerText,name.innerText,vaccine.innerText,index,User);
        })

        row.append(No,id,name,age,designation,priority,vaccine,otp,Delete,vaccinated);
        document.querySelector('tbody').append(row);
    });   
}
function DeleteData(index){
    UserData.splice(index,1);
    showData(UserData);
    localStorage.setItem('UserData',JSON.stringify(UserData));
}
showData(UserData)



let VaccinatedData = JSON.parse(localStorage.getItem('vaccinated'))||[];


function ValidateOtp(otp,name,vaccine,index,user){
    let otpSection = document.getElementById('otpSection');
    // otpSection.classList.add('visible');
    // otpSection.style.transition ="display 7s"; 
    otpSection.style.display = 'block';
    // let content = document.querySelector('.content');
    // content.classList.add('visible');

    let result ='';
    document.getElementById('validate').addEventListener('click',()=>{
        let EntOtp = document.getElementsByClassName('Ent_otp');
        for(let i=0;i<EntOtp.length;i++){
            result += EntOtp[i].value;
        }
        if(result != otp){
            otpSection.style.display = "none";
            // otpSection.classList.remove('showalert');
            alert('Entered Otp is Incorrect');
        }else{
            alert(`${name} Added to Queue`)
            otpSection.style.display = "none";
            // otpSection.classList.remove('showalert');
            setTimeout(()=>{
                alert(`Vaccinating ${vaccine}`)
            },5000)
            setTimeout(()=>{
                alert(`${name} Vaccinated`)
                VaccinatedData.push(user);
                localStorage.setItem('vaccinated',JSON.stringify(VaccinatedData));
                DeleteData(index);
            },10000);

        }
    });
}
let content = document.querySelector('.content');
let close_otp_form = document.getElementById('close_otp_form');
close_otp_form.addEventListener('click',()=>{
    content.classList.remove('visible');
    otpSection.style.display = 'none';

})
// otpSection.style.transitionDelay = '10000ms';


/// sort and filter
let filterByvaccine =document.getElementById('FilterByVaccine');
filterByvaccine.addEventListener('change',()=>{
    let filterData = UserData.filter((item)=>{
        return item.vaccine == filterByvaccine.value;
    })
    if(filterByvaccine.value == ''){
        showData(UserData);
        return true;
    }
    showData(filterData)
});


let filterByPriority =document.getElementById('FilterByPriority');
filterByPriority.addEventListener('change',()=>{
    let filterData = UserData.filter((item)=>{
        return item.priorityResult == filterByPriority.value;
    })
    if(filterByPriority.value == ''){
        showData(UserData);
        return true;
    }
    showData(filterData)
})

let sortByAge = document.getElementById('FilterByAge');
sortByAge.addEventListener('change',()=>{
    if(sortByAge.value == 'lth'){
        UserData.sort((a,b)=>a.age - b.age);
    }else if(sortByAge.value == 'htl'){
        UserData.sort((a,b)=>b.age - a.age);
    }
    if(sortByAge.value == ''){
        showData(UserData);
        return true;
    }
    showData(UserData)
})

let myOpt = document.querySelectorAll('.Ent_otp') 
// console.log(myOpt)
    for(let i=0;i<myOpt.length-1;i++){
        myOpt[i].addEventListener('keyup',()=>{
            myOpt[i+1].focus();
        })
}



// let otp = new Date().getTime();
