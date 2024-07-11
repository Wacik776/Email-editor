import { useQuery } from "@tanstack/react-query"
import { emailService } from "../../services/email.service"
import parse from 'html-react-parser'

export const EmailList = () =>{
    const {data} = useQuery({
        queryKey: ["email list"],
        queryFn: ()=> emailService.getEmails()
    })
    return(
    <>
    <div className="">
        {data?.map(email => (

            <div className="ml-6 bg-almost-black rounded-xl overflow-hidden border border-border-black p-4 mb-8 w-80" key={email.text}>
                {parse(email.text)}
            </div>
        ))}
    </div>
    </>
    )
    
}