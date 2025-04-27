export default function UserProfile({params}:any){

    

    return (
        <div>
            <h1>Profile Page</h1>
            <p>Welcome to profile page {params.name}</p>
        </div>
        
    )
}