import { useState } from "react"

export default function CreatePage() {
    const [roomName, setRoomName] = useState('');
    return (
        <div className="create-page-wrapper">
            <input type="text" placeholder="Enter room name" />
            <input type="password" placeholder="Enter password" />
            <button>Create</button>
        </div>
    )
}
