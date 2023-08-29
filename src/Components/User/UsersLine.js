import React, {  } from "react";
import "../../Style/UsersLine.css";

function UsersLine(props) {
    const { user_id, user_firstname, user_lastname, user_phone_number, user_email_address, user_active, user_password, role_id, location_id } = props.data;
    
    console.log(props.data)
    return (
        <tr className="UsersLine">
            {/* <form> */}
                <td>{user_id}</td>
                <td>{user_firstname}</td>
                <td>{user_lastname}</td>
                <td>{user_phone_number}</td>
                <td>{user_email_address}</td>
                <td>
                    {user_active ? 
                        <button>Deactivate</button>
                    :
                        <button>Activate</button>
                    }
                </td>
                <td className="role">
                    <select value={role_id}>
                        <option value="1">Admin</option>
                        <option value="2">User</option>
                        <option value="3">Guest</option>
                    </select>
                </td>
                <td>{location_id}</td>

            {/* </form> */}

        </tr>
    )
}

export default UsersLine