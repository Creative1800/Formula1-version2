/*
 * Created by Stefan Korecko, 2020-21
 * Opinions form processing functionality
 */

/*
This function works with the form:

<form id="opnFrm">
    <label for="nameElm">Your name:</label>
    <input type="text" name="login" id="nameElm" size="20" maxlength="50" placeholder="Enter your name here" required />
    <br><br>
    <label for="opnElm">Your opinion:</label>
    <textarea name="comment" id="opnElm" cols="50" rows="3" placeholder="Express your opinion here" required></textarea>
    <br><br>
    <input type="checkbox" id="willReturnElm" />
    <label for="willReturnElm">I will definitely return to this page.</label>
    <br><br>
    <button type="submit">Send</button>
</form>

 */

export default function processOpnFrmData(event){
    //1.prevent normal event (form sending) processing
    event.preventDefault();

    //2. Read and adjust data from the form (here we remove white spaces before and after the strings)
    const nopName = document.getElementById("nameElm").value.trim();
    const nopEmail = document.getElementById("email").value.trim();
    const nopUrl = document.getElementById("url").value.trim();
    const nopRadio = document.getElementById("opnFrm").elements["sex"].value;
    const nopOpn = document.getElementById("opnElm").value.trim();
    const markedCheckbox = document.querySelectorAll('input[type="checkbox"]:checked');
        let mCheckbox = [3];
        let i = 0;
        for(var checkbox of markedCheckbox) {
            if (checkbox.checked)
                mCheckbox[i] = checkbox.value;
                i++;
        }

    //3. Verify the data
    if(nopName==="" || nopOpn==="" || nopEmail===""){
        window.alert("Please, enter both your name and opinion");
        return;
    }

    //3. Add the data to the array opinions and local storage
    const newOpinion =
        {
            name: nopName,
            email: nopEmail,
            url: nopUrl,
            Radio: nopRadio,
            fav: mCheckbox[0],
            fav1: mCheckbox[1],
            fav2: mCheckbox[2],
            comment: nopOpn,
            created: new Date()

        };


    let opinions = [];

    if(localStorage.myTreesComments){
        opinions=JSON.parse(localStorage.myTreesComments);
    }

    opinions.push(newOpinion);
    localStorage.myTreesComments = JSON.stringify(opinions);


    //5. Go to the opinions
    window.location.hash="#opinions";

}

