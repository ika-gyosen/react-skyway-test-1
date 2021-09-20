export type RoomNameProps = {
    children:JSX.Element
}

function RoomName({children}:RoomNameProps) {
return(
<label>
  room name
  {children}
</label>)
}

export default RoomName;