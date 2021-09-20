export type ChatProps = {
    data:string[]
}

function Chat({data}:ChatProps) {

    console.log(data)
return(
    <div>
    {data.map((item) =>(
        <p>{item}</p>
    ))}
  </div>)
}

export default Chat;