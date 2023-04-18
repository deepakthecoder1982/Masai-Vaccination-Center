let VaccinatedData = JSON.parse(localStorage.getItem('vaccinated'));
console.log(VaccinatedData)

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
        let ans =  Math.floor(Math.random()*100).toString()+date.getTime().toString().slice(1,3);
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
        vaccinated.innerText = "Vaccinated";
        vaccinated.style.color = 'green';
        vaccinated.style.cursor = 'pointer';
        vaccinated.addEventListener('click',()=>{
            alert(`Congratulations!! ${User.name} You are Vaccinated\n but Remember to put your musk on \n and also to wash Your hands with sanitizer\n Stay Safe !!! Stay Healthy!!!`)
        })

        row.append(No,id,name,age,designation,priority,vaccine,Delete,vaccinated);
        document.querySelector('tbody').append(row);
    });   
}
function DeleteData(index){
    VaccinatedData.splice(index,1);
    showData(VaccinatedData);
    localStorage.setItem('vaccinated',JSON.stringify(VaccinatedData));
}

showData(VaccinatedData)

let filterByvaccine =document.getElementById('FilterByVaccine');
filterByvaccine.addEventListener('change',()=>{
    let filterData = VaccinatedData.filter((item)=>{
        return item.vaccine == filterByvaccine.value;
    })
    if(filterByvaccine.value == ''){
        showData(VaccinatedData);
        return true;
    }
    showData(filterData)
});


let filterByPriority =document.getElementById('FilterByPriority');
filterByPriority.addEventListener('change',()=>{
    let filterData = VaccinatedData.filter((item)=>{
        return item.priorityResult == filterByPriority.value;
    })
    if(filterByPriority.value == ''){
        showData(VaccinatedData);
        return true;
    }
    showData(filterData)
})

let sortByAge = document.getElementById('FilterByAge');
sortByAge.addEventListener('change',()=>{
    if(sortByAge.value == 'lth'){
        VaccinatedData.sort((a,b)=>a.age - b.age);
    }else if(sortByAge.value == 'htl'){
        VaccinatedData.sort((a,b)=>b.age - a.age);
    }
    if(sortByAge.value == ''){
        showData(VaccinatedData);
        return true;
    }
    showData(VaccinatedData)
})