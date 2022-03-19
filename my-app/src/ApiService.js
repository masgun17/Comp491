export default class ApiService{
    // Insert an article
    static sumTwoDigit(body){
        return fetch(`http://localhost:5000/add`,{
            'method':'GET',
             headers : {
            'Content-Type':'application/json'
      },
      body:JSON.stringify(body)
    })
    .then(response => response.json())
    .catch(error => console.log(error))
    }

}