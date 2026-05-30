import http from "k6/http"
import {sleep} from "k6"

export const options = {
    vus: 20,
    duration: '30s',
}

export default function(){
    http.get("http://backend:8080/api/my-urls")
    http.get("http://backend:8080/api/getStats")

    http.post("http://backend:8080/api/createUrl",
        JSON.stringify({
            original_url: "http://google.com"
        }),
        {
            headers:{
                "Content-Type": "application/json",
            },
        }
    )
    http.post("http://backend:8080/api/create-customUrl",
        JSON.stringify({
            original_url: "http://google.com",
            custom_url: "G00gle"
        }),
        {
            headers:{
                "Content-Type": "application/json",
            },
        }
    )

    sleep(1);
}