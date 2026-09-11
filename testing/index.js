import "dotenv/config"
import http from "k6/http"
import {sleep} from "k6"

export const options = {
    vus: 20,
    duration: '30s',
}

export default function(){
    http.get(`${process.env.URL1}`)
    http.get(`${process.env.URL2}`)

    http.post(`${process.env.URL3}`,
        JSON.stringify({
            original_url: "http://google.com"
        }),
        {
            headers:{
                "Content-Type": "application/json",
            },
        }
    )
    http.post(`${process.env.URL4}`,
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