export type StatusProps = {
    peerId: string | undefined
}

function Status(Props:StatusProps) {
    const status = Props.peerId ? "OK" : "Error"
    const id = Props.peerId ? Props.peerId : ""
return <div>conection: {status} id: {id}</div>
}

export default Status;