let xhttp = new XMLHttpRequest();
let xhttp2 = new XMLHttpRequest();
let personInfo;
let ediPersonInfo;
let final;
/***************************** 
 XMLHttpRequest
*****************************/
xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
        personInfo = Object.entries(JSON.parse(this.responseText));
        personInfo =personInfo.flat();
    }
};
xhttp.open("GET", "https://api.npoint.io/177cea9c157de479d51b", false);
xhttp.send();

xhttp2.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
        ediPersonInfo = Object.entries(JSON.parse(this.responseText));
        ediPersonInfo = ediPersonInfo.flat();
    }
};
xhttp2.open("GET", "https://api.npoint.io/dc6cb50568fac72a4105", false);
xhttp2.send();

/***************************** 
 function for aasign the responses
*****************************/
function func(PerInfo, ediPerInfo) {
    let final = [];
    let newUser;
    for (let i = 0; i < PerInfo.length; i++) {
        for (let j = 0; j < ediPerInfo.length; j++)
            if (PerInfo[i].uid === ediPerInfo[j].uid) {
                newUser = Object.assign({}, PerInfo[i], ediPerInfo[j]);
                final.push(newUser);
                newUser = null;
            }
    }
    return final;
}
final = func(personInfo[1], ediPersonInfo[1]);

/***************************** 
 function for create table
*****************************/
function createTable() {
    for (i = 0; i < final.length; i++) {
        let tr = document.createElement("tr");
        let tbody = document.getElementById("tbody");
        tbody.appendChild(tr);
        tr.setAttribute('onclick', `openPanel('${i}')`);
        // tr.setAttribute('id', `tr-${final[i].uid}`);
        let j = i + 1;
        tr.innerHTML = "<td>" + j + "</td>" + "<td>" + final[i].uid + "</td>" + "<td>" + final[i].firstName + "</td>" + "<td>" + final[i].lastName + "</td>" +
            "<td>" + final[i].city + "</td>" + "<td>" + final[i].postalCode + "</td>" + "<td>" + final[i].phoneNumber + "</td>" + "<td>" + final[i].position + "</td>";
    }
}
createTable();

/***************************** 
 func for open panel
*****************************/
function openPanel(id) {
    $('#panel').slideDown();
    $('#delete-but').css('display', 'block');
    $('#edit-but').text('edit');
    $('#edit-but').attr('class', 'btn btn-info');
    $('#panel').css('top', `${(parseInt(id)+2)*50-20}px`);
    $('#delete-but').attr('onclick', `deleteFunc('${final[id].uid}')`);
    $('#edit-but').attr('onclick', `editFunc('${final[id].uid}')`);
    $('.card-body').html(
        `<h5>uid: </h5><h6> ${final[id].uid}</h6><br>
   <h5>first name: </h5><h6> ${final[id].firstName}</h6><br>
   <h5>last name: </h5><h6> ${final[id].lastName}</h6><br>
   <h5>city: </h5><h6> ${final[id].city}</h6><br>
   <h5>position: </h5><h6> ${final[id].position}</h6><br>
   <h5>postal code: </h5><h6> ${final[id].postalCode}</h6><br>
   <h5>phone number: </h5><h6> ${final[id].phoneNumber}</h6><br>`
    );

}

/***************************** 
 func for cancle operation and close panel
*****************************/
function canclePanelEdit() {
    $('#panel').slideUp();
    $('#edit-but').text('edit');
    $('#edit-but').attr('class', 'btn btn-info');
}

/***************************** 
 func for delete user
*****************************/
function deleteFunc(id) {
    if (confirm('Are you sure?')) {
        $('#tbody').html('');
        let index = final.findIndex(x => x.uid === id);
        final.splice(index, 1);
        createTable();
    }
    $('#panel').slideUp();
}
/***************************** 
func for edit users info and save new user
*****************************/
function editFunc(id) {
    let index = final.findIndex(x => x.uid === id);

    if ($('#edit-but').text() === 'edit') {
        $('#edit-but').attr('class', 'btn btn-success');
        $('#edit-but').text('save change');
        $('.card-body').html(
            `<h5>uid: </h5><h6> ${final[index].uid}</h6><br>
   <h5>first name: </h5><input type="text" class='col-6' id="new-firstName" value="${final[index].firstName}"><br>
   <h5>last name: </h5><input type="text" class='col-6' id="new-lastName" value="${final[index].lastName}"><br>
   <h5>city: </h5><input type="text" class='col-6' id="new-city" value="${final[index].city}"><br>
   <h5>position: </h5><input type="text" class='col-7' id="new-position" value="${final[index].position}"><br>
   <h5>postal code: </h5><input type="text" class='col-6' id="new-postalCode" value="${final[index].postalCode}"><br>
   <h5>phone number: </h5><input type="text" class='col-7' id="new-phoneNumber" value="${final[index].phoneNumber}"><br>`
        );
        // $(`#input-${final[index].firstName}`).focus();
    } else if ($('#edit-but').text() === 'save change') {
        if (confirm("Are you sure ?")) {
            $('#tbody').empty();
            final[index].firstName = $('#new-firstName').val();
            final[index].lastName = $('#new-lastName').val();
            final[index].city = $('#new-city').val();
            final[index].position = $('#new-position').val();
            final[index].postalCode = $('#new-postalCode').val();
            final[index].phoneNumber = $('#new-phoneNumber').val();
            createTable();
        }
        $('#panel').slideUp();
        $('#edit-but').text('edit');
        $('#edit-but').attr('class', 'btn btn-info');

    } else {
        if ($('#new-uid').val() === '' || $('#new-firstName').val() === "" || $('#new-lastName').val() === "" ||
            $('#new-city').val() === "" || $('#new-position').val() === "" || $('#new-postalCode').val() === "" || $('#new-phoneNumber').val() === "") {
            alert('همه فیلدها را پر کنید');

        } else {
            let newUser = {
                uid: `${$('#new-uid').val()}`,
                firstName: `${$('#new-firstName').val()}`,
                lastName: `${$('#new-lastName').val()}`,
                city: `${$('#new-city').val()}`,
                position: `${$('#new-position').val()}`,
                postalCode: `${$('#new-postalCode').val()}`,
                phoneNumber: `${$('#new-phoneNumber').val()}`

            };
            $('#tbody').html('');
            final.push(newUser);
            createTable();
            $('#panel').slideUp();
            console.log(final);
        }
    }
}

/***************************** 
 func for open panel when you want create new user
*****************************/
function createNewPanel() {
    $('#panel').slideDown();
    $('#edit-but').attr('onclick', `editFunc()`);
    $('#edit-but').attr('class', 'btn btn-success');
    $('#edit-but').text('add new user');
    $('#delete-but').css('display', 'none');
    $('#panel').css('top', `65px`);
    $('#panel').css('left', `80%`);
    $('.card-body').html(
        `<h5>uid: </h5><input type="text" class='col-6' id="new-uid"><br>
   <h5>first name: </h5><input type="text" class='col-6' id="new-firstName"><br>
   <h5>last name: </h5><input type="text" class='col-6' id="new-lastName"><br>
   <h5>city: </h5><input type="text" class='col-6' id="new-city"><br>
   <h5>position: </h5><input type="text" class='col-7' id="new-position"><br>
   <h5>postal code: </h5><input type="text" class='col-6' id="new-postalCode" ><br>
   <h5>phone number: </h5><input type="text" class='col-7' id="new-phoneNumber"><br>`
    );
    $('#new-uid').focus();

}

//////////////////////////