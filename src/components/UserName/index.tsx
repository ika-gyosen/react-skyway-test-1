export type UserNameProps = {
    children:JSX.Element
}

function UserName({children}:UserNameProps) {
return <div>
<label>
  user name
  {children}
</label>
</div>
}

export default UserName;